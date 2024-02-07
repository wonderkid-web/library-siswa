"use client";

import { Input } from "@/components/ui/input";
import axios from "axios";
import Image from "next/image";

// shadcn
import { Button } from "@/components/ui/button";
import Link from "next/link";
import uuid from "react-uuid";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/costume/Navbar/Loader";

const getData = async () => {
  try {
    const response = await axios.get("https://www.dbooks.org/api/recent");
    return response.data.books
  } catch (error) {
    console.log(error);
  }
};

export default function Page() {

  const {data:book, isLoading} = useQuery({
    queryFn: getData,
    queryKey: ['book']
  })

  if(isLoading) return <Loader />
 
  return (
    <>
      <main className=" p-5 mt-20 bg-slate-50 min-w-[100vh]">
        <div className=" px-28">
          <Input placeholder="Search Books" className=" p-6 shadow-sm" />
        </div>
        <div className=" mt-28 grid   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
          {book.map((items) => (
            <div
              key={uuid()}
              className={`transition border rounded-md shadow-md flex flex-col justify-between gap-4 bg-white hover:scale-105`}
            >
              <div className="relative w-56 h-56 mx-auto">
                <Image
                  src={items.image}
                  alt="image"
                  fill
                  className="object-cover object-center mx-auto my-5 rounded-t-md"
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
      </main>
    </>
  );
}
