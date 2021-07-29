import { Header, Footer, Container } from "./index";

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Container children={<Footer />} className="mt-8 pb-16" />
    </>
  );
}

export default Layout;
