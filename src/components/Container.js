import classnames from "classnames";

function Container({ children, className }) {
  return (
    <>
      <section
        className={classnames(
          "max-w-full mx-8 lg:px-0 px-4 bg-gray-600 ",
          className
        )}
      >
        {children}
      </section>
      ;
    </>
  );
}

export default Container;
