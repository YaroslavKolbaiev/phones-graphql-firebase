type Props = {
  isSignUp: boolean,
  onChangeSignUp: () => void
};

export const AuthChangeSignUp: React.FC<Props> = ({
  isSignUp,
  onChangeSignUp,
}) => {
  return (
    <p>
      {isSignUp ? 'Already have an account ?' : 'Dont have an account ?'}
      {' '}
      <button
        className="p-0 has-text-link is-clickable"
        style={{ background: 'none', border: 'none' }}
        type="button"
        onClick={onChangeSignUp}
      >
        {isSignUp ? 'Sign-In' : 'Sign-Up'}
      </button>
    </p>
  );
};
