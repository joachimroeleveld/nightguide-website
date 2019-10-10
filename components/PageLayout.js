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
import { classNames } from '../lib/util';

const withPageLayout = (opts = {}) => Component => {
  function PageLayout(props) {
    const { currentUrl, pageSlug } = props;
    let { TitleComponent, HeaderComponent } = opts;

    // Check opts for functions and call them with props if so
    let {
      headerImage,
      meta = {},
      breadcrumbs,
      pageWidth = dimensions.pageWidth,
    } = [
      'title',
      'subtitle',
      'headerImage',
      'meta',
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

            {TitleComponent && <TitleComponent {...props} />}
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
            .breadcrumbs {
              padding: 0 ${dimensions.bodyPadding};
              margin: 0.5em 0;
            }
            .breadcrumbs,
            .page {
              max-width: ${pageWidth};
              margin-left: auto;
              margin-right: auto;
            }
            .page {
              padding: 0 ${dimensions.bodyPadding};
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
          `}</style>
        </div>
      </Fragment>
    );
  }

  PageLayout.getInitialProps = Component.getInitialProps;

  return withNavigation(PageLayout);
};

export default withPageLayout;
