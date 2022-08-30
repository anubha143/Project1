import React, { useReducer } from "react";
import { INITIAL_STATE, postReducer } from "./postReducer";

const Post = () => {
  const [state, dispatch] = useReducer(postReducer, INITIAL_STATE);
  const handleFetch = () => {
    dispatch({ type: "FETCH_START" });
    fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "FETCH_ERROR" });
      });
  };
  return (
    <div>
      <button style={{ marginTop: "20px" }} onClick={handleFetch}>
        {state.loading ? "Wait..." : "Fetch the Post"}
      </button>

      <p>{state?.post?.title}</p>
      <span>{state.error && "Something went Wrong!"}</span>
    </div>
  );
};

export default Post;
