import React, {useState, useEffect} from 'react';
import AuthContext from '../contexts/AuthContext';
import AuthService from '../services/AuthService';
import {User} from 'firebase/auth';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase';

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);

  // Initialize and observe user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      setUser(firebaseUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Provide AuthService static methods directly
  const authService = {
    signIn: AuthService.signIn,
    signUp: AuthService.signUp,
    signOut: AuthService.signOut,
  };

  return (
    <AuthContext.Provider value={{user, authService}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
