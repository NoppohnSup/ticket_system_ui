import {useCallback, useEffect, useState} from 'react'
import {Button, Container, Divider, Grid, Header} from 'semantic-ui-react'
import TicketItem from '../../compoments/pages/tickets/TicketItem'
import TicketConfirmModal from '../../compoments/pages/tickets/TicketConfirmModal'
import TicketTypeService from '../../services/TicketTypeService'
import InfoModal from '../../compoments/common/modal/InfoModal'

import {TicketContext} from '../../context/TicketContext'

const Tickets = (props) => {
  const [count, setCount] = useState(0)
  const [ticketItems, setTicketItems] = useState(<></>)
  const [ticketData, setTicketData] = useState([])
  const [ticketSelected, setTicketSelected] = useState(null)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [infoModal, setInfoModal] = useState({
    open: false,
    title: '',
    content: '',
    textButton: ''
  })

  useEffect(() => {
    TicketTypeService.getListTicketType()
      .then(({data}) => {
        const ticketItems = data.map(v => {
          let stateOptions = []
          for (let i = v.minimum_buying; i <= v.limit_per_day; i++) {
            stateOptions.push({
              key: i,
              text: i,
              value: i
            })
          }

          return <TicketItem ticketTypeId={v.id} ticketType={v.ticket_type} ticketPrice={v.price}
                             qtyOptions={stateOptions}
                             handleChangeQty={handleChangeQty}/>
        })

        setTicketData(data)
        setTicketItems(ticketItems)
      })
  }, [])

  const handleChangeQty = useCallback((idTicketType, ticketType, price, qty) => {
    setTicketSelected((ticketSelected) => {
        return {
          ...ticketSelected,
          [idTicketType]: {
            id: idTicketType,
            ticketType,
            price,
            totalPrice: (price * qty),
            qty
          }
        }
      }
    )
  }, [ticketSelected])

  const handleClickBuy = () => {
    setCount((c) => c + 1)
  }

  const onCloseInfoModal = () => {
    window.location.reload()
  }

  const handleInfoModal = ({open, title, content, textButton}) => {
    setInfoModal(
      {open, title, content, textButton}
    )
  }

  return (
    <TicketContext.Provider value={{ticketSelected, ticketData}}>
      <Container style={{height: '100vh'}} fluid>
        <Header as='h2'>Tickets</Header>

        <Grid>
          <Grid.Column width={10}>
            {ticketItems}
            <Divider/>

            <Grid>
              <Grid.Column floated='right' width={5} onClick={handleClickBuy}>
                <Button onClick={() => {
                  if (!ticketSelected) return
                  setOpenConfirmModal(true)
                }}>Buy Ticket</Button>
              </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid>

        {openConfirmModal &&
        <TicketConfirmModal open={openConfirmModal} setOpen={setOpenConfirmModal} handleInfoModal={handleInfoModal}/>}

        {infoModal.open && <InfoModal
          open={infoModal.open}
          title={infoModal.title}
          content={infoModal.content}
          onClose={onCloseInfoModal}
          okText={infoModal.textButton}
        />}

      </Container>
    </TicketContext.Provider>
  )
}

export default Tickets
