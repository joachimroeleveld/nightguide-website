import React from 'react';
import ResponsiveImage from '../components/ResponsiveImage';
import PrimaryButton from '../components/PrimaryButton';
import withPageLayout from '../components/PageLayout';
import dimensions from '../styles/dimensions';
import colors from '../styles/colors';
import { useScrollToId } from '../lib/hooks';

function CompanyPage(props) {
  const { query } = props;
  const { s } = query;

  useScrollToId(s);

  return (
    <main>
      <header className="header">
        <h1>NightGuide</h1>
        <div className="content">
          <p>
            NightGuide's aim is to create a one-stop shop for exploring
            nightlife and booking events, solving the problem of using multiple
            sources to discover where to go out and buy.
          </p>
          <p>
            NightGuide is a startup operating in the entertainment industry. We
            create content that allows tourists and locals to discover nightlife
            in the cities we operate in.
          </p>
          <p>
            With an undivided focus on nightlife, our website aims to provide
            visitors with a comprehensive answer to the question where to go to
            out.
          </p>
        </div>
      </header>

      <section className="contact" id="contact">
        <h2>Getting in touch</h2>
        <div className="sections">
          <section>
            <strong>Affiliate</strong>
            <p>
              For affiliate partnerships contact:
              <br />
              <a href="mailto:affiliate@nightguide.app">
                affiliate@nightguide.app
              </a>
            </p>
          </section>
          <section>
            <strong>Content</strong>
            <p>
              For content inquiries contact:
              <br />
              <a href="mailto:content@nightguide.app">content@nightguide.app</a>
            </p>
          </section>
          <section>
            <strong>Other</strong>
            <p>
              For other inquiries contact:
              <br />
              <a href="mailto:contact@nightguide.app">contact@nightguide.app</a>
            </p>
          </section>
        </div>
      </section>

      <section className="office">
        <h2>Our office</h2>
        <span className="subtitle">Find us in Amsterdam, The Netherlands</span>
        <div className="content">
          <div className="img">
            <ResponsiveImage
              url="https://lh3.googleusercontent.com/LP_Vl_cX8wWfjecby_nvu2ZeHc53iklWgc6xjmkYXjrTmIkm57JJMHrH7e9hWXo-xU9_Z5_mUb8jzmcNKdyJzN8MXvhJc0yA6w"
              widths={[450, 900]}
            />
          </div>
          <div className="sections">
            <strong>Address</strong>
            <br />
            Willemsparkweg 89
            <br />
            1071 GT Amsterdam
            <br />
            The Netherlands
            <br />
            <br />
            <a
              href="https://www.google.com/maps/dir//nightguide/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x47c60957b5dcb1d9:0x2ebe432e4e10df2f?sa=X&ved=2ahUKEwjyzqXfwPPjAhVDr6QKHXNhCekQ9RcwFHoECA0QDg"
              target="_blank"
            >
              Google Maps
            </a>
          </div>
        </div>
      </section>

      <section className="careers" id="careers">
        <h2>Careers</h2>
        <div className="content">
          <span className="text">Looking for a job at NightGuide?</span>
          <PrimaryButton
            title="Apply now"
            href="mailto:careers@nightguide.app"
          />
        </div>
      </section>

      {/*language=CSS*/}
      <style jsx>{`
        h2 {
          text-align: center;
          font-size: 1.5em;
        }
        .header {
          margin: 0 -${dimensions.bodyPadding};
          padding: 2em ${dimensions.bodyPadding};
          background: #fff;
          color: ${colors.textDark};
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .header p {
          margin: 0;
        }
        .header .content {
          display: grid;
          grid-gap: 1em;
          margin: 1em 0;
          max-width: 90%;
        }

        .header p:first-of-type {
          font-weight: 600;
        }
        h1 {
          margin: 0;
          font-size: 2.5em;
          font-weight: 700;
          text-align: center;
        }
        main a {
          color: ${colors.linkText};
        }
        .contact h2 {
          margin-bottom: 1.25em;
        }
        .contact p {
          margin: 0.1em 0;
        }
        .contact strong {
          font-weight: 600;
        }
        .contact .sections {
          display: grid;
          grid-gap: 1em;
        }
        .careers .content .text {
          display: block;
          margin-bottom: 1.5em;
        }
        .office {
          background: ${colors.bgDarkContrast};
          padding: 2em ${dimensions.bodyPadding} 4em;
          margin: 0 -${dimensions.bodyPadding};
        }
        .office .subtitle {
          color: ${colors.textSecondary};
          display: block;
          text-align: center;
          margin-bottom: 2em;
        }
        .office h2 {
          margin: 0;
        }
        .contact,
        .office,
        .careers {
          margin-top: 3em;
        }
        @media (max-width: 800px) {
          .office .img {
            margin: 0 -${dimensions.bodyPadding} 2em;
          }
          .office .content {
            margin-top: 2.5em;
          }
        }
        @media (min-width: 800px) {
          h1 {
            font-size: 3.75em;
          }
          h2 {
            font-size: 1.7em;
          }
          .header .content {
            display: grid;
            font-size: 1.125em;
            grid-template-columns: 50% 50%;
            max-width: 70%;
          }
          .header p:first-of-type {
            grid-area: 1 / 1 / 2 / 3;
          }
          .contact .sections {
            grid-template-columns: repeat(3, 1fr);
            font-size: 1.125em;
            grid-gap: 4em;
          }
          .contact .sections strong {
            display: block;
            margin-bottom: 0.3em;
          }
          .careers .content {
            display: flex;
            align-items: center;
            flex-direction: column;
          }
          .office {
            margin-top: 4em;
          }
          .office .content {
            display: grid;
            grid-gap: 1em;
            grid-template-columns: 55% calc(45% - 1em);
            align-items: center;
          }
          .office .img {
            position: relative;
            left: -${dimensions.bodyPadding};
          }
          .office .subtitle {
            margin-bottom: 3em;
          }
          .careers :global(.button) {
            padding: 0.5em 4em;
          }
        }
      `}</style>
    </main>
  );
}

export default withPageLayout()(CompanyPage);
