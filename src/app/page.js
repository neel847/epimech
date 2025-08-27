"use client";

import CompanyStats from "@/components/CompanyStats";
import Hero from "@/components/Hero";
import HomeAbout from "@/components/HomeAbout";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="overflow-hidden gap-y-10 ">
      <Hero />
      <HomeAbout />
      <CompanyStats />
    </div>
  );
}
