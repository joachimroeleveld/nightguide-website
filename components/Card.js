import colors from '../styles/colors';
import dimensions from '../styles/dimensions';

function Card(props) {
  const { children, padding = true } = props;
  return (
    <div className={'container'}>
      {children}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          padding: ${padding ? dimensions.cardPadding : 0};
          background-color: ${colors.cardBg};
          box-shadow: ${colors.cardShadow};
        }
      `}</style>
    </div>
  );
}

export default Card;
