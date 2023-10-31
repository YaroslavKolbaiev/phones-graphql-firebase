import { FcGoogle } from 'react-icons/fc';

type Props = {
  isLoading: boolean;
  clearInputs: () => void;
  loginWithGoogle: () => void;
};

export const AuthButtons: React.FC<Props> = ({
  isLoading,
  clearInputs,
  loginWithGoogle,
}) => {
  return (
    <>
      <div style={{ gap: '10px' }} className="field is-flex">
        <div className="control is-flex-grow-1">
          <button type="submit" className="button is-link is-fullwidth">
            {isLoading ? (
              <img
                style={{ height: '42px' }}
                src="/img/spinner.svg"
                alt="spinner"
              />
            ) : (
              'Submit'
            )}
          </button>
        </div>
        <div className="control">
          <button
            type="button"
            className="button is-link is-light"
            onClick={clearInputs}
          >
            Cancel
          </button>
        </div>
      </div>
      <button
        onClick={loginWithGoogle}
        type="button"
        className="button is-flex is-primary is-fullwidth mb-3"
        style={{ gap: '5px' }}
      >
        <span>Google</span>
        <FcGoogle />
      </button>
    </>
  );
};
