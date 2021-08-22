import React from "react";
import Layout from "../components/Layout";
import { Container, SettingsInfo } from "../components/index";
import { UserData } from "../data/UserData";

const EditProfile = () => {
  const data = UserData()
  return (
    <>
      <Layout>
        <Container children={<SettingsInfo data={data} />} />
      </Layout>
    </>
  );
};

export default EditProfile;
