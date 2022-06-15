import React, { useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "../Home";
import { useHistory, useParams } from "react-router-dom";
import { getRegistre, putAbsence } from "../../Redux/actions/profActions";
import { currentProf } from "../../Redux/actions/auth";
import "./RegistreClass.css"

const RegistreClass = () => {
    const {classe}=useParams();
  const history = useHistory(); 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRegistre(classe));
  }, [dispatch,classe]);

  useEffect(() => {
    dispatch(currentProf());
  }, [dispatch]);


  const handleRegistre=(e,ev)=>{
    setRegistre(registre.map(el=>el.eleve==e._id?{...el,status:ev.target.value}:el));
    if(ev.target.value=="Absent"){
      
    dispatch(putAbsence(e.identifiant));
  }
    }
  
  const [registre, setRegistre] = useState([])
  //const [eleves, setEleves] = useState([])
  //const [student, setStudent]=useState()
  
  
  // useEffect(()=>{
  //   dispatch(postRegistre({
  //     date:data.get("date"),
  //     eleves.eleve:data.get("id"),
  //     eleves.eleve:data.get("status"),
  //   }))
  // })

  // const handleChenge=(e)=>{
  //   setStatus(e.target.value);
  // }

  const prof = useSelector((state) => state.profReducer.prof);
  const registreclass = useSelector((state) => state.profClasseReducer.registre);
  const loading = useSelector((state) => state.profClasseReducer.loading);
  useEffect(() => {
    setRegistre(
      registreclass.map((el) => {
        return { eleve: el._id, status: "present" };
      })
    );
    console.log("objet student", registre);
  }, [registreclass]);
  console.log(prof)
  return loading ? (
    <h1>loading...</h1>
  ) : prof && prof.role === "prof" ? (
    <div>
      <h1>Classe :{classe} </h1>

      <table>
        <thead>
          <tr>
            <td>Nom</td>
            <td>Prenom</td>
            <td>Presence</td>
          </tr>
        </thead>
        {registreclass.map((e) => (
          <tbody key={e._id} name="id">
            <tr>
              <td>{e.nom}</td>
              <td>{e.prenom}</td>
              <td>
                {/* <div className="container">
                  <label className="switch">
                    <input type="checkbox" id="checkbox" /> 
                    <div className="slider round"></div>
                  </label>
                </div> */}

                <select required as="select" onChange={handleRegistre}>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Exclu">Exclu</option>
                </select>
              </td>
              {/* <td><button>Exclu</button></td> */}
            </tr>
          </tbody>
        ))}
      </table>
      <button style={{ color: "green" }}>VALIDER</button>
    </div>
  ) : (
    <Home />
  );
};

export default RegistreClass;
