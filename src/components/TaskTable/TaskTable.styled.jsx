import styled from '@emotion/styled';

export const Table = styled.table`
  /* margin: 0 auto; */
  background-color: white;

  @media screen and (max-width: 767.98px) {
    width: 100%;
  }
  

  @media screen and (min-width: 768px) {
    width: 768px;
  }

  @media screen and (min-width: 1200px) {
   width: 1200px;
   margin: 0 auto;
  }

  thead {
    /* position: fixed; */
  }

  th {
    text-transform: uppercase;
    background-color: darkcyan;
    color: #fff;
  }

  td {
    /* width: 100px; */
    font-size: 14px;
    border: 1px solid darkgrey;
    /* text-align: center; */
  }
`;

export const THTablet = styled.th`
  @media screen and (max-width: 767.98px) {
    display: none;
  }
`;

export const THDesktop = styled.th`
  @media screen and (max-width: 1199.98px) {
    display: none;
  }
`;
