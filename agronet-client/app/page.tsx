'use client'
import Link from "next/link";
import Lottie from "lottie-react";
import animationData from './public/lottie/Truck-animation.json';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#c9e4ca]">
      <main className="flex items-center flex-col justify-center bg-white/60 rounded-3xl shadow-lg p-8 w-[98vw] h-[95vh] mx-4">
        <h1 className="text-8xl text-[#3D454C] font-bold text-center">
          Bridging Farms and Markets.
        </h1>
        <p className="text-gray-500 mt-4 text-center">
          Break monopoly and find the right farm for your market
        </p>
        <div className="flex justify-center space-x-4 mt-8 text-xl">
          <Link href="/business" >
            <button className="px-4 py-2 bg-[#3D454C] text-white rounded transition duration-300 ease-in-out transform hover:bg-[#3B6064]">
              Join as Business
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="px-4 py-2 bg-[#87BBA2] text-white rounded transition duration-300 ease-in-out transform hover:bg-[#3B6064]">
              Surf Farms
            </button>
          </Link>
        </div>
        <div className="">
          <Lottie animationData={animationData} />
        </div>
      </main>
    </div>
  );
}
