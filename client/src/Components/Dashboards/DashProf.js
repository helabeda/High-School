import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { currentProf } from '../../Redux/actions/auth';
import Home from '../Home';
import { Link } from "react-router-dom";

const DashProf = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(currentProf());
  }, [dispatch]);

  const prof = useSelector((state) => state.profReducer.prof);
  const loading = useSelector((state) => state.profReducer.loading);

  return loading ? (
    <h1>loading...</h1>
  ) : prof && prof.role === "prof" ? (
    <div>
      <h1 style={{ margin: "85px" }}>
        Welcome {prof && prof.nom} {prof && prof.prenom}
      </h1>
      <Link to={`/registre`}>
        <button className="btn"> Registre </button>
      </Link>
      <Link to={`/conv-parents`}>
        <button className="btn"> Convocation de parents </button>
      </Link>
    </div>
  ) : (
    <Home />
  );
};

export default DashProf
