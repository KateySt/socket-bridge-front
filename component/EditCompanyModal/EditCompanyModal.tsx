import React from 'react';
import {Modal} from "@/component/modal/Modal";
import {changeCompany} from "@/api/companies";
import ButtonModal from "@/component/buttonModal/ButtonModal";
import {cookies} from "next/headers";

const modalId = 'edit-company-modal';

const EditCompanyModal = () => {
  return (
    <>
      <ButtonModal text='Edit Company' id={modalId}/>

      <Modal id={modalId} title="Edit Company">
        <form action={async (formData: FormData) => {
          "use server";
          const cookieStore = await cookies();
          const company = JSON.parse(cookieStore.get("company")?.value ?? "");
          const userRaw = JSON.parse(cookieStore.get("user")?.value ?? "");
          await changeCompany(
            userRaw.id,
            {...formData, companyId:company.id},
          )
        }} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">Save</button>
        </form>
      </Modal>
    </>
  );
}

export default EditCompanyModal;