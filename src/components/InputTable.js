//import React, { useState } from 'react';
import SearchItems from './SearchItems';

//import css
import '../css/RedDeleteButton.css';
import '../css/InputTable.css';
import '../css/SalaryCells.css';

//import tuition query
import { School_2_Codes_Dict } from "../data/School_to_Code";
import { tuitionQuery } from '../apiqueries/TuitionAPICall';

//import salary query
import { Major_2_CIPCode } from "../data/Major_to_CIPCode";
import { salariesQuery } from '../apiqueries/SalaryAPICall';

//import getClassSalary utility function
import { getClassForSalary1Year } from '../utils/utils';
import { getClassForSalary4Year } from '../utils/utils';

function InputTable(props) {
  const { input1, setInput1, input2, setInput2, tableData, tuitionState, setTuitionState, setTableData } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.onSubmit({ input1, input2 });

    // Call tuitionQuery and update the tableData array with the results
    const tuition1 = await tuitionQuery(School_2_Codes_Dict[input1], tuitionState);
    console.log("tuition: ",tuition1)

    // Call salariesQuery and update the tableData array with the results
    const majorCIP = Major_2_CIPCode[input2];
    const salaries = await salariesQuery(School_2_Codes_Dict[input1], majorCIP);
    console.log("salaries: ",salaries)
    const year1_salary = salaries[0];
    const year4_salary = salaries[1];

    // Update the tableData array with the results
    const updatedTableData = [...tableData, { input1, input2, tuitionState, tuition1, year1_salary, year4_salary }];
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
              <th colSpan="2">Median Salary</th>
              <th></th> {/* Add an additional column for the delete button */}
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>1 yrs.</th>
              <th>4 yrs.</th>
              <th>1 yrs.</th>
              <th>4 yrs.</th>
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
                <td className={getClassForSalary1Year(data.year1_salary, tableData)}>{data.year1_salary ? data.year1_salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '-'}</td>
                <td className={getClassForSalary4Year(data.year4_salary, tableData)}>{data.year4_salary ? data.year4_salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '-'}</td>
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
          as the salaries for students that earned Bachelor's degrees one and 
          four years after graduation.
        </p>
      </div>
    </div>
  );
}

export default InputTable;
