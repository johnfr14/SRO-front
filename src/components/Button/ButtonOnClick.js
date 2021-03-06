import classnames from "classnames";

function ButtonOnClick({ loading, children, className, onClick, buttonStyle, buttonRemove, buttonSuccess }) {
  return (
    <>
      <button
        onClick={onClick}
        disabled={loading}
        className={classnames(
          " transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75",
          className,
          (buttonStyle &&
            "text-black px-8 py-3 from-primary-200 to-primary-200") ||
          (buttonRemove &&
            "text-black px-8 py-3 from-red-600 to-red-800") ||
          (buttonSuccess &&
          "text-black px-8 py-3 from-green-200 to-green-400") ||
            "text-white hover:text-primary-200"
        )}
      >
        {children}
      </button>
    </>
  );
}

export default ButtonOnClick;
