export default function SpinningText() {
  return (
    <div className="absolute z-10 top-0 left-0">
      <svg id="rotatingText" viewBox="0 0 200 200" width="200" height="200">
        <defs>
          <path
            id="circle"
            d="M 100, 100
            m -75, 0
            a 75, 75 0 1, 0 150, 0
            a 75, 75 0 1, 0 -150, 0
            "
          ></path>
        </defs>
        <text width="400">
          <textPath
            alignment-baseline="top"
            xlinkHref="#circle"
            className="text text-white"
          >
            Allison Designer Student Developer Artist Engineer Ideator Achiever
          </textPath>
        </text>
      </svg>
    </div>
  );
}
