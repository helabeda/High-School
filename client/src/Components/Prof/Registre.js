import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { currentProf } from '../../Redux/actions/auth';
import Home from '../Home';
import { useHistory } from "react-router-dom";



const Registre = () => {
  const history=useHistory()
      const dispatch = useDispatch();
      useEffect(() => {
        dispatch(currentProf());
      }, [dispatch]);
      const prof = useSelector((state) => state.profReducer.prof);
      const loading = useSelector((state) => state.profReducer.loading);

const handleClasse = (value) => {
  console.log("rerer",value)
  history.push(`/registre/${value}`);
 
};
   return loading ? (
     <h1>loading...</h1>
   ) : prof && prof.role === "prof" ? (
     <div>
       <label >Choisir votre classes: </label>
       <select name="classes" defaultValue={'--'} onChange={(event) => handleClasse(event.target.value)}>
           <option value="--" disabled >
             {" "}--{" "}
           </option>
           {prof.classes.map((e) => (
             <option key={e} value={e}>{e}</option>
           ))}
       </select>
     </div>
   ) : (
     <Home />
   );
}

export default Registre
