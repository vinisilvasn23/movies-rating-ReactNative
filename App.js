import React from "react";
import { UserProvider } from "./src/context/userContext";
import { MovieProvider } from "./src/context/movieContext";
import Routes from "./src/routes/routes";

const App = () => {
  return (
    <UserProvider>
      <MovieProvider>
          <Routes />
      </MovieProvider>
    </UserProvider>
  );
};

export default App;
