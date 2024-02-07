"use client";
import Loader from "@/components/costume/Navbar/Loader";
import { TablePinjaman } from "@/components/costume/Profile/TablePinjaman";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

const getTerpinjam = async () => {
  return (
    await axios(`https://657d1831853beeefdb9a4329.mockapi.io/api/v1/loan`)
  ).data;
};

export default function Page() {
  const session = useSession();

  const { data, isLoading } = useQuery({
    queryFn: getTerpinjam,
    queryKey: ["loan"],
  });

  const handleFile = (e) => {
    // if (e.target.files[0]) {
    //     const ext = e.target.files[0].name.split('.').pop()
    //     setExstention(ext)
    //     setPhotoFile(e.target.files[0])
    // }
  };

  const handleUploadProfilePhoto = () => {
    // uploadProfilePict(photoFile, user, setLoading, exstention)
  };

  return (
    <main className=" p-5 mt-20 bg-slate-50 min-w-[100vh]">
      <div className="profile grid grid-cols-2">
        {/* {user && <img src={photoURL} alt="Movie" />} */}
        <div className="h-44 w-44 rounded-full overflow-hidden relative mx-auto">
          <Image
            className="object-cover"
            src={session.data?.user?.user?.photoURL}
            alt="Alternatif Musuh"
            fill
          />
        </div>

        <div className="card-body flex flex-col items-end gap-8">
          <h2 className="card-title self-end">Wahyu</h2>
          {/* <h2 className="card-title self-end">{user.displayName}</h2> */}
          <p className="self-end">mwahyuap2018@gmail.com</p>
          {/* <p className="self-end">{user.email}</p> */}

          <div className="card-actions justify-end">
            <div className="join">
              <input
                onChange={(e) => handleFile(e)}
                type="file"
                className="justify-self-center join-item file-input file-input-bordered file-input-warning w-full max-w-xs"
              />
              <button
                // disabled={loading}
                onClick={() => handleUploadProfilePhoto()}
                className="btn btn-warning join-item"
              >
                upload file
              </button>
            </div>
          </div>
        </div>

        <h1 className="text-xl text-center justify-self-center col-span-2 row-start-2 p-2 bg-warning h-fit rounded-md">
          Buku yang dipinjam
        </h1>

        {isLoading ? <Loader /> : <TablePinjaman data={data} />}
      </div>
    </main>
  );
}
