import React, { useEffect, useState } from "react";
import BackgroundImage from "../components/BackgroundImage";
import Drawer from "../components/Drawer";
import Layout from "../components/Layout";
import NavbarTop from "../components/NavbarTop";
import Navbar from "../components/Navbar";
import { useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import axios from "axios";
import { baseUrl, playersApi } from "../api/api";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

const PlayersScreen = () => {
    const [data,setData]=useState([]);
    const [paging,setPaging]=useState("");
    const [loading,setLoading]=useState(true);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const currentPage = parseInt(searchParams.get('page')) || 1;
    console.log(currentPage,'cp');

    const {lang}=useSelector(state=>state.lang);
  
    const fetchDataFromBackend=async()=>{
        try {
            const res=await axios.get(`${baseUrl}${playersApi}${currentPage}`);
            console.log(res);
            setData(res?.data?.response?.response);
            setPaging(res?.data?.response?.paging);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error?.message || error?.data?.message);
        }
    }
    useEffect(()=>{
        fetchDataFromBackend();
    },[currentPage])
    
  return (
    <BackgroundImage>
      <Drawer item={3} />
      <Layout>
        <NavbarTop item={3} />
        <Navbar item={3} />
        {loading ? <Loader /> : (
            <>
                <div className="bg-black p-4 mt-6 rounded-lg">
                    {data?.map((dataItem,i)=>{
                        const {player,statistics}=dataItem;
                        return(
                            <div key={i}>
                                <img src={player?.photo} alt={player?.name} className="w-full h-20 rounded-md"/>
                            </div>
                        )
                    })}
                   
                </div>
            </>
        )}
      </Layout>
    </BackgroundImage>
  );
};

export default PlayersScreen;
