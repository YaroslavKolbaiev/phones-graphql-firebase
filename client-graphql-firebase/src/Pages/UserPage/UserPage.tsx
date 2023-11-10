import { Link, useNavigate } from 'react-router-dom';
import { FirebaseAuthService } from '../../firebase/FirebaseAuthServer';
import { useAppSelector } from '../../hooks/ReduxApp';

export const UserPage: React.FC = () => {
  const { userData } = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const onLogOut = () => {
    FirebaseAuthService.logOutUser();

    return navigate('/');
  };

  return (
    <>
      <section className="hero is-medium is-dark is-bold">
        <div className="hero-body">
          <h1 className="title is-4">{userData?.email}</h1>
        </div>
      </section>
      <div
        style={{ marginTop: '-30px' }}
        className="is-flex is-justify-content-center"
      >
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            border: '4px solid gray',
          }}
          className="has-background-danger-light
            is-flex
            is-justify-content-center
            is-align-items-center
          "
        >
          <p className="has-text-black is-size-6">
            {userData?.displayName || userData?.email.split('@')[0]}
          </p>
        </div>
      </div>
      <div className="is-flex is-justify-content-center p-4">
        <button onClick={onLogOut} type="button" className="button is-dark">
          Log Out
        </button>
      </div>
      <div
        style={{ gap: '20px' }}
        className="is-flex is-flex-direction-column is-flex-grow-1 p-6 mt-6"
      >
        <Link className="is-size-3" to="/cart">
          My Cart
        </Link>
        <Link className="is-size-3" to="/favorites">
          My Favorites
        </Link>
      </div>
    </>
  );
};
