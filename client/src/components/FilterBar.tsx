import { Nav, Container } from 'react-bootstrap';
import { FilterContext } from '../contexts/FilterCategoriesContext';
import './css/FilterBar.css';
export default function FilterBar() {
  const { all, sony, panasonic, canon, fujifilm, leica } = FilterContext();

  return (
    <Container style={{ background: '#f9f9f9' }}>
      <Nav
        variant="pills"
        defaultActiveKey="#alla"
        style={{
          background: '#f9f9f9',
          color: 'black',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          height: '4rem',
        }}
      >
        <Nav.Item>
          <Nav.Link href="#alla" onClick={all}>
            Alla
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#sony" onClick={sony}>
            Sony
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#panasonic" onClick={panasonic}>
            Panasonic
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#canon" onClick={canon}>
            Canon
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#fujifilm" onClick={fujifilm}>
            Fujifilm
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="#leica" onClick={leica}>
            Leica
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}
