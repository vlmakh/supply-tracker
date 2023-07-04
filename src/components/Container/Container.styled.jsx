import styled from '@emotion/styled';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  max-width: 396px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 4px;

  @media screen and (min-width: 768px) {
    max-width: 768px;
    
  }

  @media screen and (min-width: 1200px) {
    max-width: 1200px;
  }
`;

export const TaskTableWrap = styled.div`
  margin: 32px auto 0;

  @media screen and (max-width: 767.98px) {
    margin-top: 68px;
    
  }
`