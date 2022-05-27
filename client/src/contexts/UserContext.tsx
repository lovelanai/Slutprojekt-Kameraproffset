import { createContext, FC, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  isAdmin: boolean;
}

export interface ContextValue {
  isLoggedIn: boolean;
  login: (email: string, password: string) => void;
  showSignUpForm: boolean;
  displaySignUpForm: () => void;
  hideSignUpForm: () => void;
  createUser: (email: string, password: string) => void;
  logout: () => void;
  user: User | undefined;
}

export const UserContext = createContext<ContextValue>({
  isLoggedIn: false,
  login: () => {},
  showSignUpForm: false,
  displaySignUpForm: () => {},
  hideSignUpForm: () => {},
  createUser: () => {},
  logout: () => {},
  user: undefined,
});

const ConfirmationProvider: FC = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [user, setUser] = useState<User | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/user/current', {
      credentials: 'include',
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          setUser(data);
          setIsLoggedIn(true);
        });
      }
    });
  }, []);

  // login as existing user
  const login = async (email: string, password: string) => {
    let result = await fetch('/api/user/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (result.ok) {
      setUser(await result.json());
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

  const logout = async () => {
    let result = await fetch('/api/user/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (window.confirm('Vill du logga ut?')) {
      if (result.ok) {
        navigate('/');
        alert('Du har loggat ut');
        setIsLoggedIn(false);
      }
    }
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
        logout,
        user,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default ConfirmationProvider;

export const useUser = () => useContext(UserContext);
