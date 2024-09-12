import React from "react";
import Sidebar from "../sidebar/Sidebar";

function Dashboard() {
  const [sidebarToggle, setSidebarToggle] = React.useState(true);
  const toggleClick = () => {
    setSidebarToggle(!sidebarToggle);
  };
  return (
    <>
      <div className="coutmers flex font-[Poppins]">
        {sidebarToggle ? <div className="w-[320px] nirav"></div> : null}
        <Sidebar toggleClick={toggleClick} sidebarToggle={sidebarToggle} />
        <div className="w-[100%] ">
          <div className=" w-[90%]  m-auto mt-16  pl-2">Dashboard</div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
