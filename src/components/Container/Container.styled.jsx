import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 360px;

  @media screen and (min-width: 768px) {
    width: 768px;
    padding: 0 8px;
  }

  @media screen and (min-width: 1200px) {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 16px;
  }
`;
