import React from 'react';
import {Modal} from "@/component/modal/Modal";
import ButtonModal from "@/component/buttonModal/ButtonModal";

const modalId = 'delete-company-modal';

const DeleteCompanyModal = ({action}: { action: () => void }) => {
  return (
    <>
      <ButtonModal text='Delete' id={modalId}/>

      <Modal id={modalId} title="Confirm Deletion">
        <p className="mb-4">Are you sure you want to delete your company? This action cannot be undone.</p>
        <form action={action} className='w-full'>
          <button type="submit" className="btn btn-error w-full mr-2">Yes, Delete</button>
        </form>
      </Modal>
    </>
  );
};

export default DeleteCompanyModal;