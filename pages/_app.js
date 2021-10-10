import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import DefaultLayout from '../compoments/layout/main'
import styled from 'styled-components'
import {AuthProvider} from '../routes/AuthRoute'

const LoaderWrapper = styled.div`
  position: relative;
`

function MyApp({Component, pageProps}) {
  const Layout = Component.Layout || DefaultLayout
  return <LoaderWrapper>
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  </LoaderWrapper>

}

export default MyApp
