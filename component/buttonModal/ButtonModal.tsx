'use client'
import React from 'react';

const ButtonModal = ({id, text}:{id: string, text: string}) => {
  return (
    <button className="btn btn-secondary" onClick={() => {
      (document.getElementById(id) as HTMLDialogElement)?.showModal();
    }}>
      {text}
    </button>
  );
};

export default ButtonModal;