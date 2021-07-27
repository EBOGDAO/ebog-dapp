import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../stylesheets/Dapp.scss";

class Home extends Component {
  render() {
    return (
      <Container className="d-flex justify-content-center">
        <Row>
          <Col className="text-center my-5">
            <h1>Welcome</h1>
            <video
              className="mt-3 mb-5"
              style={{ border: "5px solid #000", height: "auto", width: "75%" }}
              src="/tutorial.mp4"
              controls
              playsInline
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
