import React from 'react';
import { hotjar } from 'react-hotjar';
import App, { Container } from 'next/app';
import Router from 'next/router';
import withGA from 'next-ga';
import Modal from 'react-modal';

// TODO: https://github.com/zeit/next-plugins/issues/282
import '../static/css/empty.css';
import { QueryProvider } from '../components/Navigation';

Modal.setAppElement('#__next');

class NightGuideWebsite extends App {
  static async getInitialProps({ Component, ctx }) {
    let props = {};

    const { query } = ctx;

    if (Component.getInitialProps) {
      props = await Component.getInitialProps(ctx);
    }

    return { ...props, query };
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      hotjar.initialize(process.env.REACT_APP_HOTJAR_ID, 6);
    }
  }

  render() {
    const { Component, query, ...props } = this.props;

    return (
      <Container>
        <QueryProvider value={query}>
          <Component {...props} />
        </QueryProvider>
      </Container>
    );
  }
}

export default withGA(process.env.REACT_APP_GA_TOKEN, Router, {
  localhost: 'disable',
})(NightGuideWebsite);
