import axios from "axios";
import React, { useEffect } from "react";
import { ACTION_TYPES } from "./postActionTypes";

const ModalMain = ({ state, dispatch, act, setAct }) => {
  useEffect(() => {
    if (act === "create") {
      dispatch({
        type: ACTION_TYPES.UPDATE_SELECTED_POST,
        payload: {
          id: state.post[state.post.length - 1].id + 1,
        },
      });
    }
  }, [act]);

  const modalTitle = (act) => {
    switch (act) {
      case "create":
        return "Create Post";

      case "read":
        return "Post Detail";

      case "edit":
        return "Edit Post";

      default:
        return "??";
    }
  };

  const handleSubmit = () => {
    console.log(state.selectedPost);
    if (
      state.selectedPost.title.length < 1 ||
      state.selectedPost.body.length < 1
    ) {
      dispatch({
        type: ACTION_TYPES.FETCH_ERROR,
        payload: "Please fill all field",
      });

      dispatch({
        type: ACTION_TYPES.RESET_FORM,
      });

      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Charset: "UTF-8",
    };

    if (act === "create") {
      dispatch({
        type: ACTION_TYPES.FETCH_START,
      });

      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/posts`,
          state.selectedPost,
          headers
        )
        .then((result) => {
          let data = result.data;
          data.id = state.selectedPost.id;

          dispatch({
            type: ACTION_TYPES.FETCH_SUCCESS,
            payload: [...state.post, data],
          });
        })
        .finally(() => {
          dispatch({
            type: ACTION_TYPES.RESET_FORM,
          });
        });
    }

    if (act === "edit") {
      dispatch({
        type: ACTION_TYPES.FETCH_START,
      });

      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/posts/${state.selectedPost.id}`,
          state.selectedPost,
          headers
        )
        .then((result) => {
          const data = result.data;
          const i = state.post.findIndex(
            (post) => post.id === state.selectedPost.id
          );
          const newPost = [...state.post];
          newPost[i] = data;

          dispatch({
            type: ACTION_TYPES.FETCH_SUCCESS,
            payload: newPost,
          });
        })
        .finally(() => {
          dispatch({
            type: ACTION_TYPES.RESET_FORM,
          });
        });
    }
  };

  return (
    <>
      <div className="modal modal-bottom sm:modal-middle" id="main-modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{modalTitle(act)}</h3>
          <div className="py-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Post Title</span>
              </label>
              <input
                disabled={act === "read" ? "disabled" : ""}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={state?.selectedPost?.title}
                onChange={(e) => {
                  dispatch({
                    type: ACTION_TYPES.UPDATE_SELECTED_POST,
                    payload: {
                      title: e.target.value,
                    },
                  });
                }}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Body</span>
              </label>
              <input
                disabled={act === "read" ? "disabled" : ""}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={state?.selectedPost?.body}
                onChange={(e) => {
                  dispatch({
                    type: ACTION_TYPES.UPDATE_SELECTED_POST,
                    payload: {
                      body: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="modal-action">
            <a
              href="#"
              className="btn"
              onClick={() => {
                setAct("");
                dispatch({ type: ACTION_TYPES.RESET_FORM });
              }}
            >
              Cancel
            </a>
            {["create", "edit"].includes(act) && (
              <a
                href="#"
                className="btn btn-primary"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalMain;
