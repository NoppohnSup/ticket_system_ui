import _ from 'lodash'
import moment from 'moment'
import {Button, Container, Dropdown, FormField, Grid, Icon, Menu, Table} from 'semantic-ui-react'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import {useContext, useEffect, useState} from 'react'
import TicketOrderService from '../../../services/TicketOrderService'
import TicketTypeService from '../../../services/TicketTypeService'

const totalItemPerPage = 20

const DATE_FORMAT = 'DD-MM-YYYY'

const Report = (props) => {
  const [page, setPage] = useState(1)
  const [orderTicket, setOrderTicket] = useState([])
  const [ticketType, setTicketType] = useState([])
  const [paymentDate, setPaymentDate] = useState([])
  const [selectedTicketTypes, setSelectedTicketTypes] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [totalPage, setTotalPage] = useState(1)
  const [menuItem, setMenuItem] = useState(<></>)
  const [rows, setRows] = useState(<></>)

  useEffect(() => {
    TicketTypeService.getListTicketType().then(
      (data) => {
        let ticketTypeOption = data?.data.map(v => (
          {
            key: v.id,
            text: v.ticket_type,
            value: v.id
          }
        ))

        ticketTypeOption.unshift({
          key: 0,
          text: 'all',
          value: ''
        })

        setTicketType([...ticketType, ticketTypeOption])
      }
    )

  }, [])

  useEffect(() => {
    setTotalPage(Math.ceil(totalCount / totalItemPerPage))
  }, [totalCount])

  useEffect(() => {
    setMenuItem(menu)
  }, [totalPage])

  useEffect(() => {
    setMenuItem(menu)
    submitSearch(page)
  }, [page])

  useEffect(() => {
    const rows = orderTicket.map(v => (
      <Table.Row>
        <Table.Cell>{v.id}</Table.Cell>
        <Table.Cell>{v.ticket_type}</Table.Cell>
        <Table.Cell>{v.qty}</Table.Cell>
        <Table.Cell>{v.total_price}</Table.Cell>
        <Table.Cell>{moment(v.payment_date).format(DATE_FORMAT)}</Table.Cell>
      </Table.Row>
    ))

    setRows(rows)
  }, [orderTicket])

  const menu = () => _.times(totalPage, (i) => {
    console.log('page', page)
    let currentPage = i + 1
    return <Menu.Item name={currentPage} active={page === currentPage} onClick={(e, {name}) => setPage(name)}>{currentPage}</Menu.Item>
  })

  const submitSearch = (_page) => {
    const startDate = paymentDate && paymentDate[0] ? moment(paymentDate[0]).format("YYYY-MM-DD") : '';
    const endDate = paymentDate && paymentDate[1] ? moment(paymentDate[1]).format("YYYY-MM-DD") : '';

    TicketOrderService.getListTicketOrder(_page, totalItemPerPage, startDate, endDate, selectedTicketTypes).then(
      (data) => {
        setOrderTicket(data.data.ticketOrderData)
        let count = data.data.count && data.data.count[0] && data.data.count[0].total
        console.log('count', count)
        setTotalCount(count)
      }
    )
  }

  return <Container style={{height: '100vh'}} fluid>
    <Grid divided='vertically'>
      <Grid.Row columns={4}>
        <Grid.Column>
          <Dropdown
            placeholder='Ticket Type'
            fluid
            multiple
            selection
            options={ticketType}
            value={selectedTicketTypes}
            onChange={(event, {value}) => setSelectedTicketTypes(value)}
          />
        </Grid.Column>
        <Grid.Column>
          <FormField
            id={'package-created-at-input'}
            className={'datepicker-input'}
            control={SemanticDatepicker}
            format={DATE_FORMAT}
            placeholder={'Dates'}
            type={'range'}
            value={paymentDate}
            onChange={(event, {value}) => setPaymentDate(value)}
            datePickerOnly
          />
        </Grid.Column>
        <Grid.Column/>
        <Grid.Column floated='right'>
          <Button onClick={submitSearch.bind(this, 1)}>Filter</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>

    <Grid>
      <Grid.Column width={14}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Id</Table.HeaderCell>
              <Table.HeaderCell>Ticket Type</Table.HeaderCell>
              <Table.HeaderCell>Qty</Table.HeaderCell>
              <Table.HeaderCell>Total Price</Table.HeaderCell>
              <Table.HeaderCell>Payment Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rows}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='5'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron left'/>
                  </Menu.Item>
                  {menuItem}
                  <Menu.Item as='a' icon>
                    <Icon name='chevron right'/>
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Grid.Column>
    </Grid>
  </Container>
}

export default Report