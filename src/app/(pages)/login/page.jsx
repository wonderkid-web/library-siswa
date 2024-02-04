"use client";

import React from "react";
import Logo from "../../../../public/putranda.jpg";
import Image from "next/image";
import Link from "next/link";
// import videoBg from '../../../../assets/video.mp4'

// shadcn
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";

// icons
import { FcGoogle } from "react-icons/fc";

export default function page() {
  return (
    <div className=" border w-full px-20 py-3">
      {/* <video
        src={video}
        autoPlay
        muted
        loop
        className="h-full w-full object-cover"
      ></video> */}
      <form className=" w-2/6 border py-8 px-7 rounded-lg mx-auto bg-white">
        <Image src={Logo} width={120} height={120} className=" mx-auto" />
        <div className=" mt-4">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="masukan email kamu"
            className="px-4 py-5 text-sm "
          />
        </div>
        <div className=" mt-3">
          <Label>Email</Label>
          <Input
            type="text"
            placeholder="masukan email kamu"
            className="px-4 py-5 text-sm "
          />
        </div>
        <div className=" my-5">
          <Link href={""} className=" mt-7">
            Forgot Password
          </Link>
        </div>
        <div className=" mt-2">
          <Button className=" w-full bg-yellow-500 text-white mt-3 py-4">
            Sign Up
          </Button>
          <Button className=" w-full bg-yellow-500 text-white mt-3 py-4">
            Sign In
          </Button>
        </div>
        <div className=" mt-6">
          <Button className=" w-full mt-3 py-4 flex gap-3">
            <FcGoogle className=" text-lg" />
            Sign Up With gogle
          </Button>
        </div>
        <div className=" mt-2">
          <Button className=" w-full  text-white mt-3 py-4">
            Kunjungi Website Resmi SMK putranda binjai
          </Button>
        </div>
      </form>
    </div>
  );
}
