import Clients from "../components/Clients";
import React from "react";
import Projects from "../components/Projects";
import AddProjectModal from "../components/modals/AddProjectModal";

export default function Home() {
  return (
    <>
      <div className="d-flex  mb-4">
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
}
