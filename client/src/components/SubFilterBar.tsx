import { Nav, Container } from "react-bootstrap";
import { FilterContext } from "../contexts/FilterCategoriesContext";
import "./css/FilterBar.css";
export default function SubFilterBar() {
  const { systemkamera, kompaktkamera, mellanformatskamera, all } =
    FilterContext();

  return (
    <Container style={{ background: "#f9f9f9" }}>
      <Nav
        variant="pills"
        style={{
          background: "#f9f9f9",
          color: "black",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "4rem",
        }}
      >
        <Nav.Item>
          <Nav.Link href="#systemkamera" onClick={systemkamera}>
            Systemkamera
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#kompaktkamera" onClick={kompaktkamera}>
            Kompaktkamera
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#mellanformatskamera" onClick={mellanformatskamera}>
            Mellanformatskamera
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#alla" onClick={all}>
            Nollställ Filter
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}
