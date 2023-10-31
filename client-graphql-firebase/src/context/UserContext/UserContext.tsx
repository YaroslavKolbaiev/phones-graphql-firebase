import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { User } from 'firebase/auth';
import { FirebaseAuthService } from '../../firebase/FirebaseAuthServer';

type PropsUser = {
  user: User | null;
};

export const UserContext = React.createContext<PropsUser>({
  user: null,
});

type Props = {
  children: React.ReactNode;
};

export function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    FirebaseAuthService.subscribeToAuthChanges(setUser);
  }, []);

  const contextValue = useMemo(() => ({
    user,
  }), [user]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}
