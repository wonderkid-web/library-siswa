'use client'
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

const getBerita = async () =>{
  return (await axios("https://newsdata.io/api/1/news?apikey=%20pub_375958463fa34ae9ac57837482221ef1d0b5c%20&q=news")).data.results
}

export default  function Page() {

  const session = useSession()

  const {data:berita, isLoading} = useQuery({
    queryFn: getBerita,
    queryKey: ['berita']
  })

  if(isLoading) return <Loader />
  

  return (
    <>
    <pre>
      {JSON.stringify(session, null, 2)}
    </pre>
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
                <Link href={'read'} className="text-white bg-blue-500 shadow-md rounded-full text-xl px-5 py-7 flex gap-2 items-center">
                  <IoSearch />
                  Search Book
                </Link >
              </div>
            </div>
          </div>
          <div className="p-7">
            <Image src={book} />
          </div>
        </div>

        <div className=" mt-6 grid grid-cols-4 gap-2 p-5 border-t">
          {berita.map((data) => (
            <div key={uuid()} className=" border col-span-1 rounded-md">
              <div>
                <img src={data.image_url} className=" rounded-t-md" />
              </div>
              <div className=" p-4 h-36">
                <h1 className=" text-justify">{data.title}</h1>
              </div>
              <div className=" flex items-center">
                <Link
                  className=" w-[80%] text-center rounded-md px-4 mx-auto mb-2 h-8 leading-7 hover:bg-blue-600 bg-blue-500 text-white"
                  href={`${data.link}`}
                >
                  Lihat Berita
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
