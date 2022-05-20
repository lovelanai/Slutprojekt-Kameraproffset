import { createContext, FC, useContext, useEffect, useState } from 'react';

export interface ContextValue {
  isLoggedIn: boolean;
  login: () => void;
}

export const UserContext = createContext<ContextValue>({
  isLoggedIn: false,
  login: () => {},
});

const ConfirmationProvider: FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async () => {
    let result = await fetch('/api/user/login');
    if (result.ok) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      console.log('Du är utloggad');
    }
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, login }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default ConfirmationProvider;

export const useUser = () => useContext(UserContext);
