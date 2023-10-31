import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/ReduxApp';

type Props = {
  children: React.ReactElement;
};

export const NotAuth: React.FC<Props> = ({ children }) => {
  const { userData } = useAppSelector((state) => state.user);

  if (!userData) {
    return <Navigate to="/auth" />;
  }

  return children;
};
