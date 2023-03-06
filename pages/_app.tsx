import Head from 'next/head';
import { useReducer } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { App } from '../types/app';

import Loading from '../components/loading';

import AppContext from '../context/app';
import loadingReducer from '../reducers/loading';

import ValueMapper from '../functions/context-value-mapper';

function MyApp({ Component, pageProps }: AppProps) {
  const [loadingState, loadingDispatch] = useReducer(loadingReducer, false);

  const value: App = {
    loading: ValueMapper(loadingState, loadingDispatch)
  }
  return (
    <AppContext.Provider value={value}>
      <Head>
        <title>iconst: admin</title>
      </Head>
      <Component {...pageProps} />
      <Loading/>
    </AppContext.Provider>
  )
}

export default MyApp
