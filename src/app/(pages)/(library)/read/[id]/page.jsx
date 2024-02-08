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
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/costume/Navbar/Navbar";

const getSpesificBook = async (id) => {
  try {
    const { data } = await axios.get(`https://www.dbooks.org/api/book/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export default function Page({ params: { id } }) {
  const clear = id.replace(/X/g, "");
  const { data: book, isLoading } = useQuery({
    queryFn: () => getSpesificBook(clear),
    queryKey: ["detail"],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <h1>Loading buku...</h1>;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-16 mt-20">
        {/* <pre>{JSON.stringify(book, null, 2)}</pre> */}
        <div className=" grid grid-cols-[60%_1fr] gap-8">
          <div className=" p-2">
            <div className=" border-b pb-7">
              <h1 className=" textmt-20-4xl font-semibold text-slate-700 mb-5">
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
              alt={book.publisher}
            />
          </div>
        </div>

        <div className=" mt-7 border-t py-12 flex flex-col gap-4  w-fit items-center">
          <QRCode
            value={`https://library-fbf63.web.app/read/bookprofile/${clear}`}
            size={150}
          />
          <div className=" mt-4 flex gap-2 mx-auto">
            <Link
              href={book.download}
              className="w-32 text-white bg-blue-600 flex items-center gap-2 rounded-md justify-center"
            >
              <FiDownloadCloud />
              Download
            </Link>
            <Button
              onClick={openModal}
              className=" bg-blue-600 flex items-center gap-2"
            >
              <LuBookOpen />
              open modal
            </Button>
            <div>
              {isModalOpen && (
                <dialog
                  id="my_modal_3"
                  className="modal absolute top-[70vh] w-2/3 mx-auto flex flex-col justify-center items-center h-3/4 rounded-md"
                  open
                >
                  <form
                    method="dialog"
                    className="modal-box w-11/12 max-w-5xl h-full"
                  >
                    <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                      onClick={closeModal}
                    >
                      ✕
                    </button>
                    <h3 className="font-bold text-3xl text-center m-4">
                      {book.title}
                    </h3>
                    <iframe
                      className="w-full h-[95%]"
                      src={`${book.url}pdf/`}
                    ></iframe>
                  </form>
                </dialog>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
