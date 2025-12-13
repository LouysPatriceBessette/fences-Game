import { styled } from "styled-components";
import { 
  TourMainStyledProps,
  StyledStepProps,
  StepArrowProps,
} from "./index.types"

export const TourMainStyled = styled.div<TourMainStyledProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0;
  margin: 0;

  z-index: ${(props) => props.$isActive ? 10000 : -1};
  background-color: transparent;
`
export const TourOverlayinnerStyled = styled.div`
  position: relative;
  border: 1px solid orange;
  
  width: 100vw;
  height: 100vh;

`

/* ARROW */
export const ArrowContainer = styled.div<StepArrowProps>`
  position: absolute;

  width: 0px;
  height: 0px;

  top: ${(props) => props.$top ?? 0}px;
  left: ${(props) => props.$left ?? 0}px;

  transform: scale(${(props) => props.$scale})translateX(-50%);

  animation: ${(props) => props.$direction === 'up' ? 'bounceUp' : props.$direction === 'down' ? 'bounceDown' : props.$direction === 'left' ? 'bounceLeft' : 'bounceRight'} 1s infinite;

  @keyframes bounceDown {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }

  @keyframes bounceRight {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(0);
    }
    40% {
      transform: translateX(-20px);
    }
    60% {
      transform: translateX(-10px);
    }
  }

  @keyframes bounceUp {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(20px);
    }
    60% {
      transform: translateY(10px);
    }
  }

  @keyframes bounceLeft {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(0);
    }
    40% {
      transform: translateX(20px);
    }
    60% {
      
      transform: translateX(10px);
    }
  }
`

export const ArrowRotator = styled.div<StepArrowProps>`
  position: relative;

  height: ${(props) => props.$distance}px;

  transform: rotate(${(props) => props.$direction === 'up' ? 0 :
    props.$direction === 'down' ? 180 :
    props.$direction === 'left' ? 270 : 90}deg);
  transform-origin: top center;
`

export const ArrowTailStyled = styled.div<StepArrowProps>`
  position: absolute;
  top: ${(props) => props.$distance +9}px;
  left: -2px;

  width: 4px;
  height: ${(props) => props.$length}px;
  
  background-color: #e01111ff;
  border-radius: 0 0 2px 2px;
`

export const ArrowHeadStyled = styled.div<StepArrowProps>`
  position: absolute;
  top: ${(props) => props.$distance - 15}px;
  left: -8px;

  width: 0px;
  height: 0px;
  
  border-color: transparent transparent #e01111ff transparent;
  border-width: 8px;
  border-top-width: 16px;
`

/* TARGET */
export const Target = styled.div`
  position: absolute;
  top: 300px;
  left: 300px;
  width: 1px;
  height: 1px;
  background-color: blue;
`

/* STEP */
export const StepStyled = styled.div<StyledStepProps>`
  position: absolute;
  top: ${(props) => props.$top}px;
  left: ${(props) => props.$left}px;
  
  min-width: 200px;

  max-width: 80vw;
  max-height: 80vh;

  border: 1px solid grey;
  border-radius: 6px;
  overflow: hidden;

  padding: 0.4em 0.7em 0.2em;
  background-color: #e6f7f6ff;
`

export const StepTitleStyled = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 0.5em;
`

export const StepDescriptionStyled = styled.div`
  font-size: 1em;
  margin-bottom: 0.5em;
`

export const StepButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`