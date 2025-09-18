const Errors = ({ errors }) => {
  if (!errors || (Array.isArray(errors) && errors.length === 0)) {
    return null;
  }

  const errorItems = Array.isArray(errors) ? (
    errors.map((error, index) => (
      <span key={index} className="block text-red-700 text-sm leading-6 my-1">
        {error}
      </span>
    ))
  ) : (
    <span className="block text-red-700 text-sm leading-6 my-1">{errors}</span>
  );

  return (
    <div className="bg-red-50 border-l-4 border-red-500 py-3 px-4 -mt-[30px] rounded">
      {errorItems}
    </div>
  );
};

export default Errors;
