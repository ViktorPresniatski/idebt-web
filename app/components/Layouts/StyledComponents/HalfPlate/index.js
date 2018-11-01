import styled from 'styled-components';

const HalfPlate = styled.div`
  padding: 24px;
  background: #fff;
  min-height: 250px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 25px;
  width: calc(50% - 15px);
  display: inline-block;
  margin-right: 15px;
  -ms-flex-direction: row;
  -ms-justify-content: center;
  box-shadow: 0 0 12px rgba(5, 16, 44, 0.13);

  @media (max-width: 767px) {
    width: 100%;
    margin-right: 0;
    min-height: 350px;
  }
`;

export default HalfPlate;
