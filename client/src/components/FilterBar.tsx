import { Navbar, Nav, Container } from 'react-bootstrap';
import { FilterContext } from '../contexts/FilterCategoriesContext';

export default function FilterBar() {
  const { all, sony, panasonic, canon, fujifilm } = FilterContext();

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
          <Nav.Link href="#alla" onClick={all}>
            Alla
          </Nav.Link>
          <Nav.Link href="#sony" onClick={sony}>
            Sony
          </Nav.Link>
          <Nav.Link href="#panasonic" onClick={panasonic}>
            Panasonic
          </Nav.Link>
          <Nav.Link href="#canon" onClick={canon}>
            Canon
          </Nav.Link>
          <Nav.Link href="#fujifilm" onClick={fujifilm}>
            Fujifilm
          </Nav.Link>
        </Nav>
        {/* </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}
