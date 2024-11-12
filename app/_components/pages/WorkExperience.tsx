import { useEffect } from "react";
import "../css/WorkExperience.css";
import WorkScene from "../WorkScene";

export default function WorkExperience() {
  useEffect(() => {
    // Define the function to check if an element is in the viewport
    function isElementInViewport(el: HTMLElement): boolean {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    // Add the "in-view" class to elements in the viewport
    function callbackFunc() {
      const items = document.querySelectorAll<HTMLElement>(".timeline li");
      items.forEach((item) => {
        if (isElementInViewport(item)) {
          item.classList.add("in-view");
        }
      });
    }

    // Listen for events to trigger the viewport check
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("load", callbackFunc);
      window.removeEventListener("resize", callbackFunc);
      window.removeEventListener("scroll", callbackFunc);
    };
  }, []);
  return (
    <div className="flex flex-col gap-2 my-5 ">
      <section className="timeline flex justify-center bg-transparent w-full mt-16">
        <ul>
          <li>
            <div>
              <time>Jul 2018 - Jul 2023 </time>
              <p className="font-light ">Graphic Designer at SGExams</p> <br />
              Create aesthetic publicity materials for the organisation to be
              uploaded onto all social media platforms
            </div>
          </li>
          <li>
            <div>
              <time>Jan 2022 - Jul 2023 </time>{" "}
              <p className="font-light ">
                Deputy Head of Marketing / Projects Head
              </p>{" "}
              <br />
              Facilitate and have overseen at least 14 projects, and have at
              least 20 members under my wing. Worked with teams from
              organisations such as MOH Holdings, Crimson Edu, Young NTUC, and
              more.
            </div>
          </li>
          <li>
            <div>
              <time>Jan 2022 - Jun 2024</time>{" "}
              <p className="font-light ">Wordpress Developer</p>
              <br /> Manage and maintain a Wordpress site using HTML/CSS, JS and
              PHP. I learnt how to work with themses, host servers, work with
              WooCommerce to facilitate transactions, and work with SEO tools.
              The site received at least an average of 20,000 global viewers
              monthly, and about 3,000 paying visitors.
            </div>
          </li>
          <li>
            <div>
              <time>Sep 2024 - Current</time>{" "}
              <p className="font-light ">
                Creative Technologist Intern at Great Eastern
              </p>
              <br /> Prototype and ideate projects that are beneficial to the
              company, create functional prototypes, and work with the team to
              develop the final product.
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
