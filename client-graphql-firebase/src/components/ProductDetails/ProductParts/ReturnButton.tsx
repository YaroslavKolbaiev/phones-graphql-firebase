import { useNavigate } from 'react-router-dom';
import { PiSkipBackBold } from 'react-icons/pi';
import { useProductsByType } from '../../../redux/reduxHelpers';

export const ReturnButton = () => {
  const navigate = useNavigate();
  const { setProductsByType } = useProductsByType();
  return (
    <button
      type="button"
      style={{ border: 'none' }}
      className="button p-0 mb-2"
      onClick={() => {
        setProductsByType([]);
        navigate(-1);
      }}
    >
      <span className="icon">
        <PiSkipBackBold />
      </span>
      <span className="has-text-grey-light ">Back</span>
    </button>
  );
};
