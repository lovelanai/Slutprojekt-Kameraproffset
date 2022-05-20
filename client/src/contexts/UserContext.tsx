import { createContext, FC, useContext, useEffect, useState } from "react";

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
    setIsLoggedIn(true);
  };

  // useEffect(() => {
  //   fetch("http://localhost:4000/api/user")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, [login]);

  return (
    <UserContext.Provider value={{ isLoggedIn, login }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default ConfirmationProvider;

export const useUser = () => useContext(UserContext);
