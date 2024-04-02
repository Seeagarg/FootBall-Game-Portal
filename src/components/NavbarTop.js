import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { openHandler } from "../slices/menuSlice";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../animation/animation.json";

const NavbarTop = (props) => {
  const dispatch = useDispatch();
  const openMenuHandler = () => {
    dispatch(openHandler());
  };
  return (
    <div className="flex justify-between items-center p-4">
      {/* <div "> */}
      <Link to="/" className="flex justify-start items-center gap-4">
        <Lottie
          animationData={animationData}
          style={{ width: 50, height: 70 }} // Set your desired width and height
          loop={true}
        />
        <h3 className="text-slate-200 text-xl font-semibold tracking-widest">
          Goal
          <span className="text-xl text-orange-700 font-semibold tracking-widest">
            Alert
          </span>
        </h3>
      </Link>
      {/* </div> */}

      <div className="flex justify-start items-center p-1 rounded-lg">
        <div className=" text-text_navbar_color">
          <MenuIcon
            sx={{ color: "#BFBFBF", fontSize: "3rem", cursor: "pointer" }}
            onClick={openMenuHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
