import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/Bulat.svg";

// icons
import { FaFacebook } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { SiReaddotcv } from "react-icons/si";

export default function navbar() {
  return (
    <nav className=" fixed border p-4 w-full flex z-10 justify-between items-center top-0 bg-white shadow">
      <div className=" flex gap-2">
        <h1 className=" text-2xl font-medium">Library Panda</h1>
        <Image src={logo} width={40} height={40} />
      </div>
      <div className=" flex gap-9 items-center">
        <Link
          className=" flex items-center gap-2 font-medium p-2 rounded-md hover:bg-yellow-400 hover hover:text-white transition"
          href={"/beranda"}
        >
          <IoHomeOutline />
          Beranda
        </Link>

        <Link
          className=" flex items-center gap-2 font-medium p-2 rounded-md bg-yellow-400 hover text-white transition"
          href={"/search"}
        >
          <IoSearch />
          Seacrh
        </Link>
        
        <Link
          className=" flex items-center gap-2 font-medium p-2 rounded-md hover:bg-yellow-400 hover hover:text-white transition"
          href={"read"}
        >
          <SiReaddotcv />
          Read
        </Link>
        <Link href={"/read"}>
          <FaFacebook className=" text-blue-600 text-4xl" />
        </Link>
      </div>
    </nav>
  );
}
