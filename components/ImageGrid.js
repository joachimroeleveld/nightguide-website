import css from 'styled-jsx/css';
import ResponsiveImage from './ResponsiveImage';

const IMG_WIDTHS_BIG = [290, 580, 920];
const IMG_WIDTHS_SMALL = [145, 290, 580];
const IMG_SIZES_BIG = '(max-width: 780px) 100vw, 451px';
const IMG_SIZES_SMALL = '(max-width: 780px) 25vw, 232px';

function ImageGrid(props) {
  const { images } = props;
  return (
    <div className={`container grid-${images.length}`}>
      {images.map((image, index) => (
        <div className="grid-item" key={index}>
          <div className="inner">
            <ResponsiveImage
              url={image.url}
              widths={index !== 0 ? IMG_WIDTHS_SMALL : IMG_WIDTHS_BIG}
              sizes={index !== 0 ? IMG_SIZES_SMALL : IMG_SIZES_BIG}
              /*language=CSS*/
              {...css.resolve`
                .container {
                  display: block;
                  width: 100%;
                  height: 100%;
                }
                img {
                  object-fit: cover;
                  width: 100%;
                  height: 100%;
                }
              `}
            />
          </div>
        </div>
      ))}
      {/*language=CSS*/}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-rows: auto 5em;
          grid-template-columns: repeat(4, 1fr);
          grid-template-areas:
            'main main main main'
            '. . . .';
          margin: -3px;
          grid-gap: 3px;
        }
        .grid-item:nth-child(1) {
          grid-area: main;
          height: 300px;
        }
        .grid-item > .inner {
          width: 100%;
          height: 100%;
        }
        @media (min-width: 600px) {
          .grid-item:nth-child(1) {
            height: 300px;
          }
          .grid-item {
            height: 150px;
          }
        }
        @media (min-width: 800px) {
          .container {
            grid-template: 1fr 1fr / 2fr 1fr 1fr;
          }
          .grid-item {
            height: 175px;
          }
          .grid-item:nth-child(1) {
            grid-area: 1 / 1 / 3 / 2;
            height: 350px;
          }
        }
      `}</style>
    </div>
  );
}

export default ImageGrid;
