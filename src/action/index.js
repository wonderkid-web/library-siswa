"use server";

import { options } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { add } from 'date-fns';
import { getServerSession } from "next-auth";


export const createLoan = async (data) => {
  const session = await getServerSession(options)
  const nama_peminjam = session.user.user.displayName
  
  const newStock = { ...data, stock: (data.stock -= 1) };
  try {
    await axios.put(
      `https://65b0c1b7d16d31d11bdd2e7a.mockapi.io/book/${data.id}`,
      newStock,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const borrowAt = new Date();
    const returnAt = add(borrowAt, { days: 3 });

    const newLoan = {
      ...data,
      nama_peminjam,
      borrowAt,
      returnAt,
      status: "dipinjam"
    };

    await axios.post(
      "https://657d1831853beeefdb9a4329.mockapi.io/api/v1/loan",
      newLoan,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
