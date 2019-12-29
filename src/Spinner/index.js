import React from "react";
import style from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={style.container}>
      <span className={style.spinner} />
    </div>
  );
};

export default Spinner;
