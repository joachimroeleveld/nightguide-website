import React from 'react';
import { hotjar } from 'react-hotjar';
import App, { Container } from 'next/app';
import Router from 'next/router';
import withGA from 'next-ga';
import Modal from 'react-modal';
import TagManager from 'react-gtm';

// TODO: https://github.com/zeit/next-plugins/issues/282
import '../static/css/empty.css';

Modal.setAppElement('#__next');

class NightGuideWebsite extends App {
  static getInitialProps({ Component, ctx }) {
    if (Component.getInitialProps) {
      return Component.getInitialProps(ctx);
    }
    return {};
  }

  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      hotjar.initialize(process.env.REACT_APP_HOTJAR_ID, 6);

      TagManager.initialize({ id: process.env.REACT_APP_GTM_ID });
    }
  }

  render() {
    const { Component, ...props } = this.props;

    return (
      <Container>
        <Component {...props} />
      </Container>
    );
  }
}

export default withGA(process.env.REACT_APP_GA_TOKEN, Router, {
  localhost: 'disable',
})(NightGuideWebsite);
