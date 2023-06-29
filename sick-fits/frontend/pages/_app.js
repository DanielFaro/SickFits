/* eslint-disable react/jsx-props-no-spreading */
// this file allows us to control above the Page index.js, like appRoot
import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import '../components/styles/nprogress.css';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  // this is a an asunc Next.js thing
  let pageProps = {};
  if (Component.getInitialProps) {
    // if any pages have getInitioaProps method, then wait and fetch the props
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query; // This gives acces
  return { pageProps };
};

export default withData(MyApp); // this sends apollo to our app above
