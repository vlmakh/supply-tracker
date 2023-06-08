import styled from '@emotion/styled';

export const Table = styled.table`
  margin: 0 auto;
  background-color: white;
  width: 1200px;

  th {
    text-transform: uppercase;
    background-color: darkcyan;
    color: #fff;
  }

  td {
    width: 100px;
    font-size: 14px;
    border: 1px solid darkgrey;
    text-align: center;
  }

  /* tr {
    color: ${p => p.completed === 'true' ? 'grey' : "#212121"};    
  }*/
  `; 

  // export const Checkbox = styled.input`
  // /* display: none; */

  // :checked ~ .td { //путь к родителю ????
  //   color: grey;
  // }
// `;

