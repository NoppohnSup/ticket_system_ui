import _ from 'lodash'
import {memo, useContext, useEffect, useState} from 'react'
import {Button, Grid, Header, Image, Label, Modal, Segment} from 'semantic-ui-react'
import TicketConfirmItem from './TicketConfirmItem'
import {TicketContext} from '../../../context/TicketContext'
import TicketOrderService from '../../../services/TicketOrderService'
import styled from 'styled-components'
import useLocalStorage from '../../hook/useLocalStorage'

const LabelGreen = styled(Label)`
    color: 'green'
  `

const LabelRed = styled(Label)`
    color: 'red'
  `

const ModalExampleModal = (props) => {
  const [storedValue, setStoredValue] = useLocalStorage("user");
  const {ticketSelected, ticketData} = useContext(TicketContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const [ticketItem, setTicketItem] = useState(<></>)
  const [responseMessage, setResponseMessage] = useState(<></>)

  console.log('ModalExampleModal')
  useEffect(() => {
    let totalP = 0
    const ticketItems = Object.keys(ticketSelected).map(idTicketType => {
      let {qty, totalPrice, price, ticketType} = ticketSelected[idTicketType]
      // totalPrice+=totalItemPrice
      // setTotalPrice((t) => t + totalItemPrice)
      totalP += totalPrice
      return <TicketConfirmItem ticketType={ticketType} ticketPrice={price} qty={qty} totalPrice={totalPrice} />
    })
    setTotalPrice(totalP)
    setTicketItem(ticketItems)
  }, [])

  const handleConfirmOrder = () => {
    if (!ticketSelected) return

    TicketOrderService.createOrder(storedValue, ticketSelected)
      .then(({data}) => {
        if (data && data.message && data.message === 'success') {
          setResponseMessage(<LabelGreen>{data.message}</LabelGreen>)
          props.setOpen(false)
          props.handleInfoModal({
            open: true,
            title: 'success',
            content: 'success',
            textButton: 'ok'
          })
        } else {
          setResponseMessage(<LabelRed>{data.message}</LabelRed>)
        }
      })
  }

  return (
    <Modal
      id={'id-modal-confirm'}
      onClose={() => props.setOpen(false)}
      onOpen={() => props.setOpen(true)}
      open={props.open}
      size={'small'}
    >
      <Modal.Header>Confirm ticket</Modal.Header>
      <Modal.Content>
        <Grid divided='vertically'>
          <Grid.Row columns={4}>
            <Grid.Column>
              <Header>Ticket Type</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Price</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Qty</Header>
            </Grid.Column>
            <Grid.Column>
              <Header>Total Price</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        {ticketItem}
        <Grid>
          <Grid.Column floated={'left'} width={8}>
            {responseMessage}
          </Grid.Column>
          <Grid.Column floated={'right'} width={2}>
            <Header>฿ {totalPrice}</Header>
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => props.setOpen(false)}>
          cancel
        </Button>
        <Button
          content="Confirm"
          onClick={handleConfirmOrder}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default memo(ModalExampleModal)