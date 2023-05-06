import React, { useState } from 'react';
import SearchItems from './SearchItems';
import '../css/RedDeleteButton.css';


//Tuition query import
import { School_2_Codes_Dict } from "../data/School_to_Code";
import { tuitionQuery } from '../apiqueries/TuitionAPICall';

//Salary query import
import { Major_2_CIPCode } from "../data/Major_to_CIPCode";
import { salariesQuery } from '../apiqueries/SalaryAPICall';

function InputTable(props) {
  const { input1, setInput1, input2, setInput2, tableData, tuitionState, setTuitionState, setTableData } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.onSubmit({ input1, input2 });

    // Call tuitionQuery and update the tableData array with the results
    const tuition1 = await tuitionQuery(School_2_Codes_Dict[input1], tuitionState);

    // Call salariesQuery and update the tableData array with the results
    const majorCIP = Major_2_CIPCode[input2];
    const salary1 = await salariesQuery(School_2_Codes_Dict[input1], majorCIP);

    // Update the tableData array with the results
    const updatedTableData = [...tableData, { input1, input2, tuitionState, tuition1, salary1 }];
    setTableData(updatedTableData);
  };

  const handleDelete = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
  }

  return (
    <div>
      <div className="input-table-container">
        <h1 className="my-header">College Comparison Tool</h1>
        <h2 className="my-subheader">Find and Compare the ROI in your Education</h2>
        <SearchItems input1={input1} setInput1={setInput1} input2={input2} setInput2={setInput2} handleSubmit={handleSubmit} tuitionState={tuitionState} setTuitionState={setTuitionState} />
        <table className="my-table">
          <thead>
            <tr>
              <th>College</th>
              <th>Major</th>
              <th>In/Out State</th>
              <th colSpan="2">Cost of attendance</th>
              <th colSpan="3">Median Salary</th>
              <th></th> {/* Add an additional column for the delete button */}
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>1 yrs.</th>
              <th>4 yrs.</th>
              <th>1 yrs.</th>
              <th>3 yrs.</th>
              <th>6 yrs.</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td>{data.input1}</td>
                <td>{data.input2}</td>
                <td>{data.tuitionState}</td>
                <td>{data.tuition1 ? data.tuition1.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '-'}</td>
                <td>{data.tuition1 ? (data.tuition1 * 4).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '-'}</td>
                <td>{data.salary1 ? data.salary1.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '-'}</td>
                <td>{"$ _____"}</td>
                <td>{"$ _____"}</td>
                <td>
                  <button onClick={() => handleDelete(index)} className="delete-button"> - </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-container">
        <h3 style={{ fontSize: '30px' }}>About this Calculator</h3>
        <p>
          This tool provides data of cost of attendance and median salary of
          post graduates for specific college majors. This data is based on
          national information of in-state and out of state tuition, as well
          as 1, 3, and 6 year graduates from the college programs.
        </p>
      </div>
    </div>
  );
}

export default InputTable;
