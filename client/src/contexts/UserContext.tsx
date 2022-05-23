import { createContext, FC, useContext, useState } from 'react';

export interface ContextValue {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  showSignUpForm: boolean;
  snus: () => void;
  intesnus: () => void;
}

export const UserContext = createContext<ContextValue>({
  isLoggedIn: false,
  login: () => {},
  showSignUpForm: false,
  snus: () => {},
  intesnus: () => {},
});

const ConfirmationProvider: FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

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
    } else {
      setIsLoggedIn(false);
      console.log('Du är utloggad');
    }
  };

  const snus = () => {
    setShowSignUpForm(true);
    console.log('true');
  };
  const intesnus = () => {
    setShowSignUpForm(false);
    console.log('false');
  };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, login, showSignUpForm, snus, intesnus }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default ConfirmationProvider;

export const useUser = () => useContext(UserContext);
