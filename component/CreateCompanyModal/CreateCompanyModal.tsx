import {Modal} from "@/component/modal/Modal";
import {company} from "@/action/company";
import ButtonModal from "@/component/buttonModal/ButtonModal";
import React from "react";

const modalId = 'create-company-modal';

export default function CreateCompanyModal() {
  return (
    <>
      <ButtonModal text='+ Add Company' id={modalId}/>

      <Modal id={modalId} title="Create New Company">
        <form
          action={company}
          className="space-y-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full"
            required
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="visible"
              className="checkbox"
            />
            <span>Visible</span>
          </label>
          <div className="modal-action w-full">
            <button type="submit" className="btn btn-success w-full">Create</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
