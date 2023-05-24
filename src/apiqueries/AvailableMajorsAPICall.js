const api_key = process.env.REACT_APP_API_KEY;

export async function availableMajorsQuery(schoolId) {
  const base_url = 'https://api.data.gov/ed/collegescorecard/v1/schools';
  const fields = 'latest.programs.cip_4_digit.code';

  const params = {
    id: schoolId,
    fields: fields,
  };

  const url = new URL(base_url);
  url.search = new URLSearchParams(params).toString();

  // Append API key to the URL
  url.searchParams.append('api_key', api_key);

  console.log(url.search);

  try {
    //get response data from api call
    const response = await fetch(url);
    const data = await response.json();
    //get list of cip codes from response data
    const cip_codes = data.results[0]['latest.programs.cip_4_digit'];
    //filter out codes with duplicates values
    const unique_cip_codes = cip_codes.filter((code, index, self) => self.findIndex(c => c.code === code.code) === index);
    //return list of unique cip codes
    return unique_cip_codes;
  } catch (error) {
    console.error(error);
    return null;
  }
}
