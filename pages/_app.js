import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import withGA from 'next-ga';

import Fonts from '../components/Fonts';
import { NavigationProvider } from '../components/Navigation';

class NightGuideWebsite extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    const { query, pathName } = ctx;
    const navigationProps = {
      query,
      pathName,
    };

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, navigationProps };
  }

  render() {
    const { Component, pageProps, navigationProps } = this.props;

    return (
      <Container>
        <Fonts />
        <NavigationProvider value={navigationProps}>
          <Component {...pageProps} />
        </NavigationProvider>
      </Container>
    );
  }
}

export default withGA(process.env.REACT_APP_GA_TOKEN, Router, {
  localhost: 'disable',
})(NightGuideWebsite);
