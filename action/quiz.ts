'use server';

import { redirect } from "next/navigation";
import {createQuiz} from "@/api/quizzes";

export async function createQuizAction(formData: FormData) {
  const title = formData.get("title")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";
  const frequencyDays = Number(formData.get("frequencyDays") ?? 0);
  const companyId = Number(formData.get("companyId"));
  const ownerId = formData.get("ownerId")?.toString();

  const questions: any[] = [];

  for (let i = 0; i < 10; i++) {
    const text = formData.get(`questions[${i}].text`)?.toString();
    if (!text) continue;

    const options = [];
    for (let j = 0; j < 10; j++) {
      const opt = formData.get(`questions[${i}].options[${j}]`)?.toString();
      if (opt) options.push(opt);
    }

    const correct = formData.get(`questions[${i}].correctAnswers[0]`)?.toString() ?? "";

    questions.push({ text, options, correctAnswers: [correct] });
  }

  const quiz = {
    title,
    description,
    frequencyDays,
    companyId,
    ownerId,
    questions,
  };

  await createQuiz(quiz)

  redirect(`/companies/${companyId}`);
}
