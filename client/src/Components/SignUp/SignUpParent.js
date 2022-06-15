import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { currentAdmin,  signUpParent } from "../../Redux/actions/auth";
import Home from "../Home";

const SignUpParent = () => {
 const history = useHistory();
 const dispatch = useDispatch();
 useEffect(() => {
   dispatch(currentAdmin());
 }, [dispatch]);

 const submitLogin = (event) => {
   event.preventDefault();
   const data = new FormData(event.currentTarget);
   console.log({
     nom: data.get("nom"),
     prenom: data.get("prenom"),
     identifiant: data.get("identifiant"),
     number: data.get("number"),
     password: data.get("password"),
   });
   dispatch(
     signUpParent(
       {
         nom: data.get("nom"),
         prenom: data.get("prenom"),
         identifiant: data.get("identifiant"),
         number: data.get("number"),
         password: data.get("password"),
       },
       history
     )
   );
 };
 const admin = useSelector((state) => state.adminReducer.admin);
 const loading = useSelector((state) => state.adminReducer.loading);
 console.log(admin && admin.role);

 return loading ? (
   <h1>loading...</h1>
 ) : admin && admin.role === "superadmin" ? (
   <div>
     <h1>SIGNUP PARENT</h1>
     <form onSubmit={submitLogin}>
       <h2>Login</h2>
       <input type="text" placeholder="nom" className="input" name="nom" />
       <input
         type="text"
         placeholder="prenom"
         className="input"
         name="prenom"
       />
       <input
         type="text"
         placeholder="identifiant"
         className="input"
         name="identifiant"
       />
       <input
         type="text"
         placeholder="number"
         className="input"
         name="number"
       />
       <input
         type="password"
         placeholder="Password"
         className="input"
         name="password"
       />
       <button className="btn">Login</button>
     </form>
   </div>
 ) : (
   <Home />
 );
};

export default SignUpParent;
