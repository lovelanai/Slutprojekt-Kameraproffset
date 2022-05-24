import { Navbar, Nav, Container } from 'react-bootstrap';

export default function FilterBar() {
  return (
    <Navbar
      style={{ background: '#f9f9f9', color: 'black' }}
      collapseOnSelect
      expand="lg"
    >
      <Container>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"> */}
        <Nav className="me-auto">
          <Nav.Link href="#alla">Alla</Nav.Link>
          <Nav.Link href="#sony">Sony</Nav.Link>
          <Nav.Link href="#panasonic">Panasonic</Nav.Link>
          <Nav.Link href="#canon">Canon</Nav.Link>
          <Nav.Link href="#fujifilm">Fujifilm</Nav.Link>
        </Nav>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}
