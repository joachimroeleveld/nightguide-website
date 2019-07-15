import { Link } from '../routes';
import __ from '../lib/i18n';
import colors from '../styles/colors';

function SectionHeader(props) {
  const {
    title,
    TitleElem = 'h3',
    seeAllRoute,
    routeParams,
    seeAllText = __('seeAll'),
  } = props;
  return (
    <header className={'container'}>
      <TitleElem className={'title'}>{title}</TitleElem>
      <div className="separator" />
      {!!seeAllRoute && (
        <Link route={seeAllRoute} params={routeParams}>
          <a className={'expandLink'}>{seeAllText}</a>
        </Link>
      )}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 0.6em;
        }
        .separator {
          flex-grow: 1;
          margin-left: 2em;
          height: 1px;
          background: ${colors.separator};
        }
        .expandLink {
          text-decoration: none;
          margin-left: 2em;
          font-size: 17px;
          padding: 0.5em 1.5em 0.5em 0;
          background: no-repeat right center;
          background-image: url('/static/img/link-arrow.svg');
        }
      `}</style>
    </header>
  );
}

export default SectionHeader;
