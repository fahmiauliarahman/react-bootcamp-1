import axios from "axios";
import React from "react";
import { ACTION_TYPES } from "./postActionTypes";

const ModalDelete = ({ state, dispatch }) => {
  const doDeletePost = (id) => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch({ type: ACTION_TYPES.FETCH_START });
      axios
        .delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
        .then((res) => {
          if (!isCancelled) {
            const data = state.post.filter((item) => item.id !== id);
            dispatch({ type: ACTION_TYPES.DELETE_POST, payload: data });
          }
        })
        .catch((err) => {
          if (!isCancelled) {
            dispatch({ type: ACTION_TYPES.FETCH_ERROR, payload: err });
          }
        })
        .finally(() => {
          if (!isCancelled) {
            dispatch({ type: ACTION_TYPES.FETCH_END });
          }
        });
      return () => {
        isCancelled = true;
      };
    }
  };
  return (
    <>
      <div className="modal modal-bottom sm:modal-middle" id="modalDelete">
        <div className="modal-box bg-error">
          <h3 className="font-bold text-lg text-center text-error-content">
            Warning!
          </h3>
          <p className="py-4 text-center text-error-content">
            Are you sure want to delete post with title{" "}
            <span className="font-bold">{state.selectedPost?.title}</span>?
          </p>
          <div className="modal-action">
            <a href="#" className="btn border-none text-white">
              Noooooo
            </a>
            <label
              htmlFor="modal-delete"
              className="btn bg-red-700 hover:bg-red-900 text-white border-none"
              onClick={() => {
                doDeletePost(state.selectedPost?.id);
              }}
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
