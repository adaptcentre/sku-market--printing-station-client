export class ApiService {
  print(id) {
    let url = `/api/print`

    let body = { id: id }

    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }
}