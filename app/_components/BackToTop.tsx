"use client";

import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className=" fixed bottom-24 right-12">
      <div className="tooltip" data-tip="Back to top">
        <button
          className="btn btn-outline btn-lg rounded-full aspect-square p-0 shadow-lg"
          onClick={scrollToTop}
        >
          <ChevronUp />
        </button>
      </div>
    </div>
  );
}
