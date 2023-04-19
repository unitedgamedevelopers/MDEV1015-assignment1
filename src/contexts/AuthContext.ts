import {createContext} from 'react';
import AuthService from '../services/AuthService';
import {User} from 'firebase/auth';

interface IAuthContextValue {
  user: User | null;
  authService: {
    signIn: typeof AuthService.signIn;
    signUp: typeof AuthService.signUp;
    signOut: typeof AuthService.signOut;
  };
}

const defaultAuthContextValue: IAuthContextValue = {
  user: null,
  authService: {
    signIn: AuthService.signIn,
    signUp: AuthService.signUp,
    signOut: AuthService.signOut,
  },
};

const AuthContext = createContext<IAuthContextValue>(defaultAuthContextValue);

export default AuthContext;
