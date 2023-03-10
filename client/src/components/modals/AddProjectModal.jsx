import React, { useContext } from "react";
import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../../queries/ADD_PROJECT";
import { GET_PROJECTS } from "../../queries/GET_PROJECTS";

import { useSnackbar } from "../../hooks/useSnackbar";
import Snackbar from "../Snackbar";
import authContext from "../../context/authContext";

export default function AddProjectModal() {
  const { authData } = useContext(authContext);
  const clientId = authData.id;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const { isActive, message, openSnackBar } = useSnackbar();
  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
    onCompleted: () => {
      openSnackBar("Added new project successfully", "success");
    },
    onError: () => {
      openSnackBar("Something went wrong while adding project", "error");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "") {
      return alert("Please fill in all fields");
    }

    addProject(name, description, clientId, status);

    setName("");
    setDescription("");
    setStatus("new");
  };

  return (
    <>
      <>
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addProjectModal"
        >
          <div className="d-flex align-items-center">
            <FaList className="icon" />
            <div>New Project</div>
          </div>
        </button>
        <div
          className="modal fade"
          id="addProjectModal"
          aria-labelledby="addProjectModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addProjectModalLabel">
                  New Project
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      id="status"
                      className="form-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="new">Not Started</option>
                      <option value="progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Snackbar isActive={isActive} message={message} />
      </>
    </>
  );
}
