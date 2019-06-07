import Link from 'next/link';

import __ from '../lib/i18n';
import colors from '../styles/colors';
import dimensions from '../styles/dimensions';

function SectionHeader(props) {
  const {
    title,
    TitleElem = 'h3',
    seeAllHref,
    seeAllText = __('seeAll'),
  } = props;
  return (
    <header className={'container'}>
      <TitleElem className={'title'}>{title}</TitleElem>
      <div className="separator" />
      {!!seeAllHref && (
        <Link href={seeAllHref}>
          <a className={'expandLink'}>{seeAllText}</a>
        </Link>
      )}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          position: relative;
          display: flex;
          align-items: center;
        }
        .container::before {
          content: '';
          width: 10px;
          height: 2.5em;
          background: ${colors.thickBorder};
          position: absolute;
          left: -${dimensions.bodyPadding};
        }
        .separator {
          flex-grow: 1;
          margin: 2em;
          height: 1px;
          background: ${colors.separator};
        }
        .expandLink {
          text-decoration: none;
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
