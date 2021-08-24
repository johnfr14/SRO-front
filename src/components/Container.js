import classnames from "classnames";

function Container({ children, className }) {
  return (
    <>
      <section
        className={classnames(
          "max-w-full mx-2 md:mx-8 lg:px-0 px-4 ",
          className
        )}
      >
        {children}
      </section>
    </>
  );
}

export default Container;
