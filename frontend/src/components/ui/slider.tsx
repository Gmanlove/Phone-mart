import * as React from "react"

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  min?: number
  max?: number
  step?: number
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ min = 0, max = 100, step = 1, className, onChange, ...props }, ref) => (
    <input
      type="range"
      ref={ref}
      min={min}
      max={max}
      step={step}
      className={"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer " + (className || "")}
      onChange={onChange}
      {...props}
    />
  )
)

Slider.displayName = "Slider"

export default Slider
