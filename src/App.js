import React from "react";
import "./App.css";
import MyStatusForm from "./components/MyStatusForm";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div>
      <Container>
        <MyStatusForm />
      </Container>
    </div>
  );
}

export default App;
