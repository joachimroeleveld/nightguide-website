import css from 'styled-jsx/css';

{
  /*language=CSS*/
}
export default css.resolve`
  * :global(picture) {
    margin: 2em 0;
  }
  * :global(li) {
    list-style-type: initial;
    list-style-position: inside;
    margin: 0.4em 0;
  }
  * :global(li p) {
    display: inline;
  }
  * :global(blockquote) {
    font-style: italic;
    border-left: 5px solid #424242;
    margin: 2em 0 2em 0;
    padding-left: 1em;
  }
  * :global(h2, h3, h4, h5, h6) {
    margin-top: 2em;
  }
`;
