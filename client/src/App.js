import { Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";
import AdminLog from "./Components/Login/AdminLog";
import ParentLog from "./Components/Login/ParentLog";
import ProfLog from "./Components/Login/ProfLog";
import PrivateRoute from "./Components/PrivateRoute";
import SignUpAdmin from "./Components/SignUp/SignUpAdmin";
import { logout } from "./Redux/actions/auth";
import {useHistory} from "react-router-dom"
import { useDispatch } from "react-redux";
import SignUpParent from "./Components/SignUp/SignUpParent";
import SignUpProf from "./Components/SignUp/SignUpProf";
import Dashboard from "./Components/Dashboards/Dashboard";
import Registre from "./Components/Prof/Registre";
import RegistreClass from "./Components/Prof/RegistreClass";
import SignUpEleve from "./Components/SignUp/SignUpEleve";
import EleveRegistre from "./Components/Parent/EleveRegistre";
import Remarque from "./Components/Parent/Remarque";

function App() {
  const history=useHistory();
  const dispatch=useDispatch();
  const token = localStorage.getItem("token");
  return (
    <div className="App">
      {/* <h1>LYCEE </h1>
      {token ? (
        <button
          className="Regl"
          onClick={() => {
            dispatch(logout());
            history.push("/");
          }}
        >
          Logout
        </button>
      ) : (
        <button>login</button>
      )} */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/parentlogin" component={ParentLog} />
        <Route exact path="/proflogin" component={ProfLog} />
        <Route exact path="/adminlogin" component={AdminLog} />
        <PrivateRoute exact path="/Signupadmin" component={SignUpAdmin} />
        <PrivateRoute exact path="/Signupparent" component={SignUpParent} />
        <PrivateRoute exact path="/Signupprof" component={SignUpProf} />
        <PrivateRoute exact path="/Signupeleve" component={SignUpEleve} />
        <PrivateRoute exact path="/Dashboard" component={Dashboard} />
        <PrivateRoute exact path="/Registre" component={Registre} />
        <PrivateRoute exact path="/Registre/:classe" component={RegistreClass}/>
        <PrivateRoute exact path="/parent/Registre" component={EleveRegistre} />
        <PrivateRoute exact path="/parent/remarque" component={Remarque} />


      </Switch>
    </div>
  );
}

export default App;
