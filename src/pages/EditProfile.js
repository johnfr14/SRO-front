import React from "react";
import Layout from "../components/Layout";
import { Container, SettingsInfo } from "../components/index";
import { useUser } from "../context/UserContext";

const EditProfile = () => {
  const { userState, dispatch } = useUser()
  return (
    <>
      <Layout>
        <Container children={<SettingsInfo data={userState.data} dispatch={dispatch} />} />
      </Layout>
    </>
  );
};

export default EditProfile;
