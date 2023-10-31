type Props = {
  setIsAgree: (value: (prev: boolean) => boolean) => void;
};

export const TermsAndConditions: React.FC<Props> = ({ setIsAgree }) => {
  return (
    <div className="field">
      <div className="control">
        <label
          htmlFor="checkbox"
          className="is-flex"
          style={{ gap: '5px' }}
        >
          <input
            onChange={() => {
              setIsAgree((prev: boolean) => {
                return !prev;
              });
            }}
            type="checkbox"
          />
          <p>I agree to the</p>
          <a
            href="/img/terms and cond.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            terms and conditions
          </a>
        </label>
      </div>
    </div>
  );
};
