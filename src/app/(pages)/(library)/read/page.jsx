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
import { useState } from "react";

const getData = async () => {
  try {
    const response = await axios.get("https://www.dbooks.org/api/recent");
    return response.data.books;
  } catch (error) {
    console.log(error);
  }
};

export default function Page() {
  const [name, setName] = useState("");

  const { data: book, isLoading } = useQuery({
    queryFn: getData,
    queryKey: ["book"],
  });

  const { data: queried, isLoading: queriedLoading } = useQuery({
    queryFn: async () => {
      const data = await fetch(`https://www.dbooks.org/api/search/${name}`);
      const raw = await data.json();
      return raw;
    },
    queryKey: [{ name }],
  });

  if (isLoading) return <Loader />;

  return (
    <>
      <main className=" p-5 mt-20 bg-slate-50 min-w-[100vh]">
        <div className=" px-28">
          <Input
            placeholder="Search Books"
            className=" p-6 shadow-sm"
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        {queriedLoading ? (
          <Loader />
        ) : name ? (
          <div className="grid grid-cols-3 p-4 pt-[50px] place-items-center gap-[50px]">
            {queried?.books?.map((book) => {
              return (
                <div
                  className="card w-96 bg-base-100 shadow-md h-[350px]"
                  key={book.id}
                >
                  <figure className="px-10 pt-10">
                    <img
                      src={book.image}
                      alt="Shoes"
                      className="rounded-xl shadow-md relative top-[70px]"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{book.title}!</h2>
                    <p>{book.subtitle}</p>
                    <div className="card-actions">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate(
                            `/read/bookprofile/${book.id.replace(`X`, " ")}`
                          );
                        }}
                      >
                        Read Online
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
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
        )}
      </main>
    </>
  );
}
