import withPageLayout from '../components/PageLayout';
import PrimaryButton from '../components/PrimaryButton';
import __ from '../lib/i18n';
import HeaderImage from '../components/HeaderImage';
import dimensions from '../styles/dimensions';
import colors from '../styles/colors';
import ResponsiveImage from '../components/ResponsiveImage';

function AffiliatePage(props) {
  return (
    <main>
      <HeaderImage
        baseHeight={'250px'}
        imageSrc="https://lh3.googleusercontent.com/CIX4yMmVDYZ7W_9wmSSPfDDr2SAm-lG3pzmoCo2zJ_qiFyqpXiABfmGIbDlfheYdM-3_JtpHR_5ji83c1PezG4UnROituqN-zw"
      >
        <div className="header">
          <div className="content">
            <h1>{__('AffiliatePage.title')}</h1>
            <span className="subtitle">{__('AffiliatePage.subtitle')}</span>
            <div className="button">
              <PrimaryButton title={__('AffiliatePage.joinProgram')} />
            </div>
          </div>
        </div>
      </HeaderImage>
      <section className="why">
        <section>
          <h2>Drive traffic to your website</h2>
          <p>
            Eget suscipit lobortis vestibulum posuere rutrum semper urna
            vehicula ac egestas ipsum montes a dis dapibus tempor cubilia nulla
            feugiat
          </p>
        </section>
        <section>
          <h2>Attract high quality leads</h2>
          <p>
            Eget suscipit lobortis vestibulum posuere rutrum semper urna
            vehicula ac egestas ipsum montes a dis dapibus tempor cubilia nulla
            feugiat
          </p>
        </section>
        <section>
          <h2>Increase profitability</h2>
          <p>
            Eget suscipit lobortis vestibulum posuere rutrum semper urna
            vehicula ac egestas ipsum montes a dis dapibus tempor cubilia nulla
            feugiat
          </p>
        </section>
      </section>
      <section className="how">
        <header className="title">
          <h2>Find out what works for you</h2>
          <span className="subtitle">
            With our packages every situation has a solution
          </span>
        </header>
        <div className="content">
          <div className="img">
            <ResponsiveImage
              url="https://lh3.googleusercontent.com/RN9yhWbXfEBhEnGgdu2VC4FNKN1vu_WxnOMxSw7WvcXC_VvrMRPNtIetjZAC4JEtimIsSlodiZdMONW7ib0N2QgTXpyzKOOs"
              widths={[450, 900]}
            />
          </div>
          <div className="sections">
            <section>
              <strong>Commissions</strong>
              <p>
                Eget suscipit lobortis vestibulum posuere rutrum semper urna
                vehicula ac egestas ipsum montes a dis dapibus tempor cubilia
                nulla feugiat
              </p>
            </section>
            <section>
              <strong>Revenue share</strong>
              <p>
                Eget suscipit lobortis vestibulum posuere rutrum semper urna
                vehicula ac egestas ipsum montes a dis dapibus tempor cubilia
                nulla feugiat
              </p>
            </section>
            <section>
              <strong>Commissions</strong>
              <p>
                Eget suscipit lobortis vestibulum posuere rutrum semper urna
                vehicula ac egestas ipsum montes a dis dapibus tempor cubilia
                nulla feugiat
              </p>
            </section>
          </div>
        </div>
      </section>
      <section className="next">
        <h2>Partner with NightGuide</h2>
        <div className="sections">
          <section>
            <strong>Get started</strong>
            <p>
              Eget suscipit lobortis vestibulum posuere rutrum semper urna
              vehicula ac
            </p>
          </section>
          <section>
            <strong>Next steps</strong>
            <p>
              Eget suscipit lobortis vestibulum posuere rutrum semper urna
              vehicula ac
            </p>
          </section>
          <section>
            <strong>Why NightGuide</strong>
            <p>
              Eget suscipit lobortis vestibulum posuere rutrum semper urna
              vehicula ac
            </p>
          </section>
        </div>
        <footer className="cta">
          <span>Become an affiliate</span>
          <PrimaryButton title={__('AffiliatePage.joinProgram')} />
        </footer>
      </section>
      {/*language=CSS*/}
      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .header .title {
          padding-bottom: 3em;
          position: relative;
          z-index: 1;
        }
        .header:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.74) 0%,
            rgba(0, 0, 0, 0.59) 100%
          );
        }
        .header .content {
          position: relative;
          text-align: center;
          padding: 0 ${dimensions.bodyPadding};
          max-width: 33em;
        }
        h1 {
          margin: 0.1em 0;
        }
        .header .subtitle {
          display: block;
        }
        .header .button {
          margin-top: 2em;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .header .button :global(.button) {
          padding: 0.5em 3em;
        }
        .why {
          display: grid;
          grid-gap: 1em;
          margin: 3em 0;
        }
        .why h2 {
          font-size: 1.25em;
          margin: 0em 0 1em;
          text-align: center;
        }
        .why section {
          background: ${colors.cardBg};
          box-shadow: ${colors.cardShadow};
          padding: ${dimensions.cardPadding};
        }
        .how {
          background: ${colors.bgDarkContrast};
          padding: 2em ${dimensions.bodyPadding} 4em;
          margin: 0 -${dimensions.bodyPadding};
        }
        .how .content {
          display: grid;
          grid-gap: 1em;
        }
        .how .sections {
          display: grid;
          grid-gap: 1.5em;
        }
        .how p,
        .next p {
          margin: 0.2em 0;
        }
        .how .title {
          text-align: center;
        }
        .how h2 {
          margin: 0;
        }
        .how .subtitle {
          color: ${colors.textSecondary};
          display: block;
          margin-bottom: 2em;
        }
        .next h2 {
          margin: 2em 0 1em;
          text-align: center;
        }
        .next .sections {
          display: grid;
          grid-gap: 1.5em;
        }
        .next .cta {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 3em;
        }
        .next .cta span {
          color: ${colors.textSecondary};
          display: block;
          margin-right: 1em;
          font-weight: 600;
        }
        .next h2,
        .how h2 {
          font-size: 1.5em;
        }
        @media (max-width: 800px) {
          .how .img {
            margin: 0 -${dimensions.bodyPadding} 2em;
          }
        }
        @media (min-width: 800px) {
          .header .subtitle {
            font-size: 1.25em;
          }
          .why {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 3em;
            margin: 4em 0;
          }
          .why h2 {
            margin: 0.5em 0 1.25em;
          }
          .how .content {
            grid-template-columns: repeat(2, calc(50% - 0.5em));
          }
          .how .img {
            position: relative;
            left: -${dimensions.bodyPadding};
          }
          .how .subtitle {
            margin-bottom: 3em;
          }
          .how .sections {
            display: grid;
            grid-gap: 1.5em;
            grid-template-columns: repeat(2, calc(50% - 1em));
          }
          .next .sections {
            grid-template-columns: repeat(3, 1fr);
          }
          .next h2,
          .how h2 {
            font-size: 1.7em;
          }
        }
      `}</style>
    </main>
  );
}

export default withPageLayout()(AffiliatePage);
