import classnames from "classnames";
import { NavLink } from "react-router-dom";

function Button({ children, className, target, buttonStyle, wrongNetwork }) {
  return (
    <>
      <NavLink
        to={target ? target : ''}
        className={classnames(
          "text-white text-center transition duration-300 rounded-xl hover:opacity-75",
          className,
          wrongNetwork && "px-8 py-3 bg-red-500",
          buttonStyle && "text-gray-800 bg-yellow-400 px-8 py-3 hover:bg-yellow-600")
        }
      >
        {children}
      </NavLink>
    </>
  );
}

export default Button;
