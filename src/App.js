import React, { useState } from "react";
import InputTable from "./components/InputTable";
import { tuitionQuery } from './apiqueries/TuitionAPICall';
import { School_2_Codes_Dict } from "./data/School_to_Code";


function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tuitionState, setTuitionState] = useState("In State"); // default value for tuitionState

  const handleSubmit = async ({ input1, input2 }) => {
    // Call tuitionQuery and update the tableData array with the results
    const tuition1 = await tuitionQuery(School_2_Codes_Dict[input1], tuitionState);
    const tuition2 = await tuitionQuery(School_2_Codes_Dict[input2], tuitionState);

    setTableData([...tableData, { input1, input2, tuitionState, tuition1, tuition2 }]);
    setTuitionState("In State"); // reset tuitionState to default
  };

  return (
    <div>
      <InputTable
  input1={input1}
  setInput1={setInput1}
  input2={input2}
  setInput2={setInput2}
  tableData={tableData}
  onSubmit={handleSubmit}
  tuitionState={tuitionState}
  setTuitionState={setTuitionState}
  setTableData={setTableData} // add this prop
/>
    </div>
  );
}

export default App;
