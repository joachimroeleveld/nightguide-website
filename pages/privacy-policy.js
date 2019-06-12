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
  ghostPage: await getGhostPageById('5cf8e1dd372b3200012d8942'),
});

export default withPageLayout()(PrivacyPolicyPage);
