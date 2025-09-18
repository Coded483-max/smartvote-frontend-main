import "../styles/errors.css";

const FieldError = ({ error }) => {
  if (!error) {
    return null;
  }

  return <div className="field-error">{error}</div>;
};

export default FieldError;
