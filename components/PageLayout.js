import Head from 'next/head';

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

const withPageLayout = ({
  getBreadcrumbs,
  meta = {},
  hideBreadcrumbs,
  HeaderComponent,
  headerImage,
  title,
  subtitle,
} = {}) => Page => {
  function PageLayout(props) {
    const { currentUrl, pageSlug } = props;

    let breadcrumbs = props.breadcrumbs || [];

    if (getBreadcrumbs) {
      const pageBreadcrumbs = getBreadcrumbs(props);
      breadcrumbs = breadcrumbs.concat(pageBreadcrumbs);
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

          <header className="header">
            {!!headerImage && (
              <div className="image">
                <HeaderImage imageSrc={headerImage} />
              </div>
            )}
            {(title || subtitle) && (
              <div className="content">
                {!!title && <h1 className="title">{title}</h1>}
                {!!subtitle && <span className="subtitle">{subtitle}</span>}
              </div>
            )}
          </header>

          <div className="page">
            {!hideBreadcrumbs && getBreadcrumbs && (
              <Breadcrumbs items={breadcrumbs} />
            )}
            <Page {...props} />
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
            .page {
              max-width: ${dimensions.pageWidth};
              padding: 0 ${dimensions.bodyPadding};
              margin: auto;
            }
            .header .content {
              padding: 0 ${dimensions.bodyPadding};
            }
            .title {
              margin: 0;
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
            @media (min-width: 800px) {
              .header .content {
                position: relative;
                margin: -6.5em auto 0;
                max-width: ${dimensions.pageWidth};
              }
              .subtitle {
                margin-top: 0.8em;
              }
              .title {
                margin: 0;
                font-size: 3.75em;
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

  PageLayout.getInitialProps = Page.getInitialProps;

  return withNavigation(PageLayout);
};

export default withPageLayout;
