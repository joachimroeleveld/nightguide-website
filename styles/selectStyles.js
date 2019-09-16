import css from 'styled-jsx/css';

import colors from './colors';

/*language=CSS*/
export default css.resolve`
  .select__value-container {
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    background: #3D3D3D;
  }
  .select__control, .select__control:hover {
    border: none !important;
    background: #3D3D3D !important;
  }
  .select__single-value {
    color: #fff;
  }
  .select__indicator {
    color: #7E7E7E;
    background: #3D3D3D;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }
  .select__indicator:hover {
    color: #7E7E7E;
  }
  .select__indicator-separator {
    display: none;
  }
  .select__menu {
    background: #3D3D3D;
  }
  .select__option {
    background: #3D3D3D;
    color: #fff;
  }
  .select__option:hover {
    background: ${colors.bg};
    color: #fff;
  }
  .select__input {
    color: #fff;
  }
`;
