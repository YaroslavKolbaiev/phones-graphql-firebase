type Props = {
  inputName: string;
  inputValue: string;
  callBack: (value: string) => void
};

export const AuthInput: React.FC<Props> = ({
  inputName,
  inputValue,
  callBack,
}) => {
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    callBack(e.target.value);
  };

  const placeHolderValue = () => {
    if (inputName === 'email') {
      return 'exapmle@example.com';
    }

    return '******';
  };

  const inputTypeValue = () => {
    if (inputName === 'email') {
      return 'email';
    }

    return 'password';
  };

  return (
    <div className="field">
      <label htmlFor={inputName} className="label">
        {inputName[0].toUpperCase() + inputName.slice(1)}
      </label>
      <div className="control has-icons-left has-icons-right">
        <input
          className="input"
          type={inputTypeValue()}
          placeholder={placeHolderValue()}
          value={inputValue}
          onChange={onChangeValue}
        />
        {inputName === 'email' ? (
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        ) : (
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
        )}
      </div>
    </div>
  );
};
