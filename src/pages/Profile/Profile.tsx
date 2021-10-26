import React from "react";
import AppHeader from "../../components/app-header/app-header";
import EditProfile from "../../components/edit-profile/edit-profile";
import ProfileSidebar from "../../components/profile-sidebar/profile-sidebar";

const CONTAINER_STYLE = {
  maxWidth: 1280,
  padding: "0 40px",
  display: "flex",
  margin: "120px auto 0",
};

const Profile: React.FC = () => {
  return (
    <>
      <AppHeader />
      <div style={CONTAINER_STYLE}>
        <ProfileSidebar />
        <EditProfile />
      </div>
    </>
  );
};

export default Profile;
