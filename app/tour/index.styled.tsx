import { styled } from "styled-components";
import { 
  StyledStepProps,
  StepArrowProps,
} from "./index.types"

export const TourOverlay = styled.div<{$tourActive: boolean}>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: ${(props) => props.$tourActive ?  "none" : "auto"};
  z-index: ${(props) => props.$tourActive ?  "9998" : "-1"};
`

export const TourMainStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 0;
  margin: 0;
  background-color: transparent;
  z-index: 9999;
`

export const TourInnerStyled = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`

/* ARROW */
export const ArrowPositionner = styled.div<StepArrowProps>`
  position: absolute;
  opacity: ${(props) => props.$visible ? 1 : 0};

  width: 0px;
  height: 0px;

  top: ${(props) => props.$translation.y ?
    (props.$arrowTop ?? 0) - props.$translation.y :
    (props.$arrowTop ?? 0)}px;

  left: ${(props) => props.$translation.x ?
    (props.$arrowLeft ?? 0) - props.$translation.x :
    (props.$arrowLeft ?? 0)}px;
  
  transform: translate(${(props) => props.$translation?.x ?? 0}px, ${(props) => props.$translation?.y ?? 0}px);
  transition: all 0.5s ease-in-out;
`

export const ArrowContainer = styled.div<StepArrowProps>`
  transform: scale(${(props) => props.$scale})translateX(-50%);

  ${(props) => props.$direction === 'up' ?
    'animation: bounceUp' : props.$direction === 'down' ?
    'animation: bounceDown' : props.$direction === 'left' ?
    'animation: bounceLeft' : 'bounceRight'} 1s infinite;

  ${(props) => props.$isVLine ? 'top: 17px; left: -3px; position: absolute;' : ''}
  ${(props) => props.$isHLine ? 'left: 17px; position: absolute;' : ''}

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
    props.$direction === 'left' ? 270 :
    props.$direction === 'diag' && !props.$isVLine ? 160 :
    props.$direction === 'diag' && props.$isVLine ? 75 :
     90}deg);
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

/* STEP */
export const StepStyled = styled.div<StyledStepProps>`
  position: absolute;
  pointer-events: auto;

  display: flex;
  flex-direction: column;

  top: ${(props) => props.$definedPosition ? props.$dialogTop : '220'}px;
  left: ${(props) => props.$definedPosition ? props.$dialogLeft : '50'}vw;
  transition: all 0.5s ease-in-out;

  transform: translateX(-50%);
  
  min-width: 320px;
  max-width: 50vw;
  min-height: 170px;
  max-height: 80vh;
  margin: auto 0;

  border: 1px solid grey;
  border-radius: 6px;
  overflow: hidden;

  padding: 0.4em 0.7em 0.2em;
  background-color: #e6f7f6ff;

  @media (min-width: 480px) {
    min-width: 480px;
    max-width: 800px;
  }
`

export const StepTitleStyled = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 0.5em;
`

export const StepDescriptionStyled = styled.div`
  font-size: 1em;
  margin-bottom: 0.5em;
  text-align: center;
  text-wrap: balance;
`

export const StepButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  align-items: end;
`

export const StepButton = styled.div`
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 9px;
`