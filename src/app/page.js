'use client';

import CompanyStats from "@/components/CompanyStats";
import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";

export default function Home() {
 

  return (
    <div className="overflow-hidden gap-y-10 ">
      <Hero />
      <HomeAbout />
      <CompanyStats />
    </div>
  );
}

