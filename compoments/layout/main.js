import React from 'react'
import {Header, Icon, Menu, Segment, Sidebar} from 'semantic-ui-react'
import styled from 'styled-components'
import {URL_REPORT, URL_TICKET, URL_LOGIN, URL_TICKET_TYPE_REPORT} from '../../constants/ROUTE'
import {useRouter} from 'next/router'
import useLocalStorage from '../hook/useLocalStorage'

const StyledDiv = styled.div`
    .pusher {
      transition: 0.5s;
      width: 100% !important;
      float: right;
    }
    
    /* sidebar style */
    .ui.thin.left.sidebar,
    .ui.thin.right.sidebar {
      width: 230px !important;
    }
    
    .ui.visible.thin.left.sidebar ~ .fixed,
    .ui.visible.thin.left.sidebar ~ .pusher {
      -webkit-transform: none;
      transition: 0.5s;
      width: calc(100% - 230px) !important;
    }
    
    /* end sidebar style */
  `

const Content = styled(Segment)`
    // 100% screen height - header menu - footer - pushable border
    min-height: calc(100vh - var(--top-menu-height) - 40px - 2px) !important; 
    margin: 0 0 !important;
    border-radius: 0 !important; 
  `

const Layout = (props) => {
  const {children} = props
  const [storedValue, setStoredValue] = useLocalStorage("user");

  const { push } = useRouter()

  const redirectTo = (val) => {
    if (typeof window !== 'undefined') {
      push(val)
    }
  }

  const logout = () => {
    setStoredValue(null)
    redirectTo(URL_LOGIN)
  }

  return (
    <StyledDiv className="main-content" style={{height: '100vh'}}>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          className='.ui.thin.left.sidebar'
          as={Menu}
          animation='push'
          icon='labeled'
          vertical
          visible
          width='thin'
        >
          <Menu.Item as='a' onClick={redirectTo.bind(this, URL_REPORT)}>
            <Icon name='table'/>
            Daily Report
          </Menu.Item>

          <Menu.Item as='a' onClick={redirectTo.bind(this, URL_TICKET_TYPE_REPORT)}>
            <Icon name='table'/>
            Ticket Type
          </Menu.Item>

          <Menu.Item as='a' onClick={redirectTo.bind(this, URL_TICKET)}>
            <Icon name='ticket'/>
            Ticket
          </Menu.Item>

          <Menu.Item as='a' onClick={logout}>
            <Icon name='window close outline'/>
            Logout
          </Menu.Item>

        </Sidebar>

        <Sidebar.Pusher>
          <Content>
            {children}
          </Content>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </StyledDiv>
  )
}
export default Layout