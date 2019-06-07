import Link from 'next/link';

import colors from '../styles/colors';

function Footer() {
  return (
    <footer className={'container'}>
      <section>
        <span className={'company-name'}>NightGuide</span>
        <br />
        Utrecht, The Netherlands
        <br />
        <a className={'mailto'} href={'mailto:contact@nightguide.app'}>
          contact@nightguide.app
        </a>
        <ul className={'links'}>
          <li>
            <Link as="/privacy-policy" href="/privacyPolicy">
              <a>Privacy policy</a>
            </Link>
          </li>
        </ul>
      </section>
      <footer className={'bottom'}>
        <div className={'app-buttons'}>
          <a
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
          margin-top: 2em;
        }
        .copyright {
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
        .links {
          padding: 0;
        }
        .links li {
          list-style: none;
          margin: 0;
        }
        .links a {
          color: ${colors.textSecondary};
          text-decoration: none;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
