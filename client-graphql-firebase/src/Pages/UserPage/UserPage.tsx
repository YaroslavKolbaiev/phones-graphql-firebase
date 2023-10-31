import { useNavigate } from 'react-router-dom';
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
        style={{ marginTop: '-100px' }}
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
          <p className="has-text-black">{userData?.displayName}</p>
        </div>
      </div>
      <div className="is-flex is-justify-content-center p-4 is-flex-grow-1">
        <button onClick={onLogOut} type="button" className="button is-dark">
          Log Out
        </button>
      </div>
    </>
  );
};
