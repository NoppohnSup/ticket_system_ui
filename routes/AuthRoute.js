import React, {useState, useEffect, useReducer} from 'react'
import { useRouter } from 'next/router'
import {
  URL_TICKET,
  URL_REPORT,
  URL_MAIN, URL_LOGIN
} from '../constants/ROUTE'
import {AuthContext} from '../context/AuthContext'
import useLocalStorage from '../compoments/hook/useLocalStorage'

const AuthProvider = (props) => {
  const {children} = props
  const [storedValue, setStoredValue] = useLocalStorage("user");

  const { pathname, events, push } = useRouter()
  const [nextRender, setNextRender] = useState(null)
  const [currentPath, setCurrentPath] = useState('')
  const logTime = new Date().valueOf()

  const redirectTo = (val) => {
    if (typeof window !== 'undefined') {
      push(val)
    }
  }

  const processRootPath = () => {
    if (storedValue) {
      return children
    } else {
      redirectTo(URL_LOGIN)
      return children
    }
  }

  const processNoAuth = () => {
    if (storedValue) {
      return children
    } else {
      redirectTo(URL_LOGIN)
      return children
    }
  }

  //main logic
  let currentPathBefore = currentPath
  useEffect(() => {
    console.log(logTime, pathname, 'pathname')

    if (pathname === '/') {
      setNextRender(processRootPath())
    } else {

      setNextRender(processNoAuth())

    }
    console.log(`trigger ${logTime} effect... pathname='${pathname}'`)


  }, [currentPath])

  if (currentPath !== pathname) {
    console.log(`trigger ${logTime} setCurrentPath... currentPath='${currentPathBefore}', pathname='${pathname}'`)
    setCurrentPath(pathname)
  }
  console.log('nextRender===>', nextRender)
  return (
    // if next == null then block to load page

    <AuthContext.Provider value={storedValue}>{nextRender}</AuthContext.Provider>
  )
}

export { AuthProvider }