import Image from 'next/image'
import React from "react";
import WebPage from "@/app/web/page";
import Cover from "@/stories/assets/cover.png"

export default function Home () {
  return (
    <main className="h-screen flex flex-col items-center justify-between bg-rose-300 py-60">

      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
        src={Cover}
        alt="Editorielle Cover"
      />

      <WebPage/>
    </main>
  )
}
