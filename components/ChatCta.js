import Card from './Card';
import __ from '../lib/i18n';
import PrimaryButton from './PrimaryButton';
import { useChat } from '../lib/hooks/zoho';
import { classNames } from '../lib/util';

function ChatCta(props) {
  const { showChat, initialized } = useChat();

  return (
    <Card>
      <h2>{__('ChatCta.title')}</h2>
      <p>{__('ChatCta.sub')}</p>
      <div
        id="chat-button"
        className={classNames(['button', initialized && 'enabled'])}
      >
        <PrimaryButton title={__('ChatCta.buttonText')} onClick={showChat} />
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        h2 {
          margin-top: 0;
          background: url(/static/img/start-chat.svg) no-repeat left center;
          padding-left: 1.8em;
        }
        .button {
          transition: opacity 0.3s;
        }
        .button:not(.enabled) {
          opacity: 0.5;
        }
      `}</style>
    </Card>
  );
}

export default ChatCta;
