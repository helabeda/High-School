import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { currentAdmin, currentParent, currentProf } from "../../Redux/actions/auth";
import Home from "../Home";
import DashAdmin from './DashAdmin';
import DashParent from './DashParent';
import DashProf from './DashProf';
import DashSuperAdmin from './DashSuperAdmin';

const Dashboard = () => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(currentParent());
      dispatch(currentAdmin());
      dispatch(currentProf());
    }, [dispatch]);

    const parent = useSelector((state) => state.parentReducer.parent);
    const prof = useSelector((state) => state.profReducer.prof);
    const admin = useSelector((state) => state.adminReducer.admin);
    const loading = useSelector((state) => state.adminReducer.loading);
    return loading ? (
       <h1>loading...</h1>)
       :admin && admin.role === "superadmin"?(<DashSuperAdmin/>)
       :admin && admin.role === "admin"?(<DashAdmin/>)
       :prof && prof.role === "prof"?(<DashProf/>)
       :parent && parent.role === "parent"?(<DashParent/>):(<Home/>)
}

export default Dashboard
