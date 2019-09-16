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
      <div className="header-image">
        <HeaderImage
          baseHeight={'250px'}
          imageSrc="https://lh3.googleusercontent.com/CIX4yMmVDYZ7W_9wmSSPfDDr2SAm-lG3pzmoCo2zJ_qiFyqpXiABfmGIbDlfheYdM-3_JtpHR_5ji83c1PezG4UnROituqN-zw"
        >
          <div className="header">
            <div className="content">
              <h1 className="title">{__('AffiliatePage.title')}</h1>
              <span className="subtitle">{__('AffiliatePage.subtitle')}</span>
              <div className="button">
                <PrimaryButton
                  href="mailto:affiliate@nightguide.app"
                  title={__('AffiliatePage.joinProgram')}
                />
              </div>
            </div>
          </div>
        </HeaderImage>
      </div>
      <section className="why">
        <section>
          <h2>Drive traffic to your website</h2>
          <p>
            Increase your reach by partnering with us and connecting with your
            largest audience yet. A partnership with us means direct access to
            an ever-increasing crowd of global event-goers.
          </p>
        </section>
        <section>
          <h2>Attract high quality leads</h2>
          <p>
            Traditional online channels connect you with users that may not be
            interested in your offer - wasting your time and money. We match our
            users to their ideal event, meaning they are ready to buy once we
            send them through.
          </p>
        </section>
        <section>
          <h2>Increase profitability</h2>
          <p>
            Lower your marketing costs by investing in channels that make sense
            for you. NightGuide offers the best return on investment when it
            comes to attracting new customers to your website.
          </p>
        </section>
      </section>
      <section className="how">
        <header className="title">
          <h2>Find out what works for you</h2>
          <span className="subtitle">
            Every location and event is unique - so are our packages as well
          </span>
        </header>
        <div className="content">
          <div className="img">
            <ResponsiveImage
              url="https://lh3.googleusercontent.com/RN9yhWbXfEBhEnGgdu2VC4FNKN1vu_WxnOMxSw7WvcXC_VvrMRPNtIetjZAC4JEtimIsSlodiZdMONW7ib0N2QgTXpyzKOOs"
              widths={[450, 900, 2000]}
            />
          </div>
          <div className="sections">
            <section>
              <strong>Grow together</strong>
              <p>
                Customers that have a good experience both with us and our
                partners keep coming back. You will not only get new customers
                you will create loyal ones as well.
              </p>
            </section>
            <section>
              <strong>No cure, no pay</strong>
              <p>
                Pay only for what we deliver, if no traffic comes your way you
                don't owe us anything.
              </p>
            </section>
            <section>
              <strong>Every partner is different</strong>
              <p>
                We believe in personalized and tailor-made offers. No
                one-size-fits-all model, we will build something together that
                fits your needs.
              </p>
            </section>
          </div>
        </div>
      </section>
      <section className="next">
        <h2>Partner with NightGuide</h2>
        <div className="sections">
          <section>
            <strong>Start today</strong>
            <p>
              If you are looking to increase traffic, boost sales and drive
              awareness in our industry, then the NightGuide Partnership program
              is for you.
            </p>
          </section>
          <section>
            <strong>How it works</strong>
            <p>
              Click the button below to get in-touch with us. Our sales team
              will reach out within 2 business days.
            </p>
          </section>
          <section>
            <strong>Why NightGuide</strong>
            <p>
              Our users trust us due to the value we provide to them, that same
              relationship is what we want to build with our partners as well.
            </p>
          </section>
        </div>
        <footer className="cta">
          <span>Become an affiliate</span>
          <PrimaryButton
            href="mailto:affiliate@nightguide.app"
            title={__('AffiliatePage.joinProgram')}
          />
        </footer>
      </section>
      {/*language=CSS*/}
      <style jsx>{`
        .header-image {
          margin: 0 -${dimensions.bodyPadding};
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .header .title {
          font-size: 2em;
          line-height: 1em;
          margin-bottom: 1em;
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
          .header .title {
            font-size: 2.8em;
            margin-bottom: 0.5em;
          }
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
