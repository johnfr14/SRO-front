import { Button } from "react";
import classnames from "classnames";

function ButtonOnClick({ children, className, onClick, buttonStyle }) {
  return (
    <>
      <Button
        onClick={onClick}
        className={classnames(
          " transition duration-300 bg-gradient-to-br rounded-xl hover:opacity-75",
          className,
          (buttonStyle &&
            "text-black px-8 py-3 from-primary-200 to-primary-200") ||
            "text-white hover:text-primary-200"
        )}
      >
        {children}
      </Button>
    </>
  );
}

export default ButtonOnClick;
