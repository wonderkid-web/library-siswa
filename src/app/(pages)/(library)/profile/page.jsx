"use client";

import Loader from "@/components/costume/Navbar/Loader";
import { TablePinjaman } from "@/components/costume/Profile/TablePinjaman";
import app, { storage } from "@/lib/firebase";
import { useProfilePicture } from "@/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import uuid from "react-uuid";
import { Toaster, toast } from "sonner";

const getTerpinjam = async () => {
  return (
    await axios(`https://657d1831853beeefdb9a4329.mockapi.io/api/v1/loan`)
  ).data;
};

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [photoFile, setPhotoFile] = useState("");
  const session = useSession();
  const auth = getAuth(app);

  const { updateProfile, profile } = useProfilePicture();

  const { data, isLoading } = useQuery({
    queryFn: getTerpinjam,
    queryKey: ["loann"],
    select: (data)=>{
      return data.filter(d=>d.email == session.data.user.user.email)
    }
  });

  const handleFile = (e) => {
    if (e.target.files[0]) {
      const ext = e.target.files[0].name.split(".").pop();
      // setExstention(ext)
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleUploadProfilePhoto = async () => {
    setLoading(true)
    try {
      const imageRef = ref(storage, `/profile/${uuid()}-${photoFile.name}`);
      const upload = await uploadBytes(imageRef, photoFile);
      const photoURL = await getDownloadURL(upload.ref);

      await updateProfile(auth.currentUser, { photoURL });
      await session.update(photoURL);
      updateProfile(photoURL)

      toast.success("berhasil update foto");
    } catch (error) {
      toast.error("gagal update foto");
    }
    setLoading(false)
  };

  return (
    <main className=" p-5 mt-20 bg-slate-50 min-w-[100vh]">
      <Toaster />
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
          <h2 className="card-title self-end">{session.data?.user?.user?.email}</h2>
          {/* <h2 className="card-title self-end">{user.displayName}</h2> */}
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
                className="btn btn-warning join-item flex items-center"
                disabled={loading}
              >
                {loading ? 'Mengupload...' : 'Upload Foto'}
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
