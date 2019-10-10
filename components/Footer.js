import { Link } from '../routes';
import colors from '../styles/colors';
import __ from '../lib/i18n';

const LINK_SECTIONS = [
  {
    title: __('Footer.cities'),
    items: [
      // { route: '/nl/amsterdam', title: 'Amsterdam' },
      { route: '/es/ibiza', title: 'Ibiza' },
      // { route: '/nl/utrecht', title: 'Utrecht' },
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
    title: __('Footer.services'),
    items: [
      {
        route: 'help-center',
        title: __('Footer.helpCenter'),
      },
      {
        route: 'privacy-policy',
        title: __('Footer.privacyPolicy'),
        linkAttrs: { rel: 'nofollow' },
      },
    ],
  },
  {
    title: __('Footer.followUs'),
    items: [
      {
        href: 'https://www.linkedin.com/company/nightguideapp',
        title: __('Footer.linkedin'),
        linkAttrs: { rel: 'noreferrer nofollow', target: '_blank' },
      },
      {
        href: 'https://www.facebook.com/nightguide.nl',
        title: __('Footer.facebook'),
        linkAttrs: { rel: 'noreferrer nofollow', target: '_blank' },
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
              {items.map(({ title, linkAttrs = {}, ...linkProps }) => (
                <li>
                  <Link {...linkProps}>
                    <a {...linkAttrs}>{title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
      <aside className={'branding'}>
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
      </aside>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          font-size: 0.9em;
          padding: 3em 0;
          display: grid;
        }
        .branding {
          display: flex;
          flex-direction: column;
        }
        .copyright {
          font-size: 0.75em;
          color: ${colors.textSecondary};
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
          display: grid;
          grid-template-columns: 1fr 1fr;
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
          margin-bottom: 0.5em;
          display: block;
        }
        .sections a {
          color: ${colors.textSecondary};
          text-decoration: none;
          display: block;
          padding: 0.2em 0;
        }
        @media (max-width: 800px) {
          .container {
            padding: 3em 0 1em;
          }
          .copyright {
            background: url(/static/img/logo.svg) no-repeat center center;
            background-size: 10em;
            margin-top: 1em;
            padding-top: 11em;
            width: 100%;
            text-align: center;
          }
        }
        @media (min-width: 800px) {
          .container {
            grid-template-columns: 2fr 5fr;
            grid-template-areas: 'branding links';
          }
          .branding {
            background: url(/static/img/logo.svg) no-repeat left top 2em;
            background-size: 7em;
            padding: 7em 5em 0 0;
            grid-area: branding;
          }
          .sections {
            font-size: 1em;
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
