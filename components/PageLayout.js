import Head from 'next/head';
import isFunction from 'lodash/isFunction';

import Fonts from '../components/Fonts';
import PageLoader from '../components/PageLoader';
import TimezoneManager from '../components/TimezoneManager';
import Header from './Header';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';
import dimensions from '../styles/dimensions';
import { withNavigation } from './Navigation';
import Breadcrumbs from './Breadcrumbs';
import React, { Fragment } from 'react';
import HeaderImage from './HeaderImage';
import colors from '../styles/colors';
import { classNames } from '../lib/util';

const withPageLayout = (opts = {}) => Component => {
  function PageLayout(props) {
    const { currentUrl, pageSlug } = props;

    // Check opts for functions and call them with props if so
    let {
      title,
      subtitle,
      headerImage,
      meta = {},
      HeaderComponent,
      breadcrumbs,
      pageWidth = dimensions.pageWidth,
    } = [
      'title',
      'subtitle',
      'headerImage',
      'meta',
      'HeaderComponent',
      'breadcrumbs',
      'pageWidth',
    ].reduce((acc, optKey) => {
      return {
        ...acc,
        [optKey]: isFunction(opts[optKey]) ? opts[optKey](props) : opts[optKey],
      };
    }, {});

    if (breadcrumbs) {
      breadcrumbs = props.breadcrumbs.concat(breadcrumbs);
    }

    HeaderComponent = HeaderComponent === undefined ? Header : HeaderComponent;

    return (
      <Fragment>
        <Fonts />
        <TimezoneManager />
        <div className={'page-container'}>
          <Head>
            <link rel="canonical" href={meta.canonical || currentUrl} />
            <link rel="alternate" href={currentUrl} hrefLang="x-default" />
          </Head>

          {HeaderComponent && <HeaderComponent {...props} />}

          <header
            className={classNames(['header', !!headerImage && 'has-image'])}
          >
            {breadcrumbs && (
              <div className="breadcrumbs">
                <Breadcrumbs items={breadcrumbs} />
              </div>
            )}

            {!!headerImage && (
              <div className="image">
                <HeaderImage imageSrc={headerImage} />
              </div>
            )}

            {!!title && (
              <div className="title">
                {!!title && <h1>{title}</h1>}
                {!!subtitle && <span className="subtitle">{subtitle}</span>}
              </div>
            )}
          </header>

          <div className="page">
            <Component {...props} />
          </div>

          <div className="footer">
            <div className="contents">
              <Footer pageSlug={pageSlug} />
            </div>
          </div>

          <PageLoader />

          <GlobalStyles />
          {/*language=CSS*/}
          <style jsx>{`
            .title,
            .breadcrumbs {
              padding: 0 ${dimensions.bodyPadding};
            }
            .breadcrumbs {
              margin-top: 0.5em;
            }
            .breadcrumbs,
            .title,
            .page {
              max-width: ${pageWidth};
              margin-left: auto;
              margin-right: auto;
            }
            .page {
              padding: 0 ${dimensions.bodyPadding};
            }
            h1 {
              margin: 0;
            }
            .title {
              margin-top: 1.5em;
              margin-bottom: 1.5em;
            }
            .subtitle {
              display: block;
              color: ${colors.textSecondary};
            }
            .footer {
              margin-top: 6em;
              border-top: 1px solid #343434;
            }
            .footer .contents {
              max-width: ${dimensions.pageWidth};
              margin: auto;
              padding: 0rem ${dimensions.bodyPadding} ${dimensions.bodyPadding};
            }
            @media (max-width: 800px) {
              .breadcrumbs {
                margin-bottom: 1.7em;
              }
              .subtitle {
                margin-top: 0.3em;
              }
            }
            @media (min-width: 800px) {
              .menu {
                margin: 2em 0 1.5em;
              }
              .header.has-image .title {
                position: relative;
                margin: -6.5em auto 0;
                max-width: ${dimensions.pageWidth};
              }
              .has-image .subtitle {
                margin-top: 1.4em;
              }
              .has-image h1 {
                margin: 0;
                font-size: 3.75em;
              }
              .title {
                margin-top: 2em;
                margin-bottom: 2em;
              }
              .subtitle {
                font-size: 16px;
              }
            }
          `}</style>
        </div>
      </Fragment>
    );
  }

  PageLayout.getInitialProps = Component.getInitialProps;

  return withNavigation(PageLayout);
};

export default withPageLayout;
