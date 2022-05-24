import { createContext, FC, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export interface ContextValue {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  showSignUpForm: boolean;
  displaySignUpForm: () => void;
  hideSignUpForm: () => void;
  createUser: (email: string, password: string) => void;
}

export const UserContext = createContext<ContextValue>({
  isLoggedIn: false,
  login: () => {},
  showSignUpForm: false,
  displaySignUpForm: () => {},
  hideSignUpForm: () => {},
  createUser: () => {},
});

const ConfirmationProvider: FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const navigate = useNavigate();
  // login as existing user
  const login = async (email: string, password: string) => {
    let result = await fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (result.ok) {
      setIsLoggedIn(true);
      navigate('/');
    } else {
      alert('Fel användarnamn eller lösenord');
      setIsLoggedIn(false);
      console.log('Du är utloggad');
    }
  };

  // create new user and log in
  const createUser = async (email: string, password: string) => {
    let result = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (result.ok) {
      setIsLoggedIn(true);
      console.log('nu är du inloggad');
    } else {
      setIsLoggedIn(false);
      console.log('Du är utloggad');
    }
  };

  const displaySignUpForm = () => {
    setShowSignUpForm(true);
  };
  const hideSignUpForm = () => {
    setShowSignUpForm(false);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        login,
        showSignUpForm,
        displaySignUpForm,
        hideSignUpForm,
        createUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default ConfirmationProvider;

export const useUser = () => useContext(UserContext);
