import React from "react";
import Header from "../../components/header";
import { Sidebar } from "../../components/sidebar";

import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          style={{
            padding: "1rem",
            flex: 1,
            height: "100vh",
            overflowY: "scroll",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
