"use client";

import dynamic from "next/dynamic";
import SpinningText from "./_components/SpinningText";
import ShortShowcase from "./_components/pages/ShortShowcase";
import WorkExperience from "./_components/pages/WorkExperience";
import "./_components/css/HeroContent.css";
import ShortAboutMe from "./_components/pages/ShortAboutMe";
import SkillScene from "./_components/SkillScene";

export default function Home() {
  const Scene = dynamic(() => import("./_components/Scene"), {
    ssr: false,
  });
  return (
    <>
      <div className="w-screen overflow-hidden">
        <div className="heroContent">
          <Scene />
          <div className="w-screen flex justify-center gap-5 relative -top-20 z-10">
            <button className="btn bg-primary text-foreground rounded-full border-2 border-primary hover:bg-transparent hover:text-foreground hover:border-2 hover:border-foreground">
              View My Projects
            </button>
            <button className="btn btn-outline rounded-full">Contact Me</button>
          </div>
        </div>

        <div
          className="max-w-screen-xl px-10 mx-auto flex flex-col gap-6"
          id="about"
        >
          <ShortShowcase />
          <div className="divider divider-primary"></div>
          <ShortAboutMe />
          {/* <SkillScene /> */}
          <WorkExperience />
        </div>
      </div>
    </>
  );
}
