import Head from 'next/head';
import { useEffect } from 'react';

import withPageLayout from '../components/PageLayout';
import { getConfigByName } from '../lib/api';
import __, { _o } from '../lib/i18n';
import colors from '../styles/colors';
import { useToggleState } from '../lib/hooks';
import { classNames } from '../lib/util';
import dimensions from '../styles/dimensions';
import PrimaryButton from '../components/PrimaryButton';

function HelpCenterPage(props) {
  const { config } = props;
  const { sections } = config.payload;

  useEffect(() => {
    let dataScript = document.createElement('script');
    dataScript.setAttribute('id', 'zsiqscript-data');
    dataScript.type = 'text/javascript';
    dataScript.innerHTML = `var $zoho=$zoho || {};$zoho.salesiq = $zoho.salesiq || 
{widgetcode:"2ec8007b909bea50fdf290d463df875ae63a33a1b36c413de416285a6db6e780", values:{},ready:function(){document.getElementById('start-chat').classList.add('enabled')}};`;
    document.getElementsByTagName('head')[0].appendChild(dataScript);

    let loaderScript = document.createElement('script');
    loaderScript.setAttribute('id', 'zsiqscript');
    loaderScript.type = 'text/javascript';
    loaderScript.defer = true;
    loaderScript.src = 'https://salesiq.zoho.com/widget';
    document.getElementsByTagName('head')[0].appendChild(loaderScript);

    let elem = document.createElement('div');
    elem.setAttribute('id', 'zsiqwidget');
    document.body.appendChild(elem);

    return () => {
      document.getElementById('zsiqscript-data').remove();
      document.getElementById('zsiqscript').remove();
      document.getElementById('zsiqwidget').remove();
      if (document.getElementById('zsiqbtn')) {
        document.getElementById('zsiqbtn').remove();
      }
      if (document.querySelector('.siqembed')) {
        document.querySelector('.siqembed').remove();
      }
    };
  }, []);

  const showChat = () => {
    document.getElementById('zsiqbtn').click();
  };

  const HelpItem = props => {
    const { title, body } = props;

    const [expanded, toggleExpanded] = useToggleState(false);

    return (
      <li className={classNames([expanded && 'expanded'])}>
        <header onClick={toggleExpanded}>{title}</header>
        <div className="body">
          <p>{body}</p>
        </div>
        {/*language=CSS*/}
        <style jsx>{`
          header {
            color: ${colors.linkText};
            cursor: pointer;
          }
          .body {
            height: 0;
            overflow: hidden;
          }
          .body p {
            margin-top: 1em;
          }
          .expanded .body {
            height: auto;
          }
          p {
            margin: 0;
          }
        `}</style>
      </li>
    );
  };

  return (
    <main>
      <Head>
        <title>{__('HelpCenterPage.meta.title')}</title>
      </Head>
      <h1>{__('HelpCenterPage.title')}</h1>
      {sections.map(({ title, items }, index) => (
        <section key={index} className="section">
          <h2>{_o(title)}</h2>
          <ul>
            {items.map(({ title, body }, index) => (
              <div className="item">
                <HelpItem key={index} title={_o(title)} body={_o(body)} />
              </div>
            ))}
          </ul>
        </section>
      ))}
      <section className="contact">
        <h2>{__('HelpCenterPage.stillHelp')}</h2>
        <p>{__('HelpCenterPage.stillHelpDescription')}</p>
        <div className="button" id="start-chat">
          <PrimaryButton
            title={__('HelpCenterPage.startChat')}
            onClick={showChat}
          />
        </div>
        <p className="send-email">
          {__('HelpCenterPage.sendEmail')}{' '}
          <a href="mailto:servicedesk@nightguide.app">
            servicedesk@nightguide.app
          </a>
        </p>
      </section>
      {/*language=CSS*/}
      <style jsx>{`
        h1 {
          margin-top: 1.5em;
        }
        .section {
          margin: 2em 0;
          background: ${colors.cardBg};
        }
        .section h2 {
          padding: 0.8em ${dimensions.cardPadding};
          margin: 0;
        }
        .item {
          border-top: 1px solid ${colors.cardSeparator};
          padding: 1em ${dimensions.cardPadding};
        }
        .contact {
          border: 1px solid ${colors.separator};
          padding: 1em ${dimensions.cardPadding};
          border-radius: 3px;
        }
        .contact .button {
          max-width: 10em;
          opacity: 0.5;
        }
        .contact .button.enabled {
          opacity: 1;
        }
        .contact .send-email {
          margin-top: 2em;
        }
      `}</style>
    </main>
  );
}

HelpCenterPage.getInitialProps = async () => ({
  config: await getConfigByName('page_help_center'),
});

export default withPageLayout()(HelpCenterPage);
