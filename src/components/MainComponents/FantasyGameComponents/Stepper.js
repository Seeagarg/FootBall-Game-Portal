import React from "react";
import classes from "./Stepper.module.css";
import DoneIcon from "@mui/icons-material/Done";
import { useSelector } from "react-redux";

const Stepper = () => {
  const { team } = useSelector((state) => state.userTeamSlice);
  return (
    <div className={classes.container}>
      <div className={classes.sub_container}>
        <div className={classes.circle_container}>
          <div
            className={`${
              team.length >= 0
                ? classes.circle_with_line_active
                : classes.circle_with_line
            }`}
          >
            <div className={classes.circle}>
              {team.length >= 1 && (
                <DoneIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              )}
            </div>
            <div
              className={`${
                team.length >= 0 ? classes.line_active : classes.line
              }`}
            ></div>
          </div>
          <h2>1</h2>
        </div>
        <div className={classes.circle_container}>
          <div
            className={`${
              team.length >= 1
                ? classes.circle_with_line_active
                : classes.circle_with_line
            }`}
          >
            <div className={classes.circle}>
            {team.length >= 2 && (
                <DoneIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              )}
            </div>
            <div
              className={`${
                team.length >= 1 ? classes.line_active : classes.line
              }`}
            ></div>
          </div>
          <h2>2</h2>
        </div>
        <div className={classes.circle_container}>
          <div
            className={`${
              team.length >= 2
                ? classes.circle_with_line_active
                : classes.circle_with_line
            }`}
          >
            <div className={classes.circle}>
            {team.length >= 3 && (
                <DoneIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              )}
            </div>
            <div
              className={`${
                team.length >= 2 ? classes.line_active : classes.line
              }`}
            ></div>
          </div>
          <h2>3</h2>
        </div>
        <div className={classes.circle_container}>
          <div
            className={`${
              team.length >= 3
                ? classes.circle_with_line_active
                : classes.circle_with_line
            }`}
          >
            <div className={classes.circle}>
            {team.length >= 4 && (
                <DoneIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              )}
            </div>
            <div
              className={`${
                team.length >= 3 ? classes.line_active : classes.line
              }`}
            ></div>
          </div>
          <h2>4</h2>
        </div>
        <div className={classes.circle_container}>
          <div
            className={`${
              team.length >= 4
                ? classes.circle_with_line_active
                : classes.circle_with_line
            }`}
          >
            <div className={classes.circle}>
            {team.length >= 5 && (
                <DoneIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              )}
            </div>
            <div
              className={`${
                team.length >= 4 ? classes.line_active : classes.line
              }`}
            ></div>
          </div>
          <h2>5</h2>
        </div>
        <div className={classes.circle_container}>
          <div
            className={`${
              team.length >= 5
                ? classes.circle_with_line_active
                : classes.circle_with_line
            }`}
          >
            <div className={classes.circle}>
            {team.length >= 6 && (
                <DoneIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              )}
            </div>
            <div
              className={`${
                team.length >= 5 ? classes.line_active : classes.line
              }`}
            ></div>
          </div>
          <h2>6</h2>
        </div>
        <div className={classes.circle_container}>
          <div
            className={`${
              team.length >= 6
                ? classes.circle_with_line_active
                : classes.circle_with_line
            }`}
          >
            <div className={classes.circle}>
            {team.length >= 7 && (
                <DoneIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              )}
            </div>
            <div
              className={`${
                team.length >= 6 ? classes.line_active : classes.line
              }`}
            ></div>
          </div>
          <h2>7</h2>
        </div>
        <div className={classes.circle_container}>
          <div
            className={`${
              team.length >= 7
                ? classes.circle_with_line_active
                : classes.circle_with_line
            }`}
          >
            <div className={classes.circle}>
            {team.length >= 8 && (
                <DoneIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              )}
            </div>
            <div
              className={`${
                team.length >= 7 ? classes.line_active : classes.line
              }`}
            ></div>
          </div>
          <h2>8</h2>
        </div>
        <div className={classes.circle_container}>
          <div
            className={`${
              team.length >= 8
                ? classes.circle_with_line_active
                : classes.circle_with_line
            }`}
          >
            <div className={classes.circle}>
            {team.length >= 9 && (
                <DoneIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              )}
            </div>
            <div
              className={`${
                team.length >= 8 ? classes.line_active : classes.line
              }`}
            ></div>
          </div>
          <h2>9</h2>
        </div>
        <div className={classes.circle_container}>
          <div
            className={`${
              team.length >= 9
                ? classes.circle_with_line_active
                : classes.circle_with_line
            }`}
          >
            <div className={classes.circle}>
            {team.length >= 10 && (
                <DoneIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              )}
            </div>
            <div
              className={`${
                team.length >= 9 ? classes.line_active : classes.line
              }`}
            ></div>
          </div>
          <h2>10</h2>
        </div>
        <div className={classes.circle_container}>
          <div
            className={`${
              team.length >= 10
                ? classes.circle_with_line_active
                : classes.circle_with_line
            }`}
          >
            <div className={classes.circle}>
            {team.length >= 11 && (
                <DoneIcon
                  sx={{
                    color: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              )}
            </div>
          </div>
          <h2 style={{ margin: 0 }}>11</h2>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
