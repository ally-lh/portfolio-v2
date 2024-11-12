export default function ScrollingDescriptor() {
  return (
    <div className="absolute inset-0 flex items-center -rotate-2 select-none z-1 ">
      <div className="relative">
        <div className="bg-white/0  animate-horizontal-scroll flex items-center gap-8 w-max px-8">
          <h1 className="shrink-0 text-white text-10xl font-black ">Allison</h1>
          <h2 className="shrink-0 text-white text-8xl italic font-light">
            Achiever
          </h2>
          <h2 className="shrink-0 text-white text-12xl font-bold">Developer</h2>
          <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
            Student
          </h2>
          <h2 className="shrink-0 text-white text-9xl font-medium">Artist</h2>
          <h2 className="shrink-0 text-white text-9xl font-extralight italic">
            Engineer
          </h2>
          <h2 className="shrink-0 text-white text-13xl font-bold">Designer</h2>
          <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
            Ideator
          </h2>
        </div>
        <div className="absolute top-0 left-0 bg-white/0 animate-horizontal-scroll-2 flex items-center gap-8 px-8 w-max">
          <h1 className="shrink-0 text-white text-10xl font-black ">Allison</h1>
          <h2 className="shrink-0 text-white text-8xl italic font-light">
            Achiever
          </h2>
          <h2 className="shrink-0 text-white text-12xl font-bold">Developer</h2>
          <h2 className="shrink-0 text-transparent text-12xl font-bold italic outline-text">
            Student
          </h2>
          <h2 className="shrink-0 text-white text-9xl font-medium">Artist</h2>
          <h2 className="shrink-0 text-white text-9xl font-extralight italic">
            Engineer
          </h2>
          <h2 className="shrink-0 text-white text-13xl font-bold">Designer</h2>
          <h2 className="shrink-0 text-transparent text-13xl font-bold outline-text italic">
            Ideator
          </h2>
        </div>
      </div>
    </div>
  );
}
