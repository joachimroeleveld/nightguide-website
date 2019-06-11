import Header from './Header';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';
import dimensions from '../styles/dimensions';

const withPageLayout = Page => {
  function PageLayout(props) {
    return (
      <div className={'page-container'}>
        <div className="header">
          <Header />
        </div>
        <div className="page">
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
          .header {
            padding: 1.5rem 2rem 0;
          }
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

  return PageLayout;
};

export default withPageLayout;
