import React from "react"

export type DomElementPositions = {
  $selector: string,
  isFoundInDOM: boolean,
  $top: number,
  $left: number,
}

export type TourMain = {
  $isActive: boolean,

  setControlsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCreateGameDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setJoinGameDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setGameoverDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setTriggerChatDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export type TourMainStyledProps = {
  $isActive: boolean,
}

export type TourSteps = {
  dialog: {
    $visible: boolean,
    $title: string,
    $description: string,
    $prevCallback: () => void,
    $nextCallback: () => void,
  },

  arrow: {
    $visible: boolean,
    $selector: string,
    $direction: 'up' | 'down' | 'left' | 'right',
    $length: number,
    $distance: number,
    $scale: number,
  }
}

export type StyledStepProps = {
  $visible: boolean,
  $top: number,
  $left: number,
}

export type StepArrowProps = {
  $visible: boolean,
  $selector: string,
  $top?: number,
  $left?: number,
  $direction: 'up' | 'down' | 'left' | 'right',
  $length: number,
  $distance: number,
  $scale: number,
  children?: React.ReactElement<StepArrowProps>,

  $foundElements?: DomElementPositions[] | null,
  $currentStep: number
}

export type StepTitleProps =  {
  $title: string
}

export type StepDescriptionProps = {
  $description: string
}