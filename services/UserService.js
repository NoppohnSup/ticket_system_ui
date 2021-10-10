import HttpService from './HttpService'

export default {
  login(username, password) {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    }

    let request = {
      username,
      password
    }

    return HttpService.post('http://localhost:8082/login', request, config)
  }
}