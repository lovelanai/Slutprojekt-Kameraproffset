import { createContext, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface ErrorContextValue {
  handleOpen: () => void;
  setErrorTitle: (errorTitle: string) => void;
  setErrorMessage: (errorMessage: string) => void;
  setErrorModalTimeout: (errorModalTimeout: number) => void;
}

export const ErrorContext = createContext<ErrorContextValue | undefined>(
  undefined
);

function ErrorProvider(props: any) {
  const [open, setOpen] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModalTimeout, setErrorModalTimeout] = useState(2500);

  const handleOpen = () => {
    setOpen(true);
    if (errorModalTimeout > 0) {
      setTimeout(handleClose, errorModalTimeout);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <ErrorContext.Provider
      value={{
        handleOpen,
        setErrorTitle,
        setErrorMessage,
        setErrorModalTimeout,
      }}
    >
      {props.children}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-description"
      >
        <Box sx={style}>
          <Typography id="error-modal-title" variant="h6" component="h2">
            {errorTitle}
          </Typography>
          <Typography id="error-modal-description" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        </Box>
      </Modal>
    </ErrorContext.Provider>
  );
}

export default ErrorProvider;

export const useError = () => useContext(ErrorContext);
