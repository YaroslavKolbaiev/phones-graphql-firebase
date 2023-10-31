import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseAuthService } from '../../firebase/FirebaseAuthServer';
import {
  AuthInput,
  TermsAndConditions,
  AuthButtons,
  AuthChangeSignUp,
} from '../../components/Auth';
import {
  validateEmail,
  validatePassword,
  validateTermsAndConditions,
} from '../../helpers/authValidators';

export const AuthPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [errors, setErrors] = useState<any>();
  const [isAgree, setIsAgree] = useState(false);
  const navigate = useNavigate();

  const clearInputs = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setIsLoading(false);
    setIsAgree(false);
    setTimeout(() => {
      setErrors(null);
    }, 3000);
  };

  const onChangeSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  const authHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const validationErrors = {
      email: validateEmail(email),
      password: validatePassword(password, confirmPassword, isSignUp),
      termsAndConditions: validateTermsAndConditions(isAgree, isSignUp),
    };

    if (
      validationErrors.email ||
      validationErrors.password ||
      validationErrors.termsAndConditions
    ) {
      setErrors(validationErrors);

      clearInputs();

      return;
    }

    if (isSignUp) {
      try {
        await FirebaseAuthService.registerUser(email, password);
        navigate('/');
      } catch (error) {
        setErrors({ error: error.code.split('/')[1] });
      }
    } else {
      try {
        await FirebaseAuthService.loginUser(email, password);
        navigate('/');
      } catch (error) {
        setErrors({ error: error.code.split('/')[1] });
      }
    }

    clearInputs();
  };

  const loginWithGoogle = async () => {
    try {
      await FirebaseAuthService.logInWithGoogle();
      navigate('/');
    } catch (error) {
      setErrors({ error: error.code.split('/')[1] });
    }
  };

  return (
    <div className="hero is-medium">
      <div className="hero-body">
        <form
          style={{ maxWidth: '380px' }}
          className="container box p-5"
          action="submit"
          onSubmit={authHandler}
        >
          <h1 className="title">{isSignUp ? 'Sign-Up' : 'Sign-In'}</h1>
          <AuthInput inputName="email" inputValue={email} callBack={setEmail} />
          <AuthInput
            inputName="password"
            inputValue={password}
            callBack={setPassword}
          />
          {isSignUp && (
            <AuthInput
              inputName="confirm password"
              inputValue={confirmPassword}
              callBack={setConfirmPassword}
            />
          )}
          {isSignUp && <TermsAndConditions setIsAgree={setIsAgree} />}
          <AuthButtons
            isLoading={isLoading}
            clearInputs={clearInputs}
            loginWithGoogle={loginWithGoogle}
          />
          <AuthChangeSignUp
            isSignUp={isSignUp}
            onChangeSignUp={onChangeSignUp}
          />
          {errors &&
            Object.values(errors).map((error) => (
              <p className="has-text-danger">{`${error}`}</p>
            ))}
        </form>
      </div>
    </div>
  );
};
