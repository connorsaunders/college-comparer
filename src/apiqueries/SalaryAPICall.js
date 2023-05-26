const api_key = process.env.REACT_APP_API_KEY;

export async function salariesQuery(schoolId, majorCIP) {
  const base_url = 'https://api.data.gov/ed/collegescorecard/v1/schools';
  const fields = 'school.name,programs.cip_4_digit.earnings.1_yr.overall_median_earnings,programs.cip_4_digit.earnings.4_yr.overall_median_earnings,programs.cip_4_digit.credential.level';

  const params = {
    id: schoolId,
    fields: fields,
    'latest.programs.cip_4_digit.code': majorCIP
  };

  const url = new URL(base_url);
  url.search = new URLSearchParams(params).toString();
  
  // Append API key to the URL
  url.searchParams.append('api_key', api_key);

  console.log("Fetching data from URL: ", url.toString());


  try {
    const response = await fetch(url);
    const data = await response.json();
    let earnings = [null, null];
    for (const result of data.results) {
      for (const program of result['latest.programs.cip_4_digit']) {
        if (program.credential.level === 3) {
          earnings[0] = program.earnings['1_yr'].overall_median_earnings;
          earnings[1] = program.earnings['4_yr'].overall_median_earnings;

        }
      }
    }
    return earnings ? earnings : 'No data available';
  } catch (error) {
    console.error(error);
    return null;
  }
}
