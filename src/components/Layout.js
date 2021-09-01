import React, { Suspense, lazy } from "react";
import { Header, Footer, Container } from "./";

const ModWrongNetwork = lazy(() => import("./Modal/ModWrongNetwork"));

function Layout({ children }) {
  return (
    <>
      <Suspense fallback={<span>Loading...</span>}>
        <ModWrongNetwork />
      </Suspense>
      <Header />
      {children}
      <Container children={<Footer />} className="mt-8 pb-16" />
    </>
  );
}

export default Layout;
