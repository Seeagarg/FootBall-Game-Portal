import React, { useState } from "react";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, loginApi } from "../../api/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import SmallLoading from "../LoadingVariants/SmallLoading";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";

const Form = ({ login, text, description, link, to }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get("redirect");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch();

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = { number: mobile, password };
      const res = await axios.post(`${baseUrl}${loginApi}`, data);
      console.log(res, "res");
      dispatch(setUser(res?.data));
      toast.success("Logged In Successfully!");
      setLoading(false);
      if (redirect) {
        navigate(`/${redirect}`);
      } else {
        navigate("/");
      }
      setMobile("");
      setPassword("");
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          error
      );
      console.log(error, "error");
    }
  };
  const signupSubmitHandler = (e) => {
    e.preventDefault();
    setMobile("");
    setPassword("");
  };
  return (
    <div className="mt-16 p-4 w-full bg-gradient-to-r from-stone-800/80 to-stone-800/70">
      <form
        className=" flex flex-col justify-center items-center gap-6"
        onSubmit={login ? loginSubmitHandler : signupSubmitHandler}
      >
        <div>
          <p className="tracking-widest text-3xl font-Sans font-semibold">
            {text}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex w-2/4 max-[800px]:w-full">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <PhoneAndroidIcon />
            </span>
            <input
              type="number"
              id="mobile-number"
              className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your mobile number"
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex w-2/4 max-[800px]:w-full">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <VpnKeyIcon />
            </span>
            <input
              type="password"
              id="password"
              className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="p-2 text-center bg-gray-900 rounded-lg w-1/4 max-[800px]:w-3/4 hover:bg-gray-800
          
          "
          type="submit"
        >
          {text}
        </button>
      </form>

      {loading && <SmallLoading />}

      {/* <div className="flex justify-center items-center py-4">
        <p>{description} <Link to={`${to}`} className="underline text-blue-400" >{link}</Link></p>
      </div> */}
    </div>
  );
};

export default Form;
