export const postRequest = async (sortBy) => {
  const URL = `https://localhost:3005/cars/index?sort=${sortBy}`;
  const response = await fetch(URL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify('Отправка запроса'),
  });
  return response.json();
}
