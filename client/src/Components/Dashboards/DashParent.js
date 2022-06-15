import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { currentParent } from '../../Redux/actions/auth';
import Home from '../Home';

const DashParent = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(currentParent());
    }, [dispatch]);

    const parent = useSelector((state) => state.parentReducer.parent);
    const loading = useSelector((state) => state.parentReducer.loading);
    console.log(parent.identifiant)
     return loading ? (
       <h1>loading...</h1>
     ) : parent && parent.role === "parent" ? (
       <div>
         <h1 style={{ margin: "85px" }}>
           Welcome {parent && parent.nom} {parent && parent.prenom}
         </h1>
         <button className="btn"> Emploi </button>
         <Link to="/parent/remarque">
           <button className="btn"> Remarque </button>
         </Link>
         <Link to="/parent/registre">
           <button className="btn"> abscence </button>
         </Link>
       </div>
     ) : (
       <Home />
     );
}

export default DashParent
