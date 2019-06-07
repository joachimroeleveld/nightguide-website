import colors from '../styles/colors';
import { generateImgPropsFromServingUrl } from './Image';

const IMG_WIDTHS_BIG = [290, 580, 920];
const IMG_WIDTHS_SMALL = [145, 290, 580];
const IMG_SIZES_BIG = '(max-width: 800px) calc(100vw - 4em), 451px';
const IMG_SIZES_SMALL = '(max-width: 800px) calc(50vw - 2em), 232px';

function ImageGrid(props) {
  const images = props.images.map(({ url }, index) =>
    generateImgPropsFromServingUrl(
      url,
      index !== 0 ? IMG_WIDTHS_SMALL : IMG_WIDTHS_BIG,
      index !== 0 ? IMG_SIZES_SMALL : IMG_SIZES_BIG
    )
  );
  return (
    <div className={`container grid-${images.length}`}>
      {images.map((imgProps, index) => (
        <img key={index} {...imgProps} />
      ))}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          display: grid;
          grid-template: 2fr 1fr 1fr / 1fr 1fr;
          height: 80vh;
          margin: -3px;
        }
        img {
          max-width: 100%;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          border: 3px solid ${colors.bg};
        }
        img:nth-child(1) {
          grid-area: 1 / 1 / 2 / 3;
        }
        @media (min-width: 800px) {
          .container {
            height: 350px;
            grid-template: 1fr 1fr / 2fr 1fr 1fr;
          }
          img:nth-child(1) {
            grid-area: 1 / 1 / 3 / 2;
          }
        }
      `}</style>
    </div>
  );
}

export default ImageGrid;
