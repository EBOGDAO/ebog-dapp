import React from "react";

export function NoWalletDetected() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 mt-5 p-4 text-center">
          <p>
            No Ethereum wallet was detected. <br />
            Please install{" "}
            <a
              href="http://metamask.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              MetaMask
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
