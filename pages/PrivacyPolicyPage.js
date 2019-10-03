import ReactMarkdown from 'react-markdown';
import Head from 'next/head';

import withPageLayout from '../components/PageLayout';
import { getContentBySlug } from '../lib/api';
import { _o } from '../lib/i18n';

function PrivacyPolicyPage(props) {
  const { page } = props;
  const { title, body } = page;
  return (
    <main>
      <Head>
        <title>Privacy Policy | NightGuide</title>
      </Head>
      <h1>{_o(title)}</h1>
      <ReactMarkdown source={_o(body)} />
    </main>
  );
}

PrivacyPolicyPage.getInitialProps = async () => ({
  page: await getContentBySlug('privacy-policy-and-cookie-statement'),
});

export default withPageLayout()(PrivacyPolicyPage);
