 
import { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { setIsLoaded } from '../store/actions';
import { useIsLoaded } from '../store/selectors';

import Chakra from '../components/Chakra'
import {
  TourMainStyled,
  StepButton,
  TourInnerStyled,
  StepStyled,
  StepButtonContainer,
} from "./index.styled"

import {
  StepArrow,
  StepTitle,
  StepDescription,
} from "./components"

import {
  TourMain,
  DomElementPositions,
} from "./index.types"

import { LuDoorOpen } from 'react-icons/lu'

import { TourStepsData } from "./steps/Data"

export const Tour = ({
    tourActive,
    setTourActive,

    setControlsDrawerOpen,
    setMore,

    setCreateGameDialogOpen,
    setJoinGameDialogOpen,
    setGameoverDialogOpen,

    setChatDrawerOpen,
  }: TourMain) => {

  const EDITING_STEPS = false

  const dispatch = useDispatch()
  const isLoaded = useIsLoaded()
  const [currentStep, setCurrentStep] = useState(0)
  const [inputtingStep, setInputtingStep] = useState('')

  // Steps data
  const tourSteps = TourStepsData({
    setCurrentStep,
    setTourActive,

    setControlsDrawerOpen,
    setMore,

    setCreateGameDialogOpen,
    setJoinGameDialogOpen,
    setGameoverDialogOpen,

    setChatDrawerOpen,
  })

  const quitTour = () => {
    setTourActive(false)
    setCurrentStep(0)
    setControlsDrawerOpen(false)
    setMore(false)
    setCreateGameDialogOpen(false)
    setJoinGameDialogOpen(false)
    setGameoverDialogOpen(false)
    setChatDrawerOpen(false)
  }

  //
  // Find all the selector position on load
  //
  const getElementPosition = (selector: string) => {
    if(!selector){
      return {
        $arrowTop: 0,
        $arrowLeft: 0,
        $height: 0,
        $width: 0
      }
    }
    const element = document.querySelector(selector)
    const rect = element?.getBoundingClientRect()

    return {
      $arrowTop: rect?.top ?? 0,
      $arrowLeft: rect?.left ?? 0,
      $height: rect?.height ?? 0,
      $width: rect?.width ?? 0
    }
  }

  const foundElements: React.RefObject<DomElementPositions[] | null> = useRef(null)
  const selectors = tourSteps.map((step) => step.arrow.$selector)

  useEffect(() => {

    // Find all the element positions
    // And keep them in foundElements
    // Only on page load (while the animated loading icon shows)
    if(!isLoaded){
      foundElements.current = selectors.map((selector, index) => {


        if(foundElements && foundElements.current && foundElements.current[index].isFoundInDOM){
          return foundElements.current[index]
        }

        const isFoundInDOM = !selector ? false : !!document.querySelector(selector)
        const rect = getElementPosition(selector)

        const rectPosition: DomElementPositions = {
          isFoundInDOM: isFoundInDOM,
          $selector: selector,
          
          $arrowTop: rect.$arrowTop,
          $arrowLeft: rect.$arrowLeft,
          $dialogTop: 35,   // in px
          $dialogLeft: 50,  // in vw
        }

        switch(tourSteps[index].arrow.$direction) {
          case 'up':
            rectPosition.$arrowTop += rect.$height
            rectPosition.$arrowLeft += rect.$width / 2
            break 
          case 'down':          
            // rectPosition.$arrowTop -= rect.$height / 2
            rectPosition.$arrowLeft += rect.$width / 2
            break
          case 'left':          
            rectPosition.$arrowLeft += rect.$width
            rectPosition.$arrowTop += rect.$height / 2
            break
          case 'right':          
            // rectPosition.$arrowLeft += rect.$width
            rectPosition.$arrowTop += rect.$height / 2
            break
        }

        /*

        Cases below represent an approximate layout grid.
        It ISN'T a grid. It's only the common desirable locations.

        A1 A2 A3
        B1 B2 B3
        C1 C2 C3

        Note that on mobile, the width is 100%, and therefore, it is only:
          A
          B
          C
        And (TODO) we force to landscape portrait.

        */

        // Dialog position
        switch(tourSteps[index].dialog.$definedPosition) {
          case 'A1':
            // rectPosition.$dialogTop = 0
            // rectPosition.$dialogLeft = 0
            break;

          case 'A2':
            rectPosition.$dialogTop = 0
            // rectPosition.$dialogLeft = 0
            break;

          
          case 'A3':
            // rectPosition.$dialogTop = 0
            // rectPosition.$dialogLeft = 0
            break;

          
          case 'B1':
            // rectPosition.$dialogTop = 0
            // rectPosition.$dialogLeft = 0
            break;

          
          case 'B2':
            rectPosition.$dialogTop = 190
            // rectPosition.$dialogLeft = 0
            break;

          
          case 'B3':
            // rectPosition.$dialogTop = 0
            // rectPosition.$dialogLeft = 0
            break;

          
          case 'C1':
            // rectPosition.$dialogTop = 0
            // rectPosition.$dialogLeft = 0
            break;

          
          case 'C2':
            rectPosition.$dialogTop = 380
            // rectPosition.$dialogLeft = 0
            break;

          
          case 'C3':
            // rectPosition.$dialogTop = 0
            // rectPosition.$dialogLeft = 0
            break;

          
        }

        return {
          $selector: selector,
          isFoundInDOM,
          $arrowTop: rectPosition.$arrowTop,
          $arrowLeft: rectPosition.$arrowLeft,
          $dialogTop: rectPosition.$dialogTop,
          $dialogLeft: rectPosition.$dialogLeft,
          $definedPosition: tourSteps[index].dialog.$definedPosition,
        }
      })
    
      const foundCount = foundElements.current.filter((f) => f.isFoundInDOM)
      const notFoundCount = foundElements.current.filter((f) => !f.isFoundInDOM)

      if(EDITING_STEPS){
        console.log('foundElements.current', foundElements.current)
        console.log('found:', foundCount.length, foundCount.map((f) => f.$selector))
        console.log('not found:', notFoundCount.length, notFoundCount.map((f) => f.$selector))
      }

      if(notFoundCount.filter((nf) => nf.$selector !== '').length === 0){
        setTimeout(() => {
          dispatch(setIsLoaded(true));
        }, 1000)
      }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectors, currentStep])

  // Arrow X/Y animated translation (top/left)
  const prev = {
    x: foundElements.current?.[currentStep - 1]?.$arrowLeft,
    y: foundElements.current?.[currentStep - 1]?.$arrowTop,
  }
  const next = {
    x: foundElements.current?.[currentStep]?.$arrowLeft,
    y: foundElements.current?.[currentStep]?.$arrowTop,
  }

  const isTranslation = prev.x && prev.y && next.x && next.y
  let diff = {x: 0, y: 0}
  if(isTranslation){
    // @ts-expect-error Come on TS! There is no error here.
    diff = {x: next.x - prev.x, y: next.y - prev.y}
  }

  return !tourActive ? <></> : <TourMainStyled>
      <TourInnerStyled>

        <StepArrow
          data-step={currentStep}
          {...tourSteps[currentStep].arrow}
          $foundElements={foundElements.current}
          $currentStep={currentStep}
          $translation={diff}
        />

        <StepStyled
          {...tourSteps[currentStep].dialog}
          $dialogTop={foundElements.current?.[currentStep].$dialogTop ?? 0}
          $dialogLeft={foundElements.current?.[currentStep].$dialogLeft ?? 0}

          $arrowTop={foundElements.current?.[currentStep].$arrowTop ?? 0}
          $arrowLeft={foundElements.current?.[currentStep].$arrowLeft ?? 0}
        >
          <StepTitle $title={tourSteps[currentStep].dialog.$title}/>
          <StepDescription $description={tourSteps[currentStep].dialog.$description}/>

          <StepButtonContainer>
            <Chakra.Button
              text={<StepButton>←</StepButton>}
              customVariant='grey'
              disabled={currentStep === 0}
              onClick={() => {
                setCurrentStep((prev) => prev - 1 )
                tourSteps[currentStep].dialog.$prevCallback()
              }}
            />

            <Chakra.Button
              text={<LuDoorOpen/>}
              customVariant='orange'
              onClick={quitTour}
            />

            <Chakra.Button
              text={<StepButton>→</StepButton>}
              customVariant='green'
              disabled={currentStep === tourSteps.length - 1}
              onClick={() => {
                setCurrentStep((prev) => prev + 1 )
                tourSteps[currentStep].dialog.$nextCallback()
              }}
            />
          </StepButtonContainer>
            
        </StepStyled>

        {EDITING_STEPS && <>
          <div
            style={{
              padding: '4px 20px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              Step:
              <input
                name='step switcher'
                value={inputtingStep !== '' ? inputtingStep : currentStep.toString()}
                onFocus={(event) => {
                  event.preventDefault()
                  event?.target.select()
                }}
                onKeyUp={(event) => {
                  if(['Backspace'].indexOf(event.key) !== -1){
                    setInputtingStep('')
                    // @ts-expect-error Noe error here
                    event.target.value = ''
                    return
                  }
                  if(['Enter'].indexOf(event.key) !== -1){
                    setInputtingStep('')
                    setCurrentStep(Number(inputtingStep))
                    return
                  }
                  if('0123456789'.indexOf(event.key) === -1){
                    return
                  }
                  setInputtingStep((prev) => {
                    if(prev === '0'){
                      return `${event.key}`
                    }
                    return `${prev}${event.key}`
                  })
                }}
                onChange={() => {}}
                style={{
                  width: '40px',
                  border: '1px solid grey',
                  borderRadius: '4px',
                  padding: '0 4px',
                  marginLeft: '6px',
                  marginRight: '6px',
                  textAlign: 'right',
                  backgroundColor: (Number(inputtingStep) < 0 || Number(inputtingStep) > tourSteps.length - 1) ? 'red' : 'white',
                }}
              />
              <button
                onClick={() => {
                  setInputtingStep('')
                  setCurrentStep(Number(inputtingStep))
                }}
                style={{
                  opacity: inputtingStep === currentStep.toString() || Number(inputtingStep) > tourSteps.length - 1 ? 0 : 1,
                  backgroundColor: 'lightgrey',
                  borderRadius: '4px',
                  padding: '0 4px',
                }}
              >
                Go
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  console.clear()
                  console.log('Rendered Arrow:', foundElements.current?.[currentStep])
                  console.log('Tour Step:', tourSteps[currentStep])
                }}
                style={{
                  backgroundColor: 'lightgrey',
                  borderRadius: '4px',
                  padding: '0 4px',
                  marginTop: '6px',
                }}
              >
                Log objects
              </button>
            </div>
          </div>
        </>}

      </TourInnerStyled>
      
    </TourMainStyled>
}