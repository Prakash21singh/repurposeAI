"use client";
import CraftPost from "@/components/custom/CraftPost";
import Image from "next/image";
import React, { useState } from "react";

function Page() {
  const [prompt, setPrompt] = useState<string>("");
  const [image, setImage] = useState<File | null>();

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
