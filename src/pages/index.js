import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import DataDummy from "../data/dummy.json";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
    </>
  );
}
