import { createContext, FC, useContext, useEffect, useState } from 'react';

export interface ContextValue {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
}

export const UserContext = createContext<ContextValue>({
  isLoggedIn: false,
  login: () => {},
});

const ConfirmationProvider: FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <UserContext.Provider value={{ isLoggedIn, login }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default ConfirmationProvider;

export const useUser = () => useContext(UserContext);
