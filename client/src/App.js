import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
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
import { useCookies } from "react-cookie";

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

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

function App() {
  const auth = useAuth();

  const [cookie] = useCookies();

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = cookie.token;
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  /* Creating a new ApolloClient instance. */
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });

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
