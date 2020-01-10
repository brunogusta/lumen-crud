import React from "react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./config/reactotronConfig";

import GlobalStyle from "./styles/global";
import { Container } from "./styles/components";
import Routes from "./routes";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LogedUser from "./components/LogedUser";

import history from "./routes/history";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Container>
          <Navigation />
          <LogedUser />
          <Routes />
          <Footer />
        </Container>
        <GlobalStyle />
      </Router>
    </Provider>
  );
}

export default App;
