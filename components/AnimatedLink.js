import colors from '../styles/colors';

function AnimatedLink(props) {
  const { children, ...aProps } = props;
  return (
    <a {...aProps}>
      <div className="border" />
      <span className="text">{children}</span>
      {/*language=CSS*/}
      <style jsx>{`
        a {
          display: inline-block;
          position: relative;
        }
        .border {
          width: 100%;
          position: absolute;
          z-index: 0;
          bottom: -0.1em;
          left: 0;
          height: 0.2em;
          background: ${colors.linkText};
          opacity: 0.8;
          transition: height 0.3s;
        }
        a:hover .border {
          height: 100%;
        }
        .text {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </a>
  );
}

export default AnimatedLink;
