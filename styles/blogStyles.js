import css from 'styled-jsx/css';

{
  /*language=CSS*/
}
export default css.resolve`
  :global(picture) {
    margin: 2em 0;
  }
  :global(li) {
    list-style: initial;
    list-style-position: inside;
    margin: 0.3em 0;
  }
  :global(blockquote) {
    font-style: italic;
    border-left: 5px solid #424242;
    margin: 2em 0 2em 0;
    padding-left: 1em;
  }
`;
