"use client";

import {Modal} from "@/component/modal/Modal";
import ButtonModal from "@/component/buttonModal/ButtonModal";
import React, {useState} from "react";
import {updateQuizAction} from "@/action/quiz";

const modalId = "edit-quiz-modal";

export default function EditQuizModal({quiz, companyId,ownerId}: { quiz: any, companyId: string,ownerId: string }) {
  const [questions, setQuestions] = useState(
    quiz.questions.map(q => ({
      text: q.text,
      options: q.options,
      correctAnswers: q.correct_answer,
    }))
  );

  const handleChange = (qIndex: number, field: string, value: any) => {
    const updated = [...questions];
    if (field === "text") updated[qIndex].text = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex: number, cIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].correctAnswers[cIndex] = value;
    setQuestions(updated);
  };

  const addCorrectAnswer = (qIndex: number) => {
    const updated = [...questions];
    updated[qIndex].correctAnswers.push("");
    setQuestions(updated);
  };

  return (
    <>
      <ButtonModal text="Edit Quiz" id={modalId} />

      <Modal id={modalId} title="Edit Quiz">
        <form action={updateQuizAction} className="space-y-4">
          <input type="hidden" name="quizId" value={quiz.id} />
          <input type="hidden" name="ownerId" value={ownerId} />
          <input type="hidden" name="companyId" value={companyId} />
          <input
            type="text"
            name="title"
            defaultValue={quiz.title}
            placeholder="Quiz Title"
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="description"
            defaultValue={quiz.description}
            placeholder="Quiz Description"
            className="textarea textarea-bordered w-full"
            required
          />

          <input
            type="number"
            name="frequencyDays"
            defaultValue={quiz.frequency_days}
            placeholder="Frequency (in days)"
            className="input input-bordered w-full"
            min={1}
            required
          />

          <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="border p-4 rounded bg-gray-100">
                <input
                  type="text"
                  name={`questions[${qIndex}].text`}
                  className="input input-bordered w-full mb-2"
                  value={q.text}
                  onChange={e => handleChange(qIndex, "text", e.target.value)}
                  required
                />

                {q.options.map((opt, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    name={`questions[${qIndex}].options[${oIndex}]`}
                    className="input input-bordered w-full mb-1"
                    value={opt}
                    onChange={e => handleOptionChange(qIndex, oIndex, e.target.value)}
                    required
                  />
                ))}

                <button
                  type="button"
                  className="btn btn-sm btn-secondary mt-1"
                  onClick={() => addOption(qIndex)}
                >
                  + Add Option
                </button>

                <div className="mb-2">
                  {q.correctAnswers.map((correct, cIndex) => (
                    <input
                      key={cIndex}
                      type="text"
                      name={`questions[${qIndex}].correctAnswers[${cIndex}]`}
                      placeholder={`Correct Answer ${cIndex + 1}`}
                      className="input input-bordered w-full mb-1"
                      required
                      value={correct}
                      onChange={(e) => handleCorrectAnswerChange(qIndex, cIndex, e.target.value)}
                    />
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={() => addCorrectAnswer(qIndex)}
                  >
                    + Add Correct Answer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="modal-action w-full">
            <button type="submit" className="btn btn-primary w-full">Save Changes</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
