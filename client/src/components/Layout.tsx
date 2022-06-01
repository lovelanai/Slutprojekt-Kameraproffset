import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";

function Layout() {
  return (
    <div style={{ position: "relative" }}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Layout;
