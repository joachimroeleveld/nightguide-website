import { Link } from '../routes';
import colors from '../styles/colors';
import __ from '../lib/i18n';

const LINK_SECTIONS = [
  {
    title: __('Footer.cities'),
    items: [
      { route: '/es/ibiza', title: 'Ibiza' },
      { route: '/nl/utrecht', title: 'Utrecht' },
    ],
  },
  {
    title: __('Footer.company'),
    items: [
      { route: 'company', title: __('Footer.about') },
      { route: 'affiliate', title: __('Footer.affiliate') },
      {
        route: 'company',
        title: __('Footer.contact'),
        params: { s: 'contact' },
      },
      {
        route: 'company',
        title: __('Footer.careers'),
        params: { s: 'careers' },
      },
    ],
  },
  {
    title: __('Footer.legal'),
    items: [{ route: 'privacy-policy', title: __('Footer.privacyPolicy') }],
  },
  {
    title: __('Footer.followUs'),
    items: [
      {
        href: 'https://www.linkedin.com/company/nightguideapp',
        title: __('Footer.linkedin'),
        target: '_blank',
      },
      {
        href: 'https://www.facebook.com/nightguide.nl',
        title: __('Footer.facebook'),
        target: '_blank',
      },
    ],
  },
];

function Footer(props) {
  const { pageSlug } = props;

  return (
    <footer className={'container'}>
      <nav className="sections">
        {LINK_SECTIONS.map(({ title, items }, index) => (
          <section key={index}>
            <strong>{title}</strong>
            <ul>
              {items.map(({ title, target, ...linkProps }) => (
                <li>
                  <Link {...linkProps}>
                    <a {...{ target }}>{title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
      <footer className={'bottom'}>
        {pageSlug === 'nl/utrecht' && (
          <div className={'app-buttons'}>
            <a
              rel="noreferrer"
              target={'_blank'}
              href={
                'https://itunes.apple.com/us/app/nightguide/id1453033103?l=nl&ls=1&mt=8'
              }
            >
              <img
                src="/static/img/app-store-button.png"
                srcSet="/static/img/app-store-button@2x.png 2x, /static/img/app-store-button@3x.png 3x"
                alt="Download button for iOS"
              />
            </a>
            <a
              rel="noreferrer"
              target={'_blank'}
              href={
                'http://play.google.com/store/apps/details?id=app.nightguide.app1'
              }
            >
              <img
                src="/static/img/play-store-button.png"
                srcSet="/static/img/play-store-button@2x.png 2x, /static/img/play-store-button@3x.png 3x"
                alt="Download button for Android"
              />
            </a>
          </div>
        )}
        <span className="copyright">
          &copy; NightGuide 2019. All rights reserved.
        </span>
      </footer>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          font-size: 0.9375em;
          padding: 3em 0 1em;
        }
        .bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 3em;
        }
        .copyright {
          text-align: center;
          font-size: 0.75em;
        }
        .app-buttons {
          display: flex;
          margin: 1em 0;
        }
        .app-buttons img {
          margin: 0 0.25em;
        }
        .company-name {
          font-weight: 700;
        }
        .mailto {
          text-decoration: none;
        }
        .sections {
          font-size: 0.85em;
          display: grid;
          grid-template-columns: 50% 50%;
          grid-gap: 2em;
        }
        .sections {
          margin-top: 1em;
        }
        .sections li {
          list-style: none;
          margin: 0;
        }
        .sections strong {
          margin-bottom: 0.3em;
          display: block;
        }
        .sections a {
          color: ${colors.textSecondary};
          text-decoration: none;
          display: block;
          padding: 0.15em 0;
        }
        @media (min-width: 800px) {
          .sections {
            font-size: 1em;
            grid-template-columns: repeat(4, 25%);
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
