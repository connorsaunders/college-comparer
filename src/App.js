import React, { useState, useCallback } from "react";

import { tuitionQuery } from './apiqueries/TuitionAPICall';
import { salariesQuery } from './apiqueries/SalaryAPICall';
import { School_2_Codes_Dict } from "./data/School_to_Code";
import { Major_2_CIPCode } from "./data/Major_to_CIPCode";

//import components
import Header from "./components/Header";
import InputTable from "./components/InputTable";
import AboutCalculator from "./components/AboutCalculator";
import { TestChart } from './components/TestChart';

//background
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";

function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tuitionState, setTuitionState] = useState("In State"); // default value for tuitionState

  const handleSubmit = async ({ input1, input2 }) => {
    const tuition1 = await tuitionQuery(School_2_Codes_Dict[input1], tuitionState);
    const majorCIP = Major_2_CIPCode[input2];
    const salaries = await salariesQuery(School_2_Codes_Dict[input1], majorCIP);
    const year1_salary = salaries[0];
    const year4_salary = salaries[1];

    setTableData([...tableData, { input1, input2, tuitionState, tuition1, year1_salary, year4_salary }]);
  };

  const particlesInit = useCallback(main => {
    loadFull(main);
  }, [])

  return (
    <div>
      <Particles options={particlesOptions} init={particlesInit} />
      <Header />
      <InputTable
      input1={input1}
      setInput1={setInput1}
      input2={input2}
      setInput2={setInput2}
      tableData={tableData}
      onSubmit={handleSubmit}
      tuitionState={tuitionState}
      setTuitionState={setTuitionState}
      setTableData={setTableData}
      />
      <br/>
      <TestChart tableData={tableData} />
      <br/>
      <AboutCalculator />
    </div>
  );
}

export default App;
