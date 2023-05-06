// CURRENTLY ONLY GETS 1 YEAR SALARY DATA
    // IN THE FUTURE, WILL GET 3 YEAR AND 6 YEAR SALARY DATA

const api_key = 'PP7IoOsMzwaWH8g3z9fWzP3SqVTOPk8qr2ugcSu9';

export async function salariesQuery(schoolId, majorCIP) {
  const base_url = 'https://api.data.gov/ed/collegescorecard/v1/schools';
  const fields = 'school.name,programs.cip_4_digit.earnings.1_yr.overall_median_earnings,programs.cip_4_digit.credential.level';

  const params = {
    api_key: api_key,
    id: schoolId,
    fields: fields,
    'latest.programs.cip_4_digit.code': majorCIP
  };

  const url = new URL(base_url);
  url.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url);
    const data = await response.json();
    let level_3_earnings = null;
    for (const result of data.results) {
      for (const program of result['latest.programs.cip_4_digit']) {
        if (program.credential.level === 3) {
          level_3_earnings = program.earnings['1_yr'].overall_median_earnings;
        }
      }
    }
    return level_3_earnings ? level_3_earnings : 'No data available';
  } catch (error) {
    console.error(error);
    return null;
  }
}