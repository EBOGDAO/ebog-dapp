import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { NetworkErrorMessage } from "./NetworkErrorMessage";

export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <div className="text-center">
          {networkError && (
            <NetworkErrorMessage
              message={networkError}
              dismiss={dismiss}
            />
          )}
        </div>
        <Col md={6} className="text-center">
          <p className="mb-4">Please connect to MetaMask</p>
          <Button
            className="py-2 px-4"
            variant="info"
            onClick={connectWallet}
          >
            Connect Wallet
          </Button><br/>
          <FontAwesomeIcon icon={faEthereum} className="ethereum-icon mt-4" />
        </Col>
      </Row>
    </Container>
  );
}
