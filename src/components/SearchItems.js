import React from 'react';
import Select from 'react-select';
import colleges from '../data/colleges';
import majors from '../data/majors';

//import css
import '../css/RadioButtons.css';
import '../css/InputBoxes.css';
import '../css/GreenSubmitButton.css';

function SearchItems(props) {
  const {setInput1, setInput2, handleSubmit, tuitionState, setTuitionState } = props;
  
  const collegeOptions = colleges.map(college => ({
    value: college.name,
    label: college.name
  }));

  const majorOptions = majors.map(majors => ({
    value: majors.name,
    label: majors.name
  }))

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
        <label className="input-label">
          <Select
            options={collegeOptions}
            defaultValue={{ label: "Enter college name", value: null }}
            onChange={option => setInput1(option.value)}
            styles={{ control: styles => ({ ...styles, width: 400, height: 60, fontSize: 25, textAlign: 'center'  }) }}
            menuPlacement="auto"
            menuPosition="fixed"
          />
        </label>
        <label className="input-label">
          <Select
            options={majorOptions}
            defaultValue={{ label: "Enter major name", value: null }}
            onChange={option => setInput2(option.value)}
            styles={{ control: styles => ({ ...styles, width: 400, height: 60, fontSize: 25, textAlign: 'center'  }) }}
            menuPlacement="auto"
            menuPosition="fixed"
          />
        </label>
        <button type="submit">+</button>
      </div>
      <div className="radio-buttons">
        <input type="radio" id="In-State" value="In State" checked={tuitionState === "In State"} onChange={() => setTuitionState("In State")} />
        <label htmlFor="In-State" className="radio-label">In-State</label> 
        <input type="radio" id="Out-Of-State" value="Out of State" checked={tuitionState === "Out of State"} onChange={() => setTuitionState("Out of State")} />
        <label htmlFor="Out-Of-State" className="radio-label">Out-Of-State</label> 
      </div>
    </form>
  );
}

export default SearchItems;
