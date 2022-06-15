import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentParent } from '../../Redux/actions/auth'
import {getParentRegistre}from "../../Redux/actions/parentAction"
import Home from '../Home'

const EleveRegistre = () => {
 const dispatch=useDispatch()

    

    useEffect(() => {
      dispatch(currentParent());
    }, [dispatch]);
    const parent = useSelector((state) => state.parentReducer.parent);
    const loading = useSelector((state) => state.parentReducer.loading);
    const RegistreEleve = useSelector((state) => state.parentEleveReducer.registre);
    useEffect(() => {
      dispatch(getParentRegistre(parent.identifiant));
    }, [dispatch, parent.identifiant]);

    return loading ? (
    <h1>loading...</h1>
  ) : parent && parent.role === "parent" ? (
    <div>
        
    </div>
        
    ):<Home/>
}

export default EleveRegistre
