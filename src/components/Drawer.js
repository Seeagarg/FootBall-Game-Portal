import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { closeHandler } from "../slices/menuSlice";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../animation/animation.json";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { baseUrl, logoutApi } from "../api/api";
import { toast } from "react-toastify";
import { logoutUser } from "../slices/userSlice";

const Drawer = (props) => {
  const { open } = useSelector((state) => state.menu);
  const navigate = useNavigate();
  console.log(open, "open");
  const dispatch = useDispatch();

  const { lang } = useSelector((state) => state.lang);
  const mainControls = useAnimation();

  const variants = {
    hidden: { opacity: 0, x: -500 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    if (open) {
      mainControls.start(variants.visible);
    }
  }, [open]);

  const closeMenuHandler = () => {
    dispatch(closeHandler());
    mainControls.start(variants.hidden);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${baseUrl}${logoutApi}`);
      console.log(res,'res');
      dispatch(logoutUser());
      toast.success("Logout Successfull");
      closeMenuHandler();
      navigate("/login");
    } catch (error) {
      console.log(error, "error");
      closeMenuHandler();
    }
  };

  const {user}=useSelector(state=>state.userSlice);

  return (
    <motion.div
      variants={variants}
      initial={variants.hidden}
      animate={mainControls}
      transition={{ duration: 0.5 }}
      className={
        open
          ? "fixed top-0 bg-background_navbar w-4/12 h-screen overflow-y-auto z-50 max-[800px]:w-full"
          : "hidden"
      }
    >
      <div className="mx-10">
        <div className="absolute top-3 right-3">
          <CloseIcon
            sx={{ color: "white", cursor: "pointer" }}
            onClick={closeMenuHandler}
          />
        </div>
        <div className="flex flex-col my-10 gap-10 justify-between items-center p-4">
          <div>
            {/* <img
              src="/images/football.png"
              alt="Logo"
              className="w-full h-20 cursor-pointer"
            /> */}
            <Lottie
              animationData={animationData}
              style={{ width: 100, height: 80 }} // Set your desired width and height
              loop={true}
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-4 bg-background_dark p-1 rounded-lg">
            <Link to="/">
              <div
                onClick={closeMenuHandler}
                className={
                  props.item === 0
                    ? "bg-background_navbar p-4 text-color_white rounded-lg cursor-pointer"
                    : "p-4 text-text_navbar_color cursor-pointer"
                }
              >
                {lang === "english"
                  ? "Live Matches"
                  : lang === "french"
                  ? "Matchs en direct"
                  : lang === "spanish"
                  ? "Partidos en vivo"
                  : "المباريات الحية"}
              </div>
            </Link>
            <Link to="/recent-matches">
              <div
                onClick={closeMenuHandler}
                className={
                  props.item === 1
                    ? "bg-background_navbar p-4 text-color_white rounded-lg cursor-pointer"
                    : "p-4 text-text_navbar_color cursor-pointer"
                }
              >
                {lang === "english"
                  ? "Recent Fixtures"
                  : lang === "french"
                  ? "Calendriers récents"
                  : lang === "spanish"
                  ? "Calendario reciente"
                  : "المباريات الأخيرة"}
              </div>
            </Link>
            <Link to="/weekly-matches">
              <div
                onClick={closeMenuHandler}
                className={
                  props.item === 2
                    ? "bg-background_navbar p-4 text-color_white rounded-lg cursor-pointer"
                    : "p-4 text-text_navbar_color cursor-pointer"
                }
              >
                {lang === "english"
                  ? "Weekly Fixtures"
                  : lang === "french"
                  ? "Rencontres hebdomadaires"
                  : lang === "spanish"
                  ? "Calendario semanal"
                  : "المباريات الأسبوعية"}
              </div>
            </Link>
            <Link to="/standings">
              <div
                onClick={closeMenuHandler}
                className={
                  props.item === 4
                    ? "bg-background_navbar p-4 text-color_white rounded-lg cursor-pointer"
                    : "p-4 text-text_navbar_color cursor-pointer"
                }
              >
                {lang === "english"
                  ? "Standings"
                  : lang === "french"
                  ? "Classement"
                  : lang === "spanish"
                  ? "Clasificación"
                  : "الترتيب"}
              </div>
            </Link>
            {/* <div onClick={()=>navigate("/players")}> */}
            {/* <Link to="/players">
              <div
                onClick={closeMenuHandler}
                className={
                  props.item === 3
                    ? "bg-background_navbar p-4 text-color_white rounded-lg cursor-pointer"
                    : "p-4 text-text_navbar_color cursor-pointer"
                }
              >
                
                {lang === "english"
            ? "Players"
            : lang === "french"
            ? "Joueurs"
            : "Jugadores"}
              </div>
            </Link> */}

            {/* </div> */}

            {user?.token ? (
              <div
                onClick={handleLogout}
                className={
                  props.item === 3
                    ? "bg-background_navbar p-4 text-color_white rounded-lg cursor-pointer"
                    : "p-4 text-text_navbar_color cursor-pointer"
                }
              >
                Logout
              </div>
            ) : (
              <Link to="/login">
                <div
                  onClick={closeMenuHandler}
                  className={
                    props.item === 3
                      ? "bg-background_navbar p-4 text-color_white rounded-lg cursor-pointer"
                      : "p-4 text-text_navbar_color cursor-pointer"
                  }
                >
                  Login
                </div>
              </Link>
            )}

            {/* <Link to="/signup">
              <div
                onClick={closeMenuHandler}
                className={
                  props.item === 4
                    ? "bg-background_navbar p-4 text-color_white rounded-lg cursor-pointer"
                    : "p-4 text-text_navbar_color cursor-pointer"
                }
              >
                Sign up
              </div>
            </Link> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Drawer;
