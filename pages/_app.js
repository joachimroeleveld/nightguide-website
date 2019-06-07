import React from 'react';
import App, { Container } from 'next/app';
import Router from 'next/router';
import withGA from 'next-ga';

class NightGuideWebsite extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

let app = NightGuideWebsite;
if (process.env.NODE_ENV === 'production') {
  app = withGA(process.env.REACT_APP_GA_TOKEN, Router)(NightGuideWebsite);
}

export default app;
