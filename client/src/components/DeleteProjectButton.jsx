import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../queries/DELETE_PROJECT";
import { GET_PROJECTS } from "../queries/GET_PROJECTS";
import { useMutation } from "@apollo/client";
import { useSnackbar } from "./hooks/useSnackbar";
import Snackbar from "./Snackbar";

export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();
  const { isActive, message, openSnackBar } = useSnackbar();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },

    refetchQueries: [{ query: GET_PROJECTS }],

    onCompleted: () => {
      navigate("/");
      openSnackBar("Deleted project successfully", "success");
    },
    onError: () => {
      openSnackBar("Something went wrong while deleting project", "error");
    },
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash className="icon" /> Delete Project
      </button>
      <Snackbar isActive={isActive} message={message} />
    </div>
  );
}
