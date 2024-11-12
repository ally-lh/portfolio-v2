import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar w-screen flex justify-between p-6">
      <div className="navbar-brand">
        <Link href="/">Allison</Link>
      </div>
      <ul className="navbar-menu flex gap-4">
        <li className="navbar-item">
          <Link href="/about">About</Link>
        </li>
        <li className="navbar-item">
          <Link href="/projects">Software Projects</Link>
        </li>
        <li className="navbar-item">
          <Link href="/projects">Graphic Design</Link>
        </li>
        <li className="navbar-item">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
