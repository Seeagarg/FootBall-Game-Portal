import React from "react";
import BackgroundImage from "../components/BackgroundImage";
import Drawer from "../components/Drawer";
import Layout from "../components/Layout";
import NavbarTop from "../components/NavbarTop";
import Form from "../components/MainComponents/Form";

const Login = () => {
  return (
    <BackgroundImage>
      <Drawer item={3} />
      <Layout>
        <NavbarTop item={0} />
        <Form login={true} text='Login' description='If you are not a User, then' link='Sign up' to='/signup'/>
      </Layout>
    </BackgroundImage>
  );
};

export default Login;
