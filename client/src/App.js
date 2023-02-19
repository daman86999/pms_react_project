import React, { useEffect } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./views/Home";
import Project from "./views/Project";
import NotFound from "./views/NotFound";
import AuthContext from "./context/authContext";
import Login from "./views/Login";
import Signup from "./views/Signup";
import { useAuth } from "./hooks/useAuth";

/* A way to merge the data from the cache with the data from the server. */
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        projects: {
          merge(_existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

/* Creating a new ApolloClient instance. */
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  const auth = useAuth();
  useEffect(() => {
    console.log({ auth });
  }, [auth]);

  return (
    <>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={auth}>
          <Router>
            <Header />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:id" element={<Project />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </AuthContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default App;
