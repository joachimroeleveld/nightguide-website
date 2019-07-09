import range from 'lodash/range';

function Pager(props) {
  const { currentIndex, itemCount } = props;

  return (
    <div className="container">
      {range(0, itemCount).map(index => (
        <div
          key={index}
          className={['dot', index === currentIndex ? 'active' : ''].join(' ')}
        />
      ))}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          padding: 0.1em 0;
        }
        .dot {
          margin: 0 0.15em;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fff;
          opacity: 0.6;
          transition: all 0.3s;
        }
        .dot.active {
          transform: scale(1.2);
          margin: 0 0.2em;
          background: #fff;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default Pager;
