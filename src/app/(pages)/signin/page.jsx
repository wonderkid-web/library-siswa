"use client";

import React from "react";
// icons
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import ErrorToast from "@/components/costume/ErrorToast";
import { Toaster, toast } from "sonner";

export default function Page() {
  const handleSignin = () => {};

  const router = useRouter();

  const { handleSubmit, register } = useForm();

  const onLogin = async (form) => {
    const signin = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    if (!signin.ok) {
      toast(<ErrorToast />, {
        position: "top-center",
      });
    } else {
      router.push("/beranda");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 login">
      {/* <video src={require('public/video.mp4')} /> */}
      <Toaster />

      <div className="hero-content w-[500px]">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 relative right-[-400px]">
          <form onSubmit={handleSubmit(onLogin)}>
            <img
              src="https://1.bp.blogspot.com/-c_NVdtXuZBE/XwVjD_ISP4I/AAAAAAAA8KY/2f4se3fToMgCYYmVUfaH12IKD5JHb-tJwCNcBGAsYHQ/w680/26169651_1627943780659943_3897432158579037467_n.jpg"
              className="w-[120px] mt-5 rounded-full mx-auto"
              alt=""
            />

            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email"
                  className="input input-bordered input-accent w-full max-w-xs my-2"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="input input-bordered input-accent w-full max-w-xs"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control flex flex-col gap-4">
                <button
                  onClick={(e) => handleSignin(e)}
                  type="submit"
                  className="btn mt-2 btn-warning"
                >
                  Sign in.
                </button>
                {/* <button className="btn mt-2 btn-warning">
                  <Link href={"/signup"} className="btn btn-warning w-fit ">
                    Sign up?
                  </Link>
                </button> */}
                {/* <GoogleButton className="mt-2 mx-auto" onClick={handleSigninWithGoogle} /> */}
                <button className="text-center p-4 btn bg-yellow-500 hover:scale-110">
                  Kunjungi Website Profile Putra Anda
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
