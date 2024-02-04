"use client";

import React, { useEffect, useState } from "react";
import NavbarRead from "@/components/costume/Navbar/navbarRead";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";


// shadcn
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const [book, setbook] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get("https://www.dbooks.org/api/recent");
      setbook(response.data.books);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <NavbarRead />
      <main className=" p-5 bg-slate-50 min-w-[100vh]">
        <div className=" mt-20">
          <div className=" px-28">
            <Input placeholder="Search Books" className=" p-6 shadow-sm" />
          </div>
          <div className=" mt-6 grid grid-cols-4 gap-5 mx-7 p-2 ">
            {book.map((items) => (
              <div className=" border rounded-md col-span-1 shadow">
                <div className="">
                  <Image
                    src={items.image}
                    width={400}
                    height={293}
                    className=" rounded-t-md bg-"
                  />
                </div>
                <div className=" mt-2">
                  <h1 className=" font-semibold text-xl text-center ">
                    {items.title}
                  </h1>
                  <p className=" text-sm mt-3 p-2">authors : {items.authors}</p>
                </div>

                <div className=" p-3">
                  <Button className=" font-semibold w-full bg-blue-600">
                    <Link href={`/read/${items.id}`}>Read Online</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
