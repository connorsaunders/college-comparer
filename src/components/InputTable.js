//import React, { useState } from 'react';
import SearchItems from './SearchItems';

//React transition group
import { CSSTransition, TransitionGroup } from 'react-transition-group';

//import css
import '../css/RedDeleteButton.css';
import '../css/InputTable.css';
import '../css/SalaryCells.css';

//import getClassSalary utility function
import { getClassForSalary1Year } from '../utils/utils';
import { getClassForSalary4Year } from '../utils/utils';

function InputTable(props) {
  const { input1, setInput1, input2, setInput2, tableData, tuitionState, setTuitionState, setTableData } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input1 || !input2) { // checks if input1 or input2 is blank
      return;
    }
    props.onSubmit({ input1, input2 });
  };


  const handleDelete = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
  }

  return (
    <div>
      <div className="input-table-container">
        <div className="input-table-container">
          <h1 className="my-header">College Cost Comparison Tool</h1>
          <h2 className="my-subheader"><em>Get the ROI you need from your education!</em></h2>
          <SearchItems input1={input1} setInput1={setInput1} input2={input2} setInput2={setInput2} handleSubmit={handleSubmit} tuitionState={tuitionState} setTuitionState={setTuitionState} />
          <table className="my-table">
            <thead>
              <tr>
                <th rowSpan="2">College</th>
                <th rowSpan="2">Major</th>
                <th rowSpan="2">In/Out State</th>
                <th colSpan="2">Cost of attendance</th>
                <th colSpan="2">Median Salary</th>
                <th></th> {/* Add an additional column for the delete button */}
              </tr>
              <tr>
                <th>1 yrs.</th>
                <th>4 yrs.</th>
                <th>1 yrs.</th>
                <th>4 yrs.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <TransitionGroup component={null}>
                {tableData.map((data, index) => (
                  <CSSTransition key={index} timeout={500} classNames="slide">
                    <tr key={index} className="slide">
                      <td>{data.input1}</td>
                      <td>{data.input2}</td>
                      <td>{data.tuitionState}</td>
                      <td className={`center ${data.tuition1 ? '' : 'no-data'}`}>{data.tuition1 ? data.tuition1.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'No Data Available'}</td>
                      <td className={`center ${data.tuition1 ? '' : 'no-data'}`}>{data.tuition1 ? (data.tuition1 * 4).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'No Data Available'}</td>
                      <td className={`center ${data.year1_salary ? '' : 'no-data'} ${getClassForSalary1Year(data.year1_salary, tableData)}`}>{data.year1_salary ? data.year1_salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'No Data Available'}</td>
                      <td className={`center ${data.year4_salary ? '' : 'no-data'} ${getClassForSalary4Year(data.year4_salary, tableData)}`}>{data.year4_salary ? data.year4_salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : 'No Data Available'}</td>
                      <td>
                        <button onClick={() => handleDelete(index)} className="delete-button"> - </button>
                      </td>
                    </tr>
                  </CSSTransition>
                ))}
              </TransitionGroup>

            </tbody>
          </table>
        </div>
        <div className="text-container">
          <h3 style={{ fontSize: '30px' }}>About this Calculator</h3>
          <p>
            The data provided by this tool comes from the College Scorecard,
            which offers comprehensive information about colleges and universities
            in the United States. Specifically, this tool provides information
            on the cost of attendance and median salaries of post-graduates
            for specific college majors. The data used in this tool is based
            on national information of in-state and out-of-state tuition,
            as well as the salaries for students who earned Bachelor's degrees
            one and four years after graduation. To access the College Scorecard
            and learn more about the data used in this tool, please visit their
            website at <a href="https://collegescorecard.ed.gov/">https://collegescorecard.ed.gov/</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InputTable;
