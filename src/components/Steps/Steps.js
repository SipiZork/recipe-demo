import { useState } from 'react';
import styled from "styled-components";
import { orangeColorPalette } from "../../styles/colors";

const Steps = ({ steps, editable, removeFromSteps }) => {
  const [activeStep, setActiveStep] = useState(1);

  const changeActiveStep = (step) => {
    setActiveStep(step);
  }
  return (
    <StyledSteps>
      {steps.map((step, i) => (
        <li key={i} onClick={() => changeActiveStep(i + 1)} className={activeStep === i + 1 ? 'active' : ''}>
          <p>{`${i + 1}. ${step}`}</p>
          {editable &&
            <div className="close" onClick={() => removeFromSteps(step)}>X</div>
          }
        </li>
      ))}
    </StyledSteps>
  )
}

const StyledSteps = styled.ul`
  li {
    padding: 1rem;
    font-size: 1.1rem;
    list-style: none;
    user-select: none;
    transition: .25s all;
    position: relative;
    &:nth-child(even) {
      background-color: ${orangeColorPalette.pastelOrange};
    }
    &:nth-child(odd) {
      background-color: ${orangeColorPalette.brightOramge};
    }
    &:hover,
    &.active {
      background-color: ${orangeColorPalette.neonOrange};
      color: white;
      padding: 1rem 1.25rem;
    }

    .close {
      width: 4rem;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      font-size: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      &:hover {
        color: black;
      }
    }
  }
`;

export default Steps;