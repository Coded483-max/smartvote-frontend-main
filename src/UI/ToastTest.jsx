import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastTest() {
  const showToast = () => {
    console.log("About to show toast");
    toast("This is a test toast!");
    console.log("Toast called");
  };

  return (
    <div>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default ToastTest;
