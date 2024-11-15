"use client";

import FlyingRobotScene from "../_components/FlyingRobotScene";
import MyWorksScene from "../_components/MyWorksScene";
import { motion, useAnimation } from "framer-motion";

import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";

import { SoftwareProjects } from "../utils/content";
import "./projects.css";

interface SoftwareProjectType {
  id: number;
  title: string;
  description: string;
  techSkills: string[];
  coverImg: string;
  company: string;
  dateCreated: string;
  shortDesc: string;
  github: string;
  livePreview: string;
  showcase: boolean;
}

export default function Projects() {
  const control = useAnimation();

  const [ref, inView] = useInView();
  const showcasedProjects = SoftwareProjects.filter(
    (project: SoftwareProjectType) => project.showcase
  );

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  const contentVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.2 } },
  };
  return (
    <div>
      <div className="relative z-30">
        <MyWorksScene />
        <div className="w-5/6 max-w-[1024px] mx-auto space-y-20">
          <motion.div
            ref={ref}
            variants={contentVariant}
            initial="hidden"
            animate={control}
          >
            <div className="my-20">
              <h2 className="font-semibold text-5xl text-center">
                Selected Works
              </h2>
              <p className="font-light text-md text-center">
                Here are some of my proudest moments
              </p>
            </div>

            <div className="flex justify-center gap-5">
              <section className="card flex-1 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
                <div className="card-image flex w-full justify-center items-center">
                  <img
                    src="https://images.ctfassets.net/3mqyxbmvovbz/SmI9pJhf2ZuTbhBdURmG7/b659a466b7c843930d95367260673960/Screenshot_2024-11-12_at_3.56.56_PM.png?h=250"
                    alt="My Explorer Showcase"
                    className="absolute img-one"
                  />
                  <img
                    src="https://images.ctfassets.net/3mqyxbmvovbz/7t0WqAGhaThkmJ9wMpBESP/167e81ffe5cb955f3752ee910f966130/Screenshot_2024-11-12_at_3.57.44_PM-portrait.png?h=250"
                    alt="My Explorer Showcase"
                    className="absolute img-two"
                  />
                </div>
                <div className="card-info">
                  <h3 className="font-semibold text-lg">
                    {showcasedProjects[0].title}
                  </h3>
                  <p>{showcasedProjects[0].shortDesc}</p>
                  <p className="font-extralight text-md">
                    {showcasedProjects[0].company}
                  </p>
                </div>
              </section>
              <section className="card flex-1 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
                <div className="card-image flex w-full justify-center items-center">
                  <img
                    src="https://images.ctfassets.net/3mqyxbmvovbz/4QMYzXehLCc31mJ45r32or/911b309ea622c45de5e62d69a5b6127e/Screenshot_2024-11-15_at_4.36.10_PM.png?h=250"
                    alt="IMCS Toolkit"
                    className="absolute img-one"
                    style={{ scale: 0.8 }}
                  />
                  <img
                    src="https://images.ctfassets.net/3mqyxbmvovbz/55mDGdEoyG69bVCZ28UDoD/597127429942ff0b3faec2a736e2350d/Screenshot_2024-11-15_at_4.35.55_PM-front.png?h=250"
                    alt="IMCS Toolkit"
                    className="absolute img-two"
                  />
                </div>
                <div className="card-info">
                  <h3 className="font-semibold text-lg">
                    {showcasedProjects[1].title}
                  </h3>
                  <p className="text-md">{showcasedProjects[1].shortDesc}</p>
                  <p className="font-extralight text-sm">
                    {showcasedProjects[1].company}
                  </p>
                </div>
              </section>
              <section className="card flex-1 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
                <div className="card-image flex w-full justify-center items-center">
                  <img
                    src="https://images.ctfassets.net/3mqyxbmvovbz/2UzqwNeunNdT63UjZs7HoM/73488fa933b10349214a76c02635a331/Group_3.png?h=250"
                    alt="INC DESIGN SYSTEM"
                    className="absolute single-image"
                  />
                </div>
                <div className="card-info">
                  <h3 className="font-semibold text-lg">
                    {showcasedProjects[2].title}
                  </h3>
                  <p>{showcasedProjects[2].shortDesc}</p>
                  <p className="font-extralight text-md">
                    {showcasedProjects[2].company}
                  </p>
                </div>
              </section>
            </div>
          </motion.div>

          <div className="flex">
            <div className="divider divider-primary w-full mr-5" />
            <h3 className="text-5xl text-center font-semibold whitespace-nowrap">
              All Works.
            </h3>
          </div>

          <div className="gallery grid grid-cols-2 md:grid-cols-3 gap-8">
            {SoftwareProjects.map((project) => (
              <div
                className="card allCard border-white w-full rounded-lg shadow-xl border-2 border-opacity-30 bg-white bg-opacity-10 bg-clip-padding backdrop-filter backdrop-blur-sm"
                key={project.id}
              >
                <figure className="h-48 w-full overflow-hidden">
                  <img
                    src={project.coverImg}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <div className="divider w-1/2 mx-auto my-0"></div>
                  <h2 className="card-title text-base">{project.title}</h2>
                  <p className="text-xs">{project.shortDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FlyingRobotScene />
    </div>
  );
}
