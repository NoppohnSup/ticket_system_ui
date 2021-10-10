import {memo} from 'react'
import {Divider, Dropdown, Grid} from 'semantic-ui-react'

const TicketItem = (props) => {
  console.log('test ticket')
  const onChangeQty = (e, {value}) => {
    props.handleChangeQty(props.ticketTypeId, props.ticketType, props.ticketPrice, value)
  }

  return <>
    <Divider/>

    <Grid>
      <Grid.Column floated='left' width={5}>
        {props.ticketType}
      </Grid.Column>
      <Grid.Column floated='right' width={5}>
        <Grid>
          <Grid.Column width={5}>
            ฿{props.ticketPrice}
          </Grid.Column>
          <Grid.Column width={9}>
            x
            <Dropdown
              onChange={onChangeQty}
              simple
              item
              options={props.qtyOptions}/>
          </Grid.Column>
        </Grid>
      </Grid.Column>
    </Grid>
  </>
}

export default memo(TicketItem)