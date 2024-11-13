import "../css/ShortShowcase.css";

import { shortPreviewContent } from "../../utils/content";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";

import { useInView } from "react-intersection-observer";

import { useEffect } from "react";

export default function ShortShowcase() {
  const [activeIndex, setActiveIndex] = useState<Number>(0);

  // Function to handle option click
  const handleOptionClick = (index: number) => {
    setActiveIndex(index); // Set the active index
  };

  const control = useAnimation();
  const [ref, inView] = useInView();

  const contentVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <div className="flex flex-col justify-center w-full my-10">
      <motion.div
        ref={ref}
        variants={contentVariant}
        initial="hidden"
        animate={control}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="py-10">
          <div className="grid grid-cols-3 ">
            <h2 className="col-start-2 font-medium text-3xl text-center pb-2">
              The learning never stops.
            </h2>
            <div className=" col-start-3 divider divider-primary"></div>
          </div>
          <p className="font-light text-md text-center">
            Here are some of my projects:
          </p>
        </div>

        <div className="flex items-center w-5/6 mx-auto">
          <div className="options w-full">
            {shortPreviewContent.map((content, index) => (
              <div
                className={`option ${activeIndex === index ? "active" : ""}`} // Add active class conditionally
                onClick={() => handleOptionClick(index)}
              >
                <div className="shadow"></div>
                <div className="label">
                  {/* <div className="icon">
              <i className="fas fa-walking"></i>
            </div> */}
                  <div className="info">
                    <div className="main">{content.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="tooltip" data-tip="View more">
            <button className="btn btn-outline rounded-full ">
              <ArrowRight />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
