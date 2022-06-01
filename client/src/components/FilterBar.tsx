import { Nav, Container } from 'react-bootstrap';
import { Button } from '@mui/material';
import { FilterContext } from '../contexts/FilterCategoriesContext';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import './css/FilterBar.css';
export default function FilterBar() {
  const {
    sony,
    panasonic,
    canon,
    fujifilm,
    leica,
    systemkamera,
    mellanformatskamera,
    kompaktkamera,
    hideFilter,
    resetfilter,
  } = FilterContext();

  return (
    <Container>
      <Nav
        variant="pills"
        style={{
          color: 'white',
          height: '100%',
          justifyContent: 'center',

          position: 'relative',
          flexDirection: 'column',
        }}
      >
        <Button
          onClick={hideFilter}
          style={{
            position: 'absolute',
            top: '4px',
            right: '-12px',
            color: 'white',
          }}
        >
          <CloseIcon />
        </Button>
        <div className="brand">
          <h3>Varumärke</h3>
          <hr />

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
        </div>
      </Nav>
      <Nav
        variant="pills"
        style={{
          color: 'white',
          height: '100%',
          justifyContent: 'center',

          position: 'relative',
          flexDirection: 'column',
        }}
      >
        <div className="cameratype">
          <h3>Kameratyp</h3>
          <hr />

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
        </div>
        <hr />
        <Nav.Item>
          <Nav.Link onClick={resetfilter}>
            Nollställ Filter <RestartAltIcon />
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}
