import React from "react";
import { UserProvider } from "./src/context/userContext";
import { MovieProvider } from "./src/context/movieContext";
import Routes from "./src/routes/routes";
import "./global.css";
import AppWrapper from "./src/components/appWrapper";

const App = () => {
  return (
    <UserProvider>
      <MovieProvider>
        <AppWrapper>
          <Routes />
        </AppWrapper>
      </MovieProvider>
    </UserProvider>
  );
};

export default App;
