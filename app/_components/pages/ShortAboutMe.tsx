import { useRef, useState } from "react";
import ScrollingDescriptor from "../ScrollingDescriptor";
import "../css/ShortAboutMe.css";

export default function ShortAboutMe() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Handle mouse move event with type annotation
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();

    // Calculate the position of the mouse relative to the center of the card
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    // Set rotation values based on cursor position
    const rotationX = (y / rect.height) * -15; // Adjust rotation intensity by changing multiplier
    const rotationY = (x / rect.width) * 15;

    // Apply transform
    card.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  };

  // Handle mouse leave event with type annotation
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    setIsHovered(false); // Set hover state to true
    // Reset transform to center position
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  const handleMouseEnter = () => {
    setIsHovered(true); // Set hover state to true
  };

  return (
    <div className="relative min-h-[60vh] w-full">
      <div
        ref={cardRef}
        className={`card-3d-effect w-3/4 m-auto cursor-pointer justify-center items-center left-0 right-0 top-0 bottom-0 flex gap-5 absolute z-10 bg-white rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-[0.5px] border-gray-100 my-5 ${
          isHovered ? "shimmer" : ""
        }`} // Add shimmer class on hover
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        <figure className="min-w-80 rounded-l-lg">
          <img
            src="https://images.ctfassets.net/3mqyxbmvovbz/5v9JjSpyzr9tVOeCPr1nNl/9df5a6215698f59d02fb6d13c4a36bf8/IMG_3724.JPG?h=250"
            alt="Allison"
            className=" w-full h-autorounded-l-lg"
          />
        </figure>
        <div className="space-y-3">
          <h2 className="text-3xl font-bold italic">Hey! I'm Allison!</h2>

          <p className="text-lg">
            I'm an aspiring web developer, and I have strong interests in the
            front-end. Be it playing around with 3D graphics, using Photoshop
            and Illustrator to create my ideal artwork, I am interested in all.
            I am currently pursuing a diploma in Information Technology in
            Singapore Polytechnic.
          </p>
        </div>
      </div>
      <ScrollingDescriptor />
    </div>
  );
}
