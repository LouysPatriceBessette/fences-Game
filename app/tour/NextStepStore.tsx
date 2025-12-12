import { useTour } from '../store/selectors';
import { NextStep } from 'nextstepjs';
import { NextStepsTranslateAndDispatch } from './NextStepsTranslateAndDispatch';

export const NextStepStore = ({children}: {children: React.ReactNode}) => {

  const steps = useTour()
  const stepsTarget = steps?.[0].tour

  return <NextStep
    steps={steps}
    disableConsoleLogs
    displayArrow={false}
  >
    {stepsTarget === 'INSTRUCTIONS_START' ?
      children :
      <NextStepsTranslateAndDispatch/>
    }
  </NextStep>
}
