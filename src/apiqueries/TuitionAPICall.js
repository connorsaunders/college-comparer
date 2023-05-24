const api_key = process.env.REACT_APP_API_KEY;

export async function tuitionQuery(schoolId, residency) {
  const base_url = 'https://api.data.gov/ed/collegescorecard/v1/schools';
  const fields = 'latest.cost.tuition.in_state,latest.cost.tuition.out_of_state';

  const params = {
    id: schoolId,
    fields: fields,
  };

  const url = new URL(base_url);
  url.search = new URLSearchParams(params).toString();

  // Append API key to the URL
  url.searchParams.append('api_key', api_key);

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (residency === 'In State') {
      return data.results[0]['latest.cost.tuition.in_state'];
    } else {
      return data.results[0]['latest.cost.tuition.out_of_state'];
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
