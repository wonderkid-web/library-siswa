"use client";

import React, { useEffect, useState } from "react";
import NavbarRead from "@/components/costume/Navbar/navbarSearch";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function page() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://65b0c1b7d16d31d11bdd2e7a.mockapi.io/book"
      );
      setData(response.data);
      console.log(data);
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
      <main className=" p-8 bg-slate-50 min-w-[100vh]">
        <div className=" mt-28 grid grid-cols-4 gap-9">
          {data.map((items) => (
            <div className=" border rounded-md bg-white shadow-md">
              <div>
                <Image
                  className=" bg-cover mx-auto my-5 rounded-t-md"
                  src={items.cover}
                  width={230}
                  height={230}
                />
              </div>
              <div className=" p-4">
                <h1 className=" font-semibold text-lg text-center">
                  {items.title}
                </h1>
                <div className=" flex justify-center">
                  <span className=" mt-3  text-white text-sm font-semibold p-2 rounded-md bg-yellow-500">
                    Stock : {items.stock}
                  </span>
                </div>
                <p className=" mt-3  text-sm">{items.description}</p>
                <div className=" flex justify-center mt-4">
                    <Button className=" text-white font-semibold bg-blue-600 w-[90%]">Borrow</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
