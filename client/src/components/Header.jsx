import React from "react";
import { GiBurningBook } from "react-icons/gi";
export default function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <span>
              <GiBurningBook />
            </span>
            <div className="ml-2">Project Mgmt</div>
          </div>
        </a>
      </div>
    </nav>
  );
}
