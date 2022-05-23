import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import { useUser } from '../contexts/UserContext';

export default function LoginPage() {
  const { showSignUpForm } = useUser();

  return (
    <div className="admin-top-container">
      {!showSignUpForm ? (
        <div>
          <LoginForm />
        </div>
      ) : (
        <div>
          {' '}
          <SignUpForm />{' '}
        </div>
      )}
    </div>
  );
}
