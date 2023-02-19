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
import ProtectedRoute from "./components/ProtectedRoute";

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
  return (
    <>
      <ApolloProvider client={client}>
        <AuthContext.Provider value={auth}>
          <Router>
            <Header />
            <div className="container">
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute isPrivate>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/projects/:id"
                  element={
                    <ProtectedRoute isPrivate>
                      <Project />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <ProtectedRoute>
                      <Login />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <ProtectedRoute>
                      <Signup />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <ProtectedRoute isPrivate>
                      <NotFound />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </AuthContext.Provider>
      </ApolloProvider>
    </>
  );
}

export default App;
