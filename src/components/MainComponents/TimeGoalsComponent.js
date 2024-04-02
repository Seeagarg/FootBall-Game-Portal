import React from "react";
import classes from "./TimeGoalsComponent.module.css";

const TimeGoalsComponent = ({
  time,
  homeTeamGoals,
  awayTeamGoals,
  matchLive,
  matchStatus,
}) => {
  return (
    <div className="flex flex-col justify-start items-center gap-4 ">
      <div className="">
        <h3 className="text-center">
          {matchStatus === "Halftime" ? "Half-Time" : <>{time}`</>}
        </h3>
        {matchLive && (
          <div className={classes.container}>
            <div className={classes.line}></div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center h-full">
        <div>
          <p>
            {homeTeamGoals} - {awayTeamGoals}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimeGoalsComponent;
