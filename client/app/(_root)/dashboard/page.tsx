"use client";
import CraftPost from "@/components/custom/CraftPost";
import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";

function Page() {
  async function getMe() {
    const result = await axios.get("http://localhost:3000/api/me");
    console.log(result.data);
  }
  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="w-full relative h-screen overflow-hidden flex flex-col  items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={"/logo.svg"}
          alt="Logo"
          width={100}
          height={100}
          className="w-28"
        />
        <h1 className="text-5xl font-semibold text-center md:hidden">
          Generate your
          <p className="group relative uppercase italic">
            <span className="absolute w-full h-full left-0 skew-y-6 bg-purple-700/20  " />
            <span className="absolute w-full h-full left-0 -skew-y-6 bg-violet-600/10  " />
            multi platform
          </p>
          content in <b className="text-violet-500">Seconds</b>
        </h1>
      </div>
      <CraftPost />
    </div>
  );
}

export default Page;
