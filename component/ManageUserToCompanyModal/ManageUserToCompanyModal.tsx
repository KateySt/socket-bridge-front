import React from 'react';
import ButtonModal from "@/component/buttonModal/ButtonModal";
import {Modal} from "@/component/modal/Modal";
import {getUsers} from "@/api/users";
import {cookies} from "next/headers";

type Props = {
  modalId: string;
  textButton: string;
  description: string;
  onSubmit: (formData: FormData) => void;
}

const ManageUserToCompanyModal = async ({modalId, textButton, description, onSubmit}: Props) => {
  const cookieStore = await cookies();
  const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "{}");

  const response = await getUsers();
  const users = Object.entries(response)
    .filter(([key]) => !isNaN(Number(key)))
    .map(([_, user]) => user)
    .filter((user) => user.id !== userRaw.id);

  return (
    <>
      <ButtonModal text={textButton} id={modalId}/>

      <Modal id={modalId} title={textButton}>
        <form action={async (formData: FormData) => {
          "use server";
          await onSubmit(formData);
        }} className="space-y-4">
          <p>{description}</p>
          <div className="max-h-64 overflow-y-auto">
            {users.map((user) => (
              <label key={user.id} className="flex items-center space-x-2">
                <input type="radio" name="userId" value={user.id} required />
                <span>{user.username} ({user.email})</span>
              </label>
            ))}
          </div>
          <button type="submit" className="btn btn-primary w-full">Ok</button>
        </form>
      </Modal>
    </>
  );
}

export default ManageUserToCompanyModal;