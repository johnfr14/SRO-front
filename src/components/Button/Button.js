import classnames from "classnames";
import { NavLink } from "react-router-dom";

function Button({ children, className, target, buttonStyle }) {
  return (
    <>
      <NavLink
        to={target}
        className={classnames(
          " transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75",
          className,
          (buttonStyle &&
            "text-black px-8 py-3 from-primary-200 to-primary-200") ||
            "text-white hover:text-primary-200"
        )}
      >
        {children}
      </NavLink>
    </>
  );
}

export default Button;
