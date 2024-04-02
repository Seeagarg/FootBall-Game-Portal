import React from "react";
import BackgroundImage from "../components/BackgroundImage";
import Drawer from "../components/Drawer";
import Layout from "../components/Layout";
import NavbarTop from "../components/NavbarTop";
import Form from "../components/MainComponents/Form";

// This is the signup page 

const Signup = () => {
  return (
    <BackgroundImage>
      <Drawer item={4} />
      <Layout>
        <NavbarTop item={0} />
        <Form login={false} text='Sign up' description='If you are already a User, then' link='Login' to='/login'/>
      </Layout>
    </BackgroundImage>
  );
};

export default Signup;
