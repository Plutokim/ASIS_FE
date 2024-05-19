import { setup, styled } from "goober";
import { prefix } from "goober/prefixer";
import type { AppProps } from "next/app";
import React from "react";
import { shouldForwardProp } from "goober/should-forward-prop";

setup(
  React.createElement,
  prefix,
  undefined,
  shouldForwardProp((prop) => prop["0"] !== "$")
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Styled>
        <Component {...pageProps} />
      </Styled>
    </>
  );
}

const Styled = styled("div")`
  width: 100%;
`;
