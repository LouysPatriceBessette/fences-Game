 
import { useEffect, useState, useRef } from 'react'
import Chakra from '../components/Chakra'
import {
  TourMainStyled,
  TourOverlayinnerStyled,
  StepStyled,
  StepButtonContainer,
  // Target,
} from "./index.styled"

import {
  StepArrow,
  StepTitle,
  StepDescription,
} from "./components"

import {
  TourMain,
  TourSteps,
  DomElementPositions,
} from "./index.types"

export const Tour = ({
    $isActive,
    // setControlsDrawerOpen,
    // setCreateGameDialogOpen,
    // setJoinGameDialogOpen,
    // setGameoverDialogOpen,
    // setTriggerChatDrawerOpen,
  }: TourMain) => {

  //
  // ================================================= TOUR STEPS DEFINITION
  //
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tourSteps: TourSteps[] = [
    {
      dialog: {
        $visible: true,
        $title: 'Deuxième étape',
        $description: 'On est content!',
        $prevCallback: () => console.log('back callback 2'),
        $nextCallback: () => console.log('next callback 2'),
      },
  
      arrow: {
        $visible: true,
        $selector:'#ControlsButton',
        $direction: 'left',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },
    {
      dialog: {
        $visible: true,
        $title: 'Première étape',
        $description: 'Il faut du cash.',
        $prevCallback: () => console.log('back callback'),
        $nextCallback: () => console.log('next callback'),
      },
  
      arrow: {
        $visible: true,
        $selector:'#player1Name',
        $direction: 'left',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },
    {
      dialog: {
        $visible: true,
        $title: 'Deuxième étape',
        $description: 'On est content!',
        $prevCallback: () => console.log('back callback 2'),
        $nextCallback: () => console.log('next callback 2'),
      },
  
      arrow: {
        $visible: true,
        $selector:'#player2Name',
        $direction: 'right',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },
    {
      dialog: {
        $visible: true,
        $title: 'Deuxième étape',
        $description: 'On est content!',
        $prevCallback: () => console.log('back callback 2'),
        $nextCallback: () => console.log('next callback 2'),
      },
  
      arrow: {
        $visible: true,
        $selector:'#player1Score',
        $direction: 'left',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },
    {
      dialog: {
        $visible: true,
        $title: 'Deuxième étape',
        $description: 'On est content!',
        $prevCallback: () => console.log('back callback 2'),
        $nextCallback: () => console.log('next callback 2'),
      },
  
      arrow: {
        $visible: true,
        $selector:'#player2Score',
        $direction: 'right',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },
  ]

  //
  // ================================================= TOUR LOGIC
  //
  const [currentStep, setCurrentStep] = useState(0)

  // On tour activation
  useEffect(() => {
    if($isActive) {
      console.log('tour is active')
    } else{
      setCurrentStep(0)
    }
  }, [$isActive])

  // On tour step change
  useEffect(() => {
    if(currentStep >= 0 && currentStep < tourSteps.length ) {
      console.log('Step changed to', currentStep)
    } else{
      setCurrentStep(0)
    }
  }, [currentStep, tourSteps])

  //
  // Find all the selector position on load
  //
  const getElementPosition = (selector: string) => {
    const element = document.querySelector(selector)
    const rect = element?.getBoundingClientRect()

    return {
      $top: rect?.top ?? 0,
      $left: rect?.left ?? 0,
      $height: rect?.height ?? 0,
      $width: rect?.width ?? 0
    }
  }

  const foundElements: React.RefObject<DomElementPositions[] | null> = useRef(null)
  const selectors = tourSteps.map((step) => step.arrow.$selector)

  useEffect(() => {
    foundElements.current = selectors.map((selector, index) => {

      const isFoundInDOM = !!document.querySelector(selector)
      const rect = getElementPosition(selector)

      switch(tourSteps[index].arrow.$direction) {
        case 'up':
          rect.$top += rect.$height
          rect.$left += rect.$width / 2
          break 
        case 'down':          
          // rect.$top += rect.$height
          rect.$top += rect.$height / 2
          break
        case 'left':          
          rect.$left += rect.$width
          rect.$top += rect.$height / 2
          break
        case 'right':          
          // rect.$left += rect.$width
          rect.$top += rect.$height / 2
          break
      }

      return {
        $selector: selector,
        isFoundInDOM,
        $top: rect.$top,
        $left: rect.$left,
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectors])

  console.log('foundElements', foundElements)

  return (
    <TourMainStyled $isActive={$isActive}>
      <TourOverlayinnerStyled>
        {/* <Target/> */}

        <StepArrow
          {...tourSteps[currentStep].arrow}
          $foundElements={foundElements.current}
          $currentStep={currentStep}
        />

        <StepStyled{...tourSteps[currentStep].dialog} $top={250} $left={430}>
          <StepTitle $title={tourSteps[currentStep].dialog.$title}/>
          <StepDescription $description={tourSteps[currentStep].dialog.$description}/>

          <StepButtonContainer>
            <Chakra.Button
              text='Back'
              customVariant='grey'
              disabled={currentStep === 0}
              onClick={() => {
                setCurrentStep((prev) => prev - 1 )
                tourSteps[currentStep].dialog.$nextCallback()
              }}
            />

            <Chakra.Button
              text='OK'
              customVariant='green'
              disabled={currentStep === tourSteps.length - 1}
              onClick={() => {
                setCurrentStep((prev) => prev + 1 )
                tourSteps[currentStep].dialog.$nextCallback()
              }}
            />
          </StepButtonContainer>
            
        </StepStyled>
      </TourOverlayinnerStyled>
    </TourMainStyled>
  )
}