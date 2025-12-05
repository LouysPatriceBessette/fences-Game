import { Slider, HStack } from "@chakra-ui/react"
import { randomReactKey } from "../../basics/utils"

export const ChakraSlider = ({
  label='',
  size,
  orientation,
  height='40px',
  min=0,
  max=100,
  step=1,
  sliderValue=[0],
  onValueChangeEnd,
  showSliderValue=false,
  marks=[{value: 3, label: '3'}]
}) => {
  return (<Slider.Root
      key={randomReactKey()}
      maxW={size}
      size={size}
      defaultValue={[sliderValue]}
      step={step}
      orientation={orientation}
      height={height}
      min={min}
      max={max}
      onValueChangeEnd={onValueChangeEnd}
    >
      <HStack justify="space-between">
        <Slider.Label>{label}</Slider.Label>
        {showSliderValue && <Slider.ValueText />}
      </HStack>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs rounded="l1" />
        <Slider.Marks marks={marks} />
      </Slider.Control>
    </Slider.Root>
  )
}