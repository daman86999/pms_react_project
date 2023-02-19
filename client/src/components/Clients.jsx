import React, { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Spinner from "./Spinner";
import { GET_CLIENT } from "../queries/GET_CLIENT";
import { DELETE_CLIENT } from "../queries/DELETE_CLIENT";
import { FaTrash } from "react-icons/fa";
import { GET_PROJECTS } from "../queries/GET_PROJECTS";
import authContext from "../context/authContext";

export default function Clients() {
  const { authData } = useContext(authContext);
  const clientId = authData.id;
  console.log({ authData });
  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: { id: clientId },
  });
  const [deleteClient] = useMutation(DELETE_CLIENT);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong</p>;

  const handleDelete = (client) => {
    deleteClient({
      variables: { id: client.id },
      refetchQueries: [{ query: GET_CLIENT }, { query: GET_PROJECTS }],
    });
  };

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(client)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
