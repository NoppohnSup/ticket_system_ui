import { useState } from 'react'
import {Modal, Button} from 'semantic-ui-react'
import _ from 'lodash'

const InfoModal = (props) => {

  const onOpen = () => {
    if (_.isFunction(props.onOpen)) {
      props.onOpen()
    }
  }

  const onClose = () => {
    if (_.isFunction(props.onClose)) {
      props.onClose()
    }
  }

  const onOk = () => {
    props.onClose()
  }

  let okText = props.okText || 'OK'
  let size = _.isEmpty(props.size) ? 'tiny' : props.size

  let title = !_.isEmpty(props.title) ? props.title : null
  let content = !_.isEmpty(props.content) ? props.content : 'Are you sure ?'
  let isOkDisabled = props.disabled || false

  return (
    <div className={props.className}>
      <Modal
        onClose={onClose}
        onOpen={onOpen}
        open={props.open || false}
        size={size}
        closeOnDimmerClick={props.closeOnDimmerClick || false}
      >
        <Modal.Header>{title}</Modal.Header>
        <Modal.Content scrolling>
          <Modal.Description>
            {content}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={onOk} positive disabled={isOkDisabled}>
            {okText}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default InfoModal