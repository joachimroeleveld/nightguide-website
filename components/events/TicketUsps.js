import __ from '../../lib/i18n';

export default function TicketUsps(props) {
  return (
    <ul className="usps">
      <li>
        <span>{__('EventPage.instantConfirmation')}</span>
      </li>
      <div className="separator" />
      <li>
        <span>{__('EventPage.officialPartner')}</span>
      </li>
      <div className="separator" />
      <li>
        <span>{__('EventPage.secureCheckout')}</span>
      </li>
      {/*language=CSS*/}
      <style jsx>{`
        .usps {
          font-size: 0.9em;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .usps li {
          display: flex;
          align-items: center;
          opacity: 0.4;
          margin: 0.2em 0;
        }
        .usps span {
          display: inline-block;
          background: no-repeat left center;
          padding-left: 2em;
        }
        .usps li:nth-of-type(1) span {
          background-image: url(/static/img/event-usps-instant-confirm.svg);
          background-position-x: 2px;
        }
        .usps li:nth-of-type(2) span {
          background-image: url(/static/img/event-usps-partner.svg);
        }
        .usps li:nth-of-type(3) span {
          background-image: url(/static/img/event-usps-secure.svg);
        }
      `}</style>
    </ul>
  );
}
