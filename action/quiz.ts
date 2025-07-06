"use server";

import {redirect} from "next/navigation";
import {createQuiz, updateQuiz} from "@/api/quizzes";

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

    const options: string[] = [];
    const correct_answers: string[] = [];

    for (const [key, value] of formData.entries()) {
      if (key.startsWith(`questions[${i}].options[`)) {
        options.push(value.toString());
      }
      if (key.startsWith(`questions[${i}].correctAnswers[`)) {
        correct_answers.push(value.toString());
      }
    }

    questions.push({ text, options, correct_answers });
  }

  const quiz = {
    title,
    description,
    frequency_days: frequencyDays,
    company_id: companyId,
    owner_id: ownerId,
    questions,
  };

  await createQuiz(quiz);

  redirect(`/companies/${companyId}/quizzes`);
}

export async function updateQuizAction(formData: FormData) {
  const title = formData.get("title")?.toString() ?? "";
  const description = formData.get("description")?.toString() ?? "";
  const frequencyDays = Number(formData.get("frequencyDays") ?? 0);
  const companyId = Number(formData.get("companyId"));
  const ownerId = formData.get("ownerId")?.toString();
  const quizId = formData.get("quizId")?.toString();

  const questions: any[] = [];

  for (let i = 0; i < 10; i++) {
    const text = formData.get(`questions[${i}].text`)?.toString();
    if (!text) continue;

    const options: string[] = [];
    const correct_answers: string[] = [];

    for (const [key, value] of formData.entries()) {
      if (key.startsWith(`questions[${i}].options[`)) {
        options.push(value.toString());
      }
      if (key.startsWith(`questions[${i}].correctAnswers[`)) {
        correct_answers.push(value.toString());
      }
    }

    questions.push({ text, options, correct_answers });
  }

  const quiz = {
    title,
    description,
    frequency_days: frequencyDays,
    company_id: companyId,
    owner_id: ownerId,
    questions,
  };

  await updateQuiz(quiz, quizId);

  redirect(`/companies/${companyId}/quizzes`);
}
