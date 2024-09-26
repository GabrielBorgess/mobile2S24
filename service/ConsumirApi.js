export default function ConsumirApi(url) {
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição');
        }
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Erro ao consumir a API:', error);
      });
  }