"use client";

import { useState } from "react";
import ButtonModal from "@/component/buttonModal/ButtonModal";
import {Modal} from "@/component/modal/Modal";
import {submitQuizAttempt} from "@/action/quiz";

export default function TakeQuizModal({ quiz, userId, companyId }: { quiz: any; userId: string; companyId: string }) {
  const [answers, setAnswers] = useState<string[][]>(
    quiz.questions.map(() => [])
  );

  const handleOptionToggle = (qIndex: number, option: string) => {
    setAnswers(prev => {
      const newAnswers = [...prev];
      const alreadySelected = newAnswers[qIndex].includes(option);
      newAnswers[qIndex] = alreadySelected
        ? newAnswers[qIndex].filter(o => o !== option)
        : [...newAnswers[qIndex], option];
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    const formatted = quiz.questions.map((q: any, index: number) => ({
      questionId: q.id,
      selectedOptions: answers[index],
    }));

    await submitQuizAttempt({
      quizId: quiz.id,
      companyId,
      answers: formatted,
      userId
    });

    location.reload();
  };

  return (
    <>
      <ButtonModal text="Take Quiz" id={`take-quiz-${quiz.id}`} />

      <Modal id={`take-quiz-${quiz.id}`} title={`Take Quiz: ${quiz.title}`}>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {quiz.questions.map((q: any, qIndex: number) => (
            <div key={q.id} className="border p-4 rounded bg-gray-100">
              <h3 className="font-medium mb-2">{q.text}</h3>
              <div className="space-y-2">
                {q.options.map((option: string, oIndex: number) => (
                  <label key={oIndex} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={answers[qIndex].includes(option)}
                      onChange={() => handleOptionToggle(qIndex, option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="modal-action w-full mt-4">
          <button onClick={handleSubmit} className="btn btn-success w-full">
            Submit Quiz
          </button>
        </div>
      </Modal>
    </>
  );
}
