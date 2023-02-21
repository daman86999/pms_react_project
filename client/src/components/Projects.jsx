import React, { useContext } from "react";
import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/GET_PROJECTS";
import authContext from "../context/authContext";

export default function Projects() {
  const { authData } = useContext(authContext);
  const clientId = authData.id;
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { clientId: clientId },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="row mt-4">
          {data.projects.map((project) => (
            <div key={project.id} className="col-md-6">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title">{project.name}</h5>

                    <a
                      className="btn btn-light"
                      href={`/projects/${project.id}`}
                    >
                      View
                    </a>
                  </div>
                  <p className="small">
                    Status: <strong>{project.status}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
