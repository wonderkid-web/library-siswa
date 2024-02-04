"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import NavbarRead from "@/components/costume/Navbar/navbarRead";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";

// icons
import { FiDownloadCloud } from "react-icons/fi";
import { LuBookOpen } from "react-icons/lu";


export default function Page({ params: { id } }) {
  const [book, setBook] = useState({});

  const getDetailBook = async () => {
    try {
      const response = await axios.get(`https://www.dbooks.org/api/book/${id}`);
      setBook(response.data); // Set the actual data, not the entire response
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailBook();
  }, [id]); // Make sure to include 'id' as a dependency

  return (
    <>
      <NavbarRead />
      <main className=" p-16">
        <div className=" mt-20">
          {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}
          <div className=" grid grid-cols-[60%_1fr] gap-8">
            <div className=" p-2">
              <div className=" border-b pb-7">
                <h1 className=" text-4xl font-semibold text-slate-700 mb-5">
                  {book.title}
                </h1>
                <span className=" bg-blue-400 px-2 py-1 text-white rounded-full">
                  {book.id}
                </span>
              </div>
              <div className=" mt-7 gap-4">
                <div className=" flex items-center gap-3 h-20 ">
                  <h2 className=" font-medium text-2xl ">Authors: </h2>
                  <span className=" text-base ml-[85px]">{book.authors}</span>
                </div>
                <div className=" flex items-center gap-3 h-20">
                  <h2 className=" font-medium text-2xl ">ID: </h2>
                  <span className=" text-base ml-[150px]">{book.id}</span>
                </div>
                <div className=" flex items-center gap-3 h-20">
                  <h2 className=" font-medium text-2xl ">Pages: </h2>
                  <span className=" text-base ml-[105px]">{book.pages}</span>
                </div>
                <div className=" flex items-center gap-3 h-20">
                  <h2 className=" font-medium text-2xl ">Publisher: </h2>
                  <span className=" text-base ml-[70px]">{book.publisher}</span>
                </div>
                <div className=" flex items-center gap-3 h-20">
                  <h2 className=" font-medium text-2xl ">Desc:</h2>
                  <span className=" text-base ml-[120px]">
                    {book.description}
                  </span>
                </div>
              </div>
            </div>
            <div className="">
              <Image
                src={book.image}
                width={600}
                height={600}
                className=" rounded-lg"
              />
            </div>
          </div>

          <div className=" mt-7 border-t py-12">
            <h2 className=" text-2xl font-medium text-slate-600">scan QR code in here</h2>
            <QRCode
              value="https://library-fbf63.web.app/read/bookprofile/9463666656"
              size={255}
            />
            <div className=" mt-4 flex gap-2">
              <Button className=" bg-blue-600 flex items-center gap-2"><FiDownloadCloud />Donlowad</Button>
              <Button className=" bg-blue-600 flex items-center gap-2"><LuBookOpen />open modal</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
