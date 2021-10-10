import {Divider, Grid} from 'semantic-ui-react'

const TicketConfirmItem = (props) => {
  return <>
    <Divider/>

    <Grid divided='vertically'>
      <Grid.Row columns={4}>
        <Grid.Column>
          {props.ticketType}
        </Grid.Column>
        <Grid.Column>
          ฿{props.ticketPrice}
        </Grid.Column>
        <Grid.Column>
          {props.qty} ticket
        </Grid.Column>
        <Grid.Column>
          ฿{props.totalPrice}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </>
}

export default TicketConfirmItem