import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/Title";
import Layouts from "../Layouts";
import ModalDelete from "./modalDelete";
import ModalMain from "./modalMain";
import { ACTION_TYPES } from "./postActionTypes";
import { INITIAL_STATE, postReducer } from "./postReducer";

const Posts = () => {
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
  const [act, setAct] = useState("");

  useEffect(() => {
    let isCancelled = false;
    if (!isCancelled) {
      dispatch({ type: ACTION_TYPES.FETCH_START });
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/posts?_limit=3`)
        .then((res) => {
          if (!isCancelled) {
            dispatch({ type: ACTION_TYPES.FETCH_SUCCESS, payload: res.data });
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
  }, []);

  const handleDelete = (id) => {
    const post = state.post.filter((post) => post.id === id)[0];
    dispatch({ type: ACTION_TYPES.DELETE_POST_CONFIRM, payload: post });
  };

  if (state.loading) {
    return <Loading />;
  }

  return (
    <Layouts>
      <div className="flex flex-col lg:flex-row my-3 justify-center lg:justify-between items-center pb-6">
        <div className="w-full">
          <Title
            title={"Posts"}
            subtitle={"Showing posts from API (belajar pake reducer)"}
          />
        </div>
        <div className="mt-3 lg:mt-0 w-full flex justify-center lg:justify-end">
          <a href="#main-modal" className="btn btn-primary">
            Add Post
          </a>
        </div>
      </div>
      <div className="overflow-x-auto py-4">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.post.length < 1 && (
              <tr>
                <th colSpan={3} className="text-center">
                  No Post Available
                </th>
              </tr>
            )}
            {state.post.map((post, i) => {
              return (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{post.title}</td>
                  <td className="flex flex-col gap-2">
                    <button className="btn btn-sm btn-info">Detail</button>
                    <button className="btn btn-sm btn-warning">Edit</button>
                    <a
                      href="#modalDelete"
                      className="btn btn-sm btn-error"
                      onClick={() => {
                        handleDelete(post.id);
                      }}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ModalMain state={state} dispatch={dispatch} act={act} />
      <ModalDelete state={state} dispatch={dispatch} />
    </Layouts>
  );
};

export default Posts;
