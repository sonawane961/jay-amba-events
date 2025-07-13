import React from "react";
import { increment, decrement } from "@/store/slices/counterSlice";
import { useSelector, useDispatch } from "react-redux";

const Details = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Details page</h1>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </>
  );
};

export default Details;
