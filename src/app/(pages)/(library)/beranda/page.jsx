"use client";

import React, { useEffect } from "react";
import { useState } from "react";

import NavbarBeranda from "@/components/costume/Navbar/navbarDashboard";
import Image from "next/image";
import bulat from "../../../../../public/Bulat.svg";
import book from "../../../../../public/book.svg";
import circle from "../../../../../public/SemiCircle.svg";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

// icons
import { IoSearch } from "react-icons/io5";

export default function page() {
  const [berita, setBerita] = useState([]);

  const getBerita = async () => {
    try {
      const response = await axios.get(
        "https://newsdata.io/api/1/news?apikey=%20pub_375958463fa34ae9ac57837482221ef1d0b5c%20&q=news"
      );
      console.log(response.data.results);
      setBerita(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBerita();
  }, []);

  return (
    <>
      <NavbarBeranda />
      <main className=" p-5">
        {/* <pre className=" mt-28"> {JSON.stringify(berita, null, 2)}</pre> */}
        <div className=" mt-20 grid grid-cols-2">
          <div className=" py-8 mx-20 h-max bg-white">
            <div className=" flex items-center gap-4">
              <h1 className=" text-5xl font-semibold">Perpusatakaan</h1>
              <Image src={bulat} width={150} height={150} />
            </div>
            <div className=" mt-5">
              <h1 className=" text-5xl font-semibold mt-3">SMK Putra Anda</h1>
              <div className=" flex items-center gap-2 mt-4">
                <Image src={circle} width={50} height={50} />
                <h1 className=" text-5xl font-semibold">Binjai</h1>
              </div>
              <div className=" mt-4">
                <p className=" text-base border-b pb-8">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                  dolor quisquam omnis tempore, perspiciatis voluptatibus
                  necessitatibus ea aspernatur eos? Esse temporibus consectetur
                  qui eaque numquam ut impedit, quibusdam iure est in aliquam
                  quasi eum magni quibusdam
                </p>
              </div>
              <div className=" mt-5">
                <Button className=" bg-blue-500 shadow-md rounded-full text-xl px-5 py-7 flex gap-2 items-center">
                  <IoSearch />
                  Search Book
                </Button>
              </div>
            </div>
          </div>
          <div className="p-7">
            <Image src={book} />
          </div>
        </div>

        <div className=" mt-6 grid grid-cols-4 gap-2 p-5 border-t">
          {berita.map((data) => (
            <div className=" border col-span-1 rounded-md">
              <div>
                <Image
                  src={data.imae_url}
                  width={400}
                  height={400}
                  className=" rounded-t-md"
                />
              </div>
              <div className=" p-4 h-36">
                <h1 className=" text-justify">{data.title}</h1>
              </div>
              <div className=" flex items-center">
                <Button className=" w-[80%] mx-auto my-4 bg-blue-500 text-white">
                  <Link href={`${data.link}`}>Lihat Berita</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
