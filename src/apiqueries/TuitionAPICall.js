const api_key = 'PP7IoOsMzwaWH8g3z9fWzP3SqVTOPk8qr2ugcSu9';

export async function tuitionQuery(schoolId, residency) {
  const base_url = 'https://api.data.gov/ed/collegescorecard/v1/schools';
  const fields = 'latest.cost.tuition.in_state,latest.cost.tuition.out_of_state';

  const params = {
    api_key: api_key,
    id: schoolId,
    fields: fields,
  };

  const url = new URL(base_url);
  url.search = new URLSearchParams(params).toString();

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
