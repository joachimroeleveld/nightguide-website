import { useEffect } from 'react';

import Head from 'next/head';

import withPageLayout from '../components/PageLayout';
import CityTitleButton from '../components/CityTitleButton';

function ExpertChatPage() {
  useEffect(() => {
    let checkTypeWriter;
    // Wait until script loaded
    checkTypeWriter = setInterval(() => {
      if (Typewriter !== undefined) {
        clearInterval(checkTypeWriter);
        const typewriter = new Typewriter(
          document.querySelector('#chat-input'),
          {
            loop: true,
            delay: 10,
            autoStart: true,
          }
        );
        typewriter
          .typeString('Where can I drink cocktails and dance right now?')
          .pauseFor(2500)
          .deleteAll()
          .typeString('What are the best bars for international students?')
          .pauseFor(2500)
          .deleteAll()
          .typeString('Where is it busy right now?')
          .pauseFor(2500)
          .start();
      }
    }, 100);
  });

  return (
    <main>
      <Head>
        <script type="text/javascript" src="/static/js/chat.js" />
      </Head>
      <div className="container">
        <h2>
          Ask a human expert where to go out in{' '}
          <CityTitleButton city="Utrecht" href="/nl/utrecht" />
        </h2>
        <p>We&apos;ll do our best to provide you with the best advice</p>
        <div className="input" id="chat-input" />
        <button className="start-chat" id="start-chat">
          Start chat
        </button>
      </div>
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          min-height: 27vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          margin-top: 3em;
        }

        .container h2 {
          font-weight: 600;
          font-size: 30px;
          letter-spacing: -0.57px;
          margin: 0;
        }

        .container p {
          margin-bottom: 2em;
          font-size: 1.2em;
        }

        .container .input {
          background: rgba(255, 255, 255, 0.17);
          box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.28);
          border-radius: 2px;
          font-size: 20px;
          letter-spacing: -0.38px;
          text-align: left;
          padding: 0.7em 1em;
          display: flex;
        }

        .container .input:hover {
          cursor: pointer;
        }

        .container .city {
          text-decoration: underline;
        }

        .container .cursor {
          width: 1px;
          height: 21px;
          display: inline-block;
          -webkit-animation: 1s blink step-end infinite;
          -moz-animation: 1s blink step-end infinite;
          animation: 1s blink step-end infinite;
        }

        .start-chat {
          background: #fff;
          font-size: 1rem;
          display: inline;
          border-radius: 21px;
          border: none;
          padding: 0.7em 1em;
          margin-top: 1.3em;
        }

        @keyframes "blink" {
          from,
          to {
            background-color: transparent;
          }
          50% {
            background-color: #fff;
          }
        }

        @-moz-keyframes blink {
          from,
          to {
            background-color: transparent;
          }
          50% {
            background-color: #fff;
          }
        }

        @-webkit-keyframes "blink" {
          from,
          to {
            background-color: transparent;
          }
          50% {
            background-color: #fff;
          }
        }
      `}</style>
    </main>
  );
}

export default withPageLayout()(ExpertChatPage);
