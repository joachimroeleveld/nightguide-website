function TextStyles() {
  {
    /*language=CSS*/
  }
  return (
    <style jsx global>{`
      h1 {
        font-weight: 600;
        font-size: 1.5em;
      }
      h2 {
        font-size: 1.3em;
        font-weight: 600;
      }
      h3 {
        font-size: 1.5em;
        font-weight: 600;
      }
      p {
        line-height: 1.65;
      }
      @media (min-width: 800px) {
        h1 {
          font-size: 1.875em;
        }
        h2 {
          font-size: 1.5em;
        }
        h3 {
          font-size: 1.5em;
        }
      }
    `}</style>
  );
}

export default TextStyles;
