import React from "react";

const ModalDelete = ({ post }) => {
  return (
    <>
      <div className="modal" id="modalDelete">
        <div className="modal-box bg-error">
          <h3 className="font-bold text-lg text-center text-error-content">
            Warning!
          </h3>
          <p className="py-4 text-center text-error-content">
            Are you sure want to delete post with title{" "}
            <span className="font-bold">{post.title}</span>?
          </p>
          <div className="modal-action">
            <label htmlFor="modal-delete" className="btn">
              Noooooo
            </label>
            <label
              htmlFor="modal-delete"
              className="btn btn-error"
              id="modal-proceed-delete"
            >
              Yes
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDelete;
