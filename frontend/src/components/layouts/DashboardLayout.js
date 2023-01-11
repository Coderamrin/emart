import React from "react";
import Sidebar from "./Dashboard/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="md:pl-[270px]">{children}</div>
    </>
  );
};

export default DashboardLayout;
