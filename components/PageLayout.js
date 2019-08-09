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
import { Fragment } from 'react';

const withPageLayout = ({
  getBreadcrumbs,
  meta = {},
  hideBreadcrumbs,
  HeaderComponent,
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
            .footer {
              margin-top: 6em;
              border-top: 1px solid #343434;
            }
            .footer .contents {
              max-width: 56rem;
              margin: auto;
              padding: 0rem 2rem 2em;
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
