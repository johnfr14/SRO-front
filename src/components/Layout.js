import { Header, Footer, Container } from "./";
import { ModWrongNetwork } from "./Modal/";

function Layout({ children }) {
  return (
    <>
      <ModWrongNetwork />
      <Header />
      {children}
      <Container children={<Footer />} className="mt-8 pb-16" />
    </>
  );
}

export default Layout;
