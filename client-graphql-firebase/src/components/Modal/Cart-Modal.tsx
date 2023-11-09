import { Link } from 'react-router-dom';

interface Props {
  closeModal: (value: boolean) => void;
}

export const Modal = ({ closeModal }: Props) => {
  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Purchase completed</p>
          <button
            onClick={() => closeModal(false)}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className="modal-card-body">
          Order has been sent. Our manager will contact You sortly.
        </section>
        <footer className="modal-card-foot">
          <Link to="/">
            <button className="button is-success">To Home Page</button>
          </Link>
        </footer>
      </div>
    </div>
  );
};
