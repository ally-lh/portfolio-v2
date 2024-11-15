import FlyingRobotScene from "../_components/FlyingRobotScene";
import MyWorksScene from "../_components/MyWorksScene";
import { SoftwareProjects } from "../utils/content";
import "./projects.css";

interface SoftwareProjectType {
  id: number;
  title: string;
  description: string;
  techSkills: string[];
  company: string;
  dateCreated: string;
  shortDesc: string;
  github: string;
  livePreview: string;
  showcase: boolean;
}

export default function Projects() {
  const showcasedProjects = SoftwareProjects.filter(
    (project: SoftwareProjectType) => project.showcase
  );
  return (
    <div>
      <div className="relative z-30">
        <MyWorksScene />
        <div className="w-5/6 max-w-[1024px] mx-auto space-y-8">
          <div className="">
            <h2 className="font-medium text-3xl text-center">Selected Works</h2>
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
        </div>
      </div>
      <FlyingRobotScene />
    </div>
  );
}
