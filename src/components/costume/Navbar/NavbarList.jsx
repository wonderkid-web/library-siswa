"use client";
import React from "react";

import { IoSearch } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { SiReaddotcv } from "react-icons/si";
import { PopUp } from "../PopUp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import uuid from "react-uuid";

export default function NavbarList() {
  const path = usePathname()

  const list = [
    {
      icon: <IoHomeOutline />,
      name: "Beranda",
    },
    {
      icon: <IoSearch />,
      name: "Search",
    },
    {
      icon: <SiReaddotcv />,
      name: "Read",
    },
  ];

  return (
    <div className=" flex gap-9 items-center">
      {list.map((l) => (
        <Link 
          key={uuid()}
          className={`flex items-center gap-2 font-medium p-2 rounded-md  hover text-black transition ${path == '/'+l.name.toLocaleLowerCase() && 'bg-yellow-400 text-white'}`}
          href={l.name == "Beranda" ? '/' : '/'+l.name.toLocaleLowerCase()}
        >
          {l.name}
          {l.icon}
        </Link>
      ))}

      <PopUp />
    </div>
  );
}
