import React from "react";
import ButtonModal from "@/component/buttonModal/ButtonModal";
import {Modal} from "@/component/modal/Modal";

const modalId = 'quiz-company-modal';

const DeleteQuizModal  = ({action}: { action: () => void }) => {
  return (
    <>
      <ButtonModal text='Delete' id={modalId}/>

      <Modal id={modalId} title="Confirm Deletion">
        <p className="mb-4">Are you sure you want to delete this quiz?</p>
        <form action={action} className='w-full'>
          <button type="submit" className="btn btn-error w-full mr-2">Yes, Delete</button>
        </form>
      </Modal>
    </>
  );
};

export default DeleteQuizModal;