export function getClassForSalary1Year(salary, tableData) {
  if (!salary || !tableData || tableData.length === 0) {
    return '';
  }
  const salaries = tableData.map(data => data.year1_salary);
  const avgSalary = salaries.reduce((acc, data) => acc + data, 0) / salaries.length;
  //console.log("avgSalary: ",avgSalary)
  const normalizedSalary = salary / avgSalary;
  //console.log("normalizedSalary: ",normalizedSalary)
  if (normalizedSalary >= 1) {
    return 'salary-cell-high';
  } else if (normalizedSalary >= 0.5) {
    return 'salary-cell-medium';
  } else {
    return 'salary-cell-low';
  }
} 

export function getClassForSalary4Year(salary, tableData) {
  if (!salary || !tableData || tableData.length === 0) {
    return '';
  }
  const salaries = tableData.map(data => data.year4_salary);
  const avgSalary = salaries.reduce((acc, data) => acc + data, 0) / salaries.length;
  //console.log("avgSalary: ",avgSalary)
  const normalizedSalary = salary / avgSalary;
  //console.log("normalizedSalary: ",normalizedSalary)
  if (normalizedSalary >= 1) {
    return 'salary-cell-high';
  } else if (normalizedSalary >= 0.5) {
    return 'salary-cell-medium';
  } else {
    return 'salary-cell-low';
  }
}
  