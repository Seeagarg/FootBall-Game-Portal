import React from "react";
import classes from "./MatchComparisonProgressBar.module.css"; // Import custom CSS file for styling

const MatchComparisonProgressBar = ({
  percentage1,
  percentage2,
  value1,
  value2,
  name,
}) => {
  return (
    <div className="mt-4">
      <div className="text-center">{name}</div>
      <div className={classes.combined_progress_bar_container}>
        <div className="mr-4">{value1}</div>

        <div className={classes.combined_progress_bar}>
          <div className={classes.progress_segment_container_end}>
            <div
              className={`bg-red-800`}
              style={{ width: `${percentage1}%` }}
            ></div>
          </div>

          <div className={classes.progress_segment_container_start}>
            <div
              className={`bg-green-800`}
              style={{ width: `${percentage2}%` }}
            ></div>
          </div>
        </div>
        <div className="ml-4">{value2}</div>
      </div>
    </div>
  );
};

export default MatchComparisonProgressBar;
