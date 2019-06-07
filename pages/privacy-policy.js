import withPageLayout from '../components/PageLayout';
import { getGhostPageById } from '../lib/ghost';

function PrivacyPolicyPage(props) {
  const { ghostPage } = props;
  const { title, html } = ghostPage;
  return (
    <main>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}

PrivacyPolicyPage.getInitialProps = async () => ({
  ghostPage: await getGhostPageById('5cd2e29a774a930001b2b021'),
});

export default withPageLayout(PrivacyPolicyPage);
