import HttpService from './HttpService'

export default {
  getListTicketType() {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    }

    return HttpService.get("http://localhost:8082/ticket_type/list", '', config)
  },

  getListTicketTypeStock(currentPage, limit, ticketType, startDate, endDate) {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    }

    const offset = (currentPage - 1) * limit

    const params = {
      offset,
      limit,
      startDate : startDate || '',
      endDate: endDate || '',
      ticketType : ticketType || ''
    }

    return HttpService.get("http://localhost:8082/ticket_type/stock/list", params, config)
  }
}