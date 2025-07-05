import {Modal} from "@/component/modal/Modal";
import ButtonModal from "@/component/buttonModal/ButtonModal";
import React from "react";
import {createQuizAction} from "@/action/quiz";

const modalId = 'create-quiz-modal';

export default async function CreateQuizModal({companyId, ownerId}: { companyId: string, ownerId: string }) {
  return (
    <>
      <ButtonModal text="+ Add Quiz" id={modalId}/>

      <Modal id={modalId} title="Create New Quiz">
        <form action={createQuizAction} className="space-y-4">
          <input type="hidden" name="companyId" value={companyId}/>
          <input type="hidden" name="ownerId" value={ownerId}/>

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

          {[0, 1].map(qIndex => (
            <div key={qIndex} className="border p-4 rounded bg-gray-100">
              <input
                type="text"
                name={`questions[${qIndex}].text`}
                placeholder={`Question ${qIndex + 1}`}
                className="input input-bordered w-full mb-2"
                required
              />
              {[0, 1].map(oIndex => (
                <input
                  key={oIndex}
                  type="text"
                  name={`questions[${qIndex}].options[${oIndex}]`}
                  placeholder={`Option ${oIndex + 1}`}
                  className="input input-bordered w-full mb-1"
                  required
                />
              ))}
              <input
                type="text"
                name={`questions[${qIndex}].correctAnswers[0]`}
                placeholder="Correct Answer"
                className="input input-bordered w-full mt-2"
                required
              />
            </div>
          ))}

          <div className="modal-action w-full">
            <button type="submit" className="btn btn-success w-full">Create Quiz</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
