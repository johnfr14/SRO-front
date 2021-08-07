import React from "react";
import Layout from "../components/Layout";
import { Container, SettingsInfo } from "../components/index";

const EditProfile = () => {
  return (
    <>
      <Layout>
        <Container children={<SettingsInfo />} />
      </Layout>
    </>
  );
};

export default EditProfile;
