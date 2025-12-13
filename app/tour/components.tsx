import { 
  StepArrowProps,
  StepTitleProps,
  StepDescriptionProps,
} from "./index.types"
import {
  ArrowContainer,
  ArrowRotator,
  ArrowHeadStyled,
  ArrowTailStyled,
  StepTitleStyled,
  StepDescriptionStyled,
} from "./index.styled"

export const StepArrow = (props: StepArrowProps) => {
  return props.$visible ? <>
    <ArrowContainer
      {...props}
      $top={props.$foundElements?.[props.$currentStep].$top}
      $left={props.$foundElements?.[props.$currentStep].$left}
    >
      <ArrowRotator {...props}>
        <>
          <ArrowHeadStyled{...props}/>
          <ArrowTailStyled{...props}/>
        </>
      </ArrowRotator>
    </ArrowContainer>
  </> : <></>
}

export const StepTitle = ({
  $title='Title',
}: StepTitleProps) => {
  return <StepTitleStyled>{$title}</StepTitleStyled>
}

export const StepDescription = ({
  $description='description',
}: StepDescriptionProps) => {
  return <StepDescriptionStyled>{$description}</StepDescriptionStyled>
}