import { withRouter } from 'next/router';
import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';
import dimensions from '../styles/dimensions';
import { withNavigation } from './Navigation';
import Breadcrumbs from './Breadcrumbs';

const withPageLayout = (getBreadcrumbs, meta = {}) => Page => {
  function PageLayout(props) {
    const { router } = props;
    let breadcrumbs = props.breadcrumbs || [];

    if (getBreadcrumbs) {
      const pageBreadcrumbs = getBreadcrumbs(props);
      breadcrumbs = breadcrumbs.concat(pageBreadcrumbs);
    }

    const url = `${process.env.REACT_APP_HOST}${router.asPath.split('?')[0]}`;

    return (
      <div className={'page-container'}>
        <Head>
          <link rel="canonical" href={meta.canonical || url} />
          <link rel="alternate" href={url} hrefLang="x-default" />
        </Head>
        <Header />
        <div className="page">
          {getBreadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <Page {...props} />
        </div>
        <div className="footer">
          <div className="contents">
            <Footer />
          </div>
        </div>
        <GlobalStyles />
        {/*language=CSS*/}
        <style jsx>{`
          .page {
            max-width: 56rem;
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
    );
  }

  PageLayout.getInitialProps = Page.getInitialProps;

  return withRouter(withNavigation(PageLayout));
};

export default withPageLayout;
