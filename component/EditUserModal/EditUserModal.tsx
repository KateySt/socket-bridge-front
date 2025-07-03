import {Modal} from "./../modal/Modal";
import React from 'react';
import {user} from "@/action/user";
import ButtonModal from "@/component/buttonModal/ButtonModal";

const modalId = 'edit-user-modal';

export default function EditUserModal() {
  return (
    <>
      <ButtonModal text='Edit user' id={modalId}/>

      <Modal id={modalId} title="Edit User">
        <form action={user} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">Save</button>
        </form>
      </Modal>
    </>
  );
}