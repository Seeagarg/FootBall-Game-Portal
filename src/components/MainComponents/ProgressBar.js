import React from "react";
import classes from "./ProgressBar.module.css";
import { useSelector } from "react-redux";

const ProgressBar = ({ percentage1, percentage2, percentage3 }) => {
  const {lang}=useSelector(state=>state.lang);
  return (
    <div className={classes.combined_progress_bar}>
      <div
        className={`bg-red-400 ${classes.progress_segment}`}
        style={{ width: `${percentage1}%` }}
      >
        {percentage1}%
      </div>
      <div
        className={`bg-stone-400 ${classes.progress_segment}`}
        style={{ width: `${percentage2}%` }}
      >
        {lang === "english"
          ? "Draw: "
          : lang === "french"
          ? "Dessiner:"
          : lang==="spanish"? "Dibujar:":"يرسم:"}{" "}
        {percentage2}%
      </div>
      <div
        className={`bg-red-400 ${classes.progress_segment}`}
        style={{ width: `${percentage3}%` }}
      >
        {percentage3}%
      </div>
    </div>
  );
};

export default ProgressBar;
