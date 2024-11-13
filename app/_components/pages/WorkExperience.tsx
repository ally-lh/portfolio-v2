// import "../css/WorkExperience.css";
import WorkScene from "../WorkScene";
import { motion, useAnimation } from "framer-motion";

import { useInView } from "react-intersection-observer";

import { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  date: string;
  position: string;
  description: string;
}

export default function WorkExperience() {
  const control = useAnimation();
  const expControl = useAnimation();
  const [ref, inView] = useInView();
  const [expRef, expInView] = useInView();

  const [progressHeight, setProgressHeight] = useState(0);
  const timelineRef = useRef<HTMLUListElement | null>(null);

  // IntersectionObserver to trigger animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const timelineElem = timelineRef.current;
      if (!timelineElem) return;

      // Calculate scroll progress and set it to progress bar
      const { top, bottom } = timelineElem.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (top < windowHeight && bottom > 0) {
        const progress = Math.min(
          100,
          ((windowHeight - top) / windowHeight) * 100
        );
        setProgressHeight(progress);
      }

      // Scroll through each timeline item
      const timelineItems =
        document.querySelectorAll<HTMLElement>(".timeline-item");
      timelineItems.forEach((item) => {
        if (item.getBoundingClientRect().top < windowHeight) {
          item.classList.add("in-view");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const timeline: TimelineEntry[] = [
    {
      date: "Sep 2024 - Current",
      position: "Creative Technologist Intern at Great Eastern",
      description:
        "Prototype and ideate projects that are beneficial to the company, create functional prototypes, and work with the team to develop the final product.",
    },
    {
      date: "Jan 2022 - Jun 2024",
      position: "Wordpress Developer",
      description:
        "Manage and maintain a Wordpress site using HTML/CSS, JS and PHP. I learnt how to work with themes, host servers, work with WooCommerce to facilitate transactions, and work with SEO tools. The site received at least an average of 20,000 global viewers monthly, and about 3,000 paying visitors.",
    },
    {
      date: "Jan 2022 - Jul 2023",
      position: "Deputy Head of Marketing / Projects Head at SGExams",
      description:
        "Facilitate and have overseen at least 14 projects, and have at least 20 members under my wing. Worked with teams from organisations such as MOH Holdings, Crimson Edu, Young NTUC, and more.",
    },
    {
      date: "Jul 2018 - Jul 2023",
      position: "Graphic Designer at SGExams",
      description:
        "Create aesthetic publicity materials for the organisation to be uploaded onto all social media platforms.",
    },
  ];

  // Animation variants
  const lineVariant = {
    hidden: { width: 0 },
    visible: { width: "70%", transition: { duration: 1, delay: 0.7 } },
  };

  const textVariant = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, delay: 0.8 } },
  };
  const contentVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 1 } },
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  useEffect(() => {
    if (expInView) {
      expControl.start("visible");
    } else {
      expControl.start("hidden");
    }
  }, [expControl, expInView]);

  return (
    <div className="flex flex-col gap-2 my-5 ">
      <div className="font-medium flex gap-3">
        {/* Animate the line */}
        <motion.div
          ref={ref}
          className="divider divider-primary"
          variants={lineVariant}
          initial="hidden"
          animate={control}
        ></motion.div>

        {/* Animate the header text */}
        <motion.div
          ref={ref}
          className="space-y-2"
          variants={textVariant}
          initial="hidden"
          animate={control}
        >
          <h2 className="text-3xl text-right">I learn on the go.</h2>
          <p className="text-md font-light text-right">
            I try my best in all, I'd say.
          </p>
        </motion.div>
      </div>
      <motion.div
        ref={expRef}
        variants={contentVariant}
        initial="hidden"
        animate={expControl}
      >
        <section className="timeline flex justify-center bg-transparent w-full mt-16">
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
            {timeline.map((entry, index) => {
              const [ref, inView] = useInView({
                threshold: 0.4, // Trigger when 10% of the element is in view
                // Only trigger once
                delay: 0.8,
              });

              return (
                <li key={index} ref={ref}>
                  {index === 0 ? <hr className="" /> : null}
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="timeline-middle"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className={`mb-10 ${
                      index % 2 === 0
                        ? "timeline-start md:text-end"
                        : "timeline-end md:text-start"
                    }`}
                  >
                    <time className="font-mono italic">{entry.date}</time>
                    <div className="text-lg font-black">{entry.position}</div>
                    {entry.description}
                  </motion.div>
                  <hr className="" />
                </li>
              );
            })}
          </ul>
        </section>
      </motion.div>
    </div>
  );
}
