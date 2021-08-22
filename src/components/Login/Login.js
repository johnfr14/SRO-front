import classnames from "classnames";
import { LogUser, LogWallet } from "./index";

const Login = ({ noLogged, className }) => {
  return (
    <>
      <div className={classnames(className)}>
        {(noLogged && <LogWallet />) || <LogUser />}
      </div>
    </>
  );
};

export default Login;
