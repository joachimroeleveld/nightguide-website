function TextStyles() {
  {
    /*language=CSS*/
  }
  return (
    <style jsx global>{`
      body {
        font-size: 14px;
      }
      h1 {
        font-weight: 700;
        font-size: 1.333em;
        line-height: 1.3;
      }
      h2 {
        font-size: 1.167em;
        font-weight: 700;
      }
      h3 {
        font-size: 1.083em;
        font-weight: 600;
      }
      h4 {
        font-size: 0.9em;
        font-weight: 600;
        margin: 0.3em 0;
      }
      p {
        line-height: 1.65;
      }
      @media (min-width: 800px) {
        body {
          font-size: 16px;
        }
        h1 {
          font-size: 2em;
        }
        h2 {
          font-size: 1.375em;
        }
        h3 {
          font-size: 1em;
        }
      }
    `}</style>
  );
}

export default TextStyles;
