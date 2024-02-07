"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

export function PopUp({ image }) {
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="h-11 w-11 rounded-full overflow-hidden relative mx-auto">
          <Image
            className="object-cover"
            src={image}
            alt="Alternatif Musuh"
            fill
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="flex flex-col gap-3">
          <Button className="flex justify-center items-center gap-3 bg-orange-500" onClick={() => router.push("profile")}>
          <FaRegUser />
            <span>Profile</span></Button>

          <Button className="flex justify-center items-center gap-3 bg-slate-500" onClick={() => signOut()}>
          <IoMdExit />
            <span>Keluar</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
