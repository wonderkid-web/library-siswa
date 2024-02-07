"use client";

import React, { useEffect, useState } from "react";
import NavbarRead from "@/components/costume/Navbar/navbarSearch";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import uuid from "react-uuid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLoan } from "@/action";
import { Toaster, toast } from "sonner";
import Loader from "@/components/costume/Navbar/Loader";

const getData = async () => {
  try {
    const response = await axios.get(
      "https://65b0c1b7d16d31d11bdd2e7a.mockapi.io/book"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default function Page() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryFn: getData,
    queryKey: ["search"],
    refetchOnWindowFocus: "always"
  });

  const stocking = useMutation({
    mutationFn: (data) => createLoan(data),
    queryKey: ["update"],
    onSuccess: () => {
      queryClient.invalidateQueries("search");
      toast.success("Buku Berhasil Dipinjam!", {
        duration: 1500,
      });
    },
    onError: (err) => toast.error("eror update stock"),
  });

  const handleLoan = async (data) => {
    try {
      toast.info("Proses Peminjaman...");
      stocking.mutate({...data, bookId: data.id});
    } catch (error) {
      toast.error(`Gagal Meminjam Buku: ${data.title}`);
      console.error(error);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Toaster />
      <main className=" p-8 bg-slate-50 min-w-[100vh]">
        <div className=" mt-28 grid grid-cols-4 gap-9">
          {data.map((items) => (
            <div
              key={uuid()}
              className={`transition border rounded-md shadow-md flex flex-col justify-between gap-4 ${
                !items.stock
                  ? "bg-slate-200 cursor-not-allowed"
                  : "bg-white hover:scale-105"
              }`}
            >
              <div className="relative w-56 h-56 mx-auto">
                <Image
                  className="object-cover object-center mx-auto my-5 rounded-t-md"
                  src={items.cover}
                  fill
                  alt="buku"
                />
              </div>
              <div className=" p-4">
                <div className="grid grid-cols-2 place-items-center">
                  <h1 className=" font-semibold text-lg">{items.title}</h1>

                  <span
                    className={`mt-3 w-fit text-sm font-semibold p-1 rounded-md ${
                      !items.stock
                        ? "bg-red-600 text-slate-300"
                        : "bg-yellow-500 text-white"
                    }`}
                  >
                    Stock : {items.stock}
                  </span>
                </div>

                <p className=" mt-3 h-20 text-sm line-clamp-3">
                  {items.description}
                </p>
                <div className=" flex justify-center mt-4">
                  <Button
                    onClick={() => {
                      handleLoan(items);
                    }}
                    disable={!items.stock}
                    className={`text-white font-semibold w-[90%] ${
                      !items.stock ? "bg-slate-500" : "bg-blue-600"
                    }`}
                  >
                    {!items.stock ? "Kosong" : "Borrow"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
