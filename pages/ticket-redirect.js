import { useEffect } from 'react';

import withPageLayout from '../components/PageLayout';
import { getEvent } from '../lib/api';
import __ from '../lib/i18n';
import { formatEventDate } from '../lib/dates';
import Card from '../components/Card';

function TicketRedirectPage(props) {
  const { event, dateIndex } = props;
  const { title, facebook = {}, dates, tickets } = event;
  const date = dates[dateIndex];

  useEffect(() => {
    setTimeout(() => {
      window.location.href = tickets.checkoutUrl;
    }, 3000);
  }, []);

  return (
    <main className="container">
      <h1>{__('ticketRedirectPage.thanksAlmostThere')}</h1>
      <div className="redirect-notice">
        <span className="notice">
          {__('ticketRedirectPage.youreRedirected')}
          <br />
          <a href={tickets.checkoutUrl}>{tickets.checkoutUrl.split('?')[0]}</a>
        </span>
        <div className="loading-container">
          <div className="loading">
            {[1, 2, 3].map(i => (
              <svg className={`loading-${i}`} key={i}>
                <path d="M54.2335484,36.0294117 L2.78193548,0.314259431 C2.23725806,-0.0625354254 1.53112903,-0.101822093 0.949193548,0.203542459 C0.365483871,0.512478525 0,1.11963611 0,1.78393794 L0,73.2142424 C0,73.8785442 0.365483871,74.4874876 0.949193548,74.7964236 C1.20822581,74.9321412 1.49209677,75 1.77419355,75 C2.12725806,75 2.47854839,74.8928545 2.78193548,74.6839209 L54.2335484,38.9687687 C54.7143548,38.634832 55,38.0866044 55,37.4990902 C55,36.9115759 54.7125806,36.3633483 54.2335484,36.0294117 Z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <div className="ticket">
        <Card>
          <div className="ticket-inner">
            <strong className="title">{facebook.title || title}</strong>
            <span className="date">{formatEventDate(date.from, date.to)}</span>
          </div>
        </Card>
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          padding: 2em 0;
        }
        .redirect-notice {
          font-size: 1.1em;
          display: grid;
          align-items: center;
        }
        .loading-container {
          display: flex;
          margin-top: 2em;
          justify-content: center;
        }
        .redirect-notice a {
          text-decoration: underline;
        }
        .ticket {
          margin-top: 2em;
        }
        .ticket-inner {
          padding-left: 5em;
          background: url(/static/img/ticket.svg) no-repeat left center;
        }
        .ticket .title {
          display: block;
        }
        .loading {
          width: 12em;
          height: 5em;
          display: flex;
        }
        .loading svg {
          fill: #2f2f2f;
          animation: fade 1s infinite;
        }
        .loading-2 {
          animation-delay: 0.33s !important;
        }
        .loading-3 {
          animation-delay: 0.66s !important;
        }
        @media (min-width: 700px) {
          .container {
            margin-top: 10vh;
            margin-bottom: 30vh;
          }
          .redirect-notice {
            grid-template-columns: 1fr 1fr;
          }
        }
        @keyframes fade {
          0% {
            fill: #2f2f2f;
          }
          33% {
            fill: #bababa;
          }
          66% {
            fill: #2f2f2f;
          }
          100% {
            fill: #2f2f2f;
          }
        }
      `}</style>
    </main>
  );
}

TicketRedirectPage.getInitialProps = async ctx => {
  const { dateIndex, event } = ctx.query;
  return {
    dateIndex: parseInt(dateIndex),
    event: await getEvent(event),
  };
};

export default withPageLayout()(TicketRedirectPage);
