import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Active NFTs",
    path: "/",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Manage Home",
    path: "/popular",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Verify Users",
    path: "/users",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <IoIcons.IoMdSettings />,
    cName: "nav-text",
  },
];
