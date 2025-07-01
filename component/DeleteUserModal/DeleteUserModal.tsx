import ButtonModal from "@/component/buttonModal/ButtonModal";
import React from "react";
import {Modal} from "@/component/modal/Modal";

const modalId = 'delete-modal';

export default function DeleteUserModal({action}: { action: () => void }) {
  return (
    <>
      <ButtonModal text='Delete' id={modalId}/>

      <Modal id={modalId} title="Confirm Deletion">
        <p className="mb-4">Are you sure you want to delete your profile? This action cannot be undone.</p>
        <form action={action}>
          <button type="submit" className="btn btn-error mr-2">Yes, Delete</button>
        </form>
      </Modal>
    </>
  );
}
