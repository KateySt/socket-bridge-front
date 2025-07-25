"use client";
import {Modal} from "@/component/modal/Modal";
import ButtonModal from "@/component/buttonModal/ButtonModal";
import React, {useState} from "react";
import {createQuizAction} from "@/action/quiz";

const modalId = "create-quiz-modal";

export default function CreateQuizModal({ companyId, ownerId }: { companyId: string; ownerId: string }) {
  const [questions, setQuestions] = useState([
    { text: "", options: ["", ""], correctAnswers: [""] }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", options: ["", ""], correctAnswers: [""] }]);
  };

  const handleChange = (index: number, field: string, value: any) => {
    const updated = [...questions];
    if (field === "text") updated[index].text = value;
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
      <ButtonModal text="+ Add Quiz" id={modalId} />

      <Modal id={modalId} title="Create New Quiz">
        <form action={createQuizAction} className="space-y-4">
          <input type="hidden" name="companyId" value={companyId} />
          <input type="hidden" name="ownerId" value={ownerId} />

          <input
            type="text"
            name="title"
            placeholder="Quiz Title"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Quiz Description"
            className="textarea textarea-bordered w-full"
            required
          />
          <input
            type="number"
            name="frequencyDays"
            placeholder="Frequency (in days)"
            className="input input-bordered w-full"
            min={1}
            required
          />

          <div className="flex gap-2 flex-col max-h-[200px] overflow-y-auto">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="border p-4 rounded bg-gray-100">
                <input
                  type="text"
                  name={`questions[${qIndex}].text`}
                  placeholder={`Question ${qIndex + 1}`}
                  className="input input-bordered w-full mb-2"
                  required
                  value={q.text}
                  onChange={(e) => handleChange(qIndex, "text", e.target.value)}
                />

                {q.options.map((option, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    name={`questions[${qIndex}].options[${oIndex}]`}
                    placeholder={`Option ${oIndex + 1}`}
                    className="input input-bordered w-full mb-1"
                    required
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  />
                ))}

                <button
                  type="button"
                  className="btn btn-sm btn-secondary mb-2"
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

          <button type="button" className="btn btn-secondary w-full" onClick={addQuestion}>
            + Add Question
          </button>

          <div className="modal-action w-full">
            <button type="submit" className="btn btn-success w-full">
              Create Quiz
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
