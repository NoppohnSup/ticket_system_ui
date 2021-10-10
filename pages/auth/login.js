import {useContext, useState, useEffect} from 'react'
import {Button, Container, Form, Grid, Header, Segment} from 'semantic-ui-react'
import _ from 'lodash'
import UserService from '../../services/UserService'
import {URL_REPORT} from '../../constants/ROUTE'
// import {AuthContext} from '../../context/AuthContext'
import {useRouter} from 'next/router'
import useLocalStorage from '../../compoments/hook/useLocalStorage'

const LoginLayout = function ({children}) {
  return (
    <div>
      {children}
    </div>
  )
}

const login = (props) => {
  const [storedValue, setStoredValue] = useLocalStorage("user");
  const { push } = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user) {
      push(URL_REPORT)
    }

  }, [user])

  const submitLogin = () => {
    UserService.login(username, password)
      .then(response => {
        handleUpdateUser(response.data.user)
      })
  }

  const handleUpdateUser = (value) => {
    setUser(value)
    setStoredValue(value)
  }

  const handleChange = (event) => {
    event.preventDefault()
    const {name, value} = event.target
    if (name === 'username') {
      setUsername(_.isEmpty(value) ? '' : _.trim(value))

    } else if (name === 'password') {
      setPassword(_.isEmpty(value) ? '' : value)
    }

  }

  const ShowError = () => {
    // let errorMessage = _.get(error, 'message', '')
    // if (!_.isEmpty(errorMessage)) {
    //   setLoading(false)
    //   return <Message aria-label='login-error-msg' id='label-error-login' attached='bottom'
    //     error> {errorMessage} </Message>
    // }
  }


  return (
    <Container className='centered'>
      <Grid textAlign='center' style={{
        minHeight: '100vh'
      }}>
        <Grid.Column style={{width: '450px', height: '450px', margin: 'auto'}}>
          <div>
            <Header as='h2' color='teal' textAlign='center'>
              <div>Login</div>
            </Header>
            <Form size='large' onSubmit={submitLogin}>
              <Segment stacked>
                <Form.Input
                  onChange={handleChange}
                  name='username'
                  id="input-login-username"
                  fluid icon='user'
                  value={username}
                  iconPosition='left'
                />
                <Form.Input
                  onChange={handleChange}
                  name='password'
                  id="input-login-password"
                  fluid icon='lock'
                  iconPosition='left'
                  type='password'
                />
                <Button color='teal' aria-label="login-button" fluid id="button-login"
                        size='large'>login</Button>

              </Segment>
            </Form>
            {ShowError()}
          </div>
        </Grid.Column>
      </Grid>
    </Container>

  )
}

login.Layout = LoginLayout
export default login
