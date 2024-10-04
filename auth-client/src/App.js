import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AccountPage from "./pages/Account";
import Horses from "./pages/Horses/Horses";
import SavedHorses from "./pages/SavedHorses/SavedHorses";
import Godolphin from "./pages/Dolphin/Dolphin";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context"; // Correct import

const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" activeclassname="active" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="/register"
              activeclassname="active"
              element={<RegisterPage />}
            />
            <Route
              path="/login"
              activeclassname="active"
              element={<LoginPage />}
            />
            <Route
              path="/account"
              activeclassname="active"
              element={<AccountPage />}
            />
            <Route
              path="/godolphin"
              activeclassname="active"
              element={<Godolphin />}
            />
            <Route
              path="/horses"
              activeclassname="active"
              element={<Horses />}
            />
            <Route
              path="/savedhorses"
              activeclassname="active"
              element={<SavedHorses />}
            />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
