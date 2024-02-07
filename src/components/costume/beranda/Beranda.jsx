"use client";
import NavbarBeranda from "@/components/costume/Navbar/Navbar";
import Image from "next/image";
import bulat from "/public/Bulat.svg";
import book from "/public/book.svg";
import circle from "/public/SemiCircle.svg";

import axios from "axios";
import Link from "next/link";

// icons
import { IoSearch } from "react-icons/io5";
import uuid from "react-uuid";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/costume/Navbar/Loader";
import { useSession } from "next-auth/react";
import { format, setDate } from "date-fns";
import { id } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";

const getBerita = async () => {
  return (await axios(process.env.NEXT_PUBLIC_BASE_BERITA_URL)).data.data;
};

export default function Beranda() {
  // const session = useSession();
  const [user, setUser] = useState("");

  const { handleSubmit, register } = useForm();

  const { data: berita, isLoading } = useQuery({
    queryFn: getBerita,
    queryKey: ["berita"],
  });

  

  if (isLoading) return <Loader />;

  return (
    <>
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
                <Link
                  href={"read"}
                  className="text-white bg-blue-500 shadow-md rounded-full text-xl px-5 py-7 flex gap-2 items-center"
                >
                  <IoSearch />
                  Search Book
                </Link>
              </div>
            </div>
          </div>
          <div className="p-7">
            <Image src={book} />
          </div>
        </div>
        <div className=" mt-6 grid grid-cols-5 place-content-center place-items-center gap-12 p-5 border-t">
          {berita.map((data) => (
            <div
              key={uuid()}
              className="max-w-sm relative w-[14.7rem] h-[23rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-105 transition hover:cursor-pointer"
            >
              <div className="relative w-[14.7rem] h-36">
                <Image
                  className="rounded-t-lg object-cover object-center"
                  src={data.image.large}
                  alt={data.title}
                  fill
                />
              </div>
              <div className="p-5">
                <Link href={data.link}>
                  <h5 className="mb-2 text-md line-clamp-3 font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.title}
                  </h5>
                </Link>
                <p className="mb-3 line-clamp-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                  {data.contentSnippet}
                </p>
                <Link
                  href={data.link}
                  className="absolute right-2 inline-flex items-center px-2 py-1 mt-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Baca Berita
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
