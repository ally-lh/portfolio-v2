import { Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <div className="w-full flex justify-center items-center px-5">
      <footer className="py-8 grid grid-cols-3 w-full">
        <div className="col-start-2 ">
          <p className="text-sm text-gray-500 text-center">
            © 2024 Allison Loo. All rights reserved.
          </p>
        </div>
        <div className="col-start-3  ">
          <ul className="flex justify-end gap-2">
            <li className="hover:opacity-100 opacity-50 transition-opacity ">
              <Linkedin />
            </li>
            <li className="hover:opacity-100 opacity-50 transition-opacity ">
              <Github />
            </li>
            <li className="hover:opacity-100 opacity-50 transition-opacity ">
              <Mail />
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
