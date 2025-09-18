import React, { useState } from "react";
import MainNav from "./MainNav";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-80 h-full py-[4.2rem] px-[3.4rem] border-r border-gray-400 bg-[#f9f8fc] gap-12">
      <MainNav />
    </div>
  );
};

export default Sidebar;
