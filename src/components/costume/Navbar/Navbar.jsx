import React from "react";
import Image from "next/image";
import logo from "/public/Bulat.svg";

// icons
import NavbarList from "./NavbarList";

export default async function Navbar() {
  
  return (
    <nav className=" fixed border p-4 w-full flex z-10 justify-between items-center top-0 bg-white shadow">
      
      <div className=" flex gap-2">
        <h1 className=" text-2xl font-medium">Library Panda</h1>
        <Image src={logo} width={40} height={40} />
      </div>
     <NavbarList />
    </nav>
  );
}
