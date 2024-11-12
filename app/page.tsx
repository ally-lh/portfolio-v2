"use client";

import ScrollingDescriptor from "./_components/ScrollingDescriptor";
import dynamic from "next/dynamic";
import SpinningText from "./_components/SpinningText";
import ShortShowcase from "./_components/pages/ShortShowcase";
import WorkExperience from "./_components/pages/WorkExperience";

export default function Home() {
  const Scene = dynamic(() => import("./_components/Scene"), {
    ssr: false,
  });
  return (
    <>
      <div className="w-screen overflow-hidden">
        <Scene />
        <div className="w-screen flex justify-center gap-5 relative -top-20 z-10">
          <button className="btn bg-foreground text-primary rounded-full border-2 border-foreground hover:bg-transparent hover:text-foreground hover:border-2 hover:border-foreground">
            View My Projects
          </button>
          <button className="btn btn-outline rounded-full">Contact Me</button>
        </div>

        <div className="max-w-screen-xl px-10 mx-auto">
          <ShortShowcase />
          <WorkExperience />
          <div className="flex">
            <figure className="min-w-80">
              <img
                src="https://images.ctfassets.net/3mqyxbmvovbz/5v9JjSpyzr9tVOeCPr1nNl/9df5a6215698f59d02fb6d13c4a36bf8/IMG_3724.JPG?h=250"
                alt="Allison"
                className=" w-full h-full  "
              />
            </figure>
            <div className="">
              <h2 className="">Hey! I'm Allison!</h2>

              <p className="">
                I'm an aspiring web developer, and I have strong interests in
                the front-end. Be it playing around with 3D graphics, using
                Photoshop and Illustrator to create my ideal artwork, I am
                interested in all. I am currently pursuing a diploma in
                Information Technology in Singapore Polytechnic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
