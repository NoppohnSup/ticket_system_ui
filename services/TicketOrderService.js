import HttpService from './HttpService'

export default {
  getListTicketOrder(currentPage, limit, startDate, endDate, ticketType) {
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
      endDate : endDate || '',
      ticketTypes : ticketType || []
    }

    return HttpService.get("http://localhost:8082/ticket_order/list", params, config)
  },

  createOrder(idUser, ticketSelected) {
    const config = {
      headers: {
        'content-type': 'application/json'
      }
    }

    // const orderTotalPrice = Object.values(ticketSelected).reduce((a, b) => a.totalPrice + b.totalPrice)

    const params = {
      id_user: '1',
      order_line: Object.values(ticketSelected)
    }
    return HttpService.post('http://localhost:8082/ticket_type/create', params, config)
  }
}