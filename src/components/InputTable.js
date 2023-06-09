import SearchItems from './SearchItems';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../css/RedDeleteButton.css';
import '../css/InputTable.css';
import '../css/SalaryCells.css';
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
    <div className="input-table-container table-shell">
      <div className="input-table-container">
        <SearchItems input1={input1} setInput1={setInput1} input2={input2} setInput2={setInput2} handleSubmit={handleSubmit} tuitionState={tuitionState} setTuitionState={setTuitionState} />
        <table className="my-table input-table">
          <thead>
            <tr>
              <th className="college-cell" rowSpan="2">College</th>
              <th className="major-cell" rowSpan="2">Major</th>
              <th className="residency-cell" rowSpan="2">Residency</th>
              <th className="cost-cell" colSpan="2">Cost of Attendance</th>
              <th className="salary-cell" colSpan="2">Median Salary</th>
              <th className="delete-cell"></th> {}
            </tr>
            <tr>
              <th className="years-cell">1 yrs.</th>
              <th className="years-cell">4 yrs.</th>
              <th className="years-cell">1 yrs.</th>
              <th className="years-cell">4 yrs.</th>
            </tr>
          </thead>
          <tbody>
            <TransitionGroup component={null}>
              {tableData.map((data, index) => (
                <CSSTransition key={index} timeout={{ enter: 200, exit: 0 }} classNames="slide">
                  <tr key={index} className="slide">
                    <td>{data.input1}</td>
                    <td>{data.input2}</td>
                    <td style={{ textAlign: "center", fontSize: "18px" }}>{data.tuitionState}</td>
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
    </div>
  );
}

export default InputTable;
