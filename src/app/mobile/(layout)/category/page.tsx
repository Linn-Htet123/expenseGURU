"use client";

import WithSuspense from "@/components/common/withSuspense";
import Image from "next/image";
import Bg from "../../../../../public/home-bg.png";
import CategoryList from "@/components/mobile/category/categoryList";

const Category = () => (
  <div className="w-full h-full flex flex-col">
    <div className="relative w-full flex-1 z-10 flex flex-col items-center justify-start">
      <Image src={Bg} alt="background" className="w-screen" priority />
      <WithSuspense>
        <CategoryList />
      </WithSuspense>
    </div>
  </div>
);

export default Category;
