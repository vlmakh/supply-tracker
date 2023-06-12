import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 768px) {
    max-width: 768px;
    padding: 0 4px;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1200px;
  }
`;
