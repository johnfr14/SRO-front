import { LogUser, LogWallet } from "./index";

const Login = ({ noLogged }) => {
  return <>{(noLogged && <LogWallet />) || <LogUser />}</>;
};

export default Login;
