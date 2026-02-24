import { forwardRef } from "react"

interface InputProps {
    placeholder: string,
    type: string,
    onClick?: () => void,
    style: keyof typeof styles
}

const styles = {
  primary: "border border-white/20  px-3 py-2 rounded w-[80%] focus:outline-none focus:ring-1 transition-all duration-200",
  secondary: "border border-gray-800 px-3 py-2 rounded ",
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({placeholder, type, onClick, style}, ref) => {
  return (
    <input 
      className={`${styles[style]} `} 
      ref={ref}
      placeholder={placeholder} 
      type={type} 
      onClick={onClick}
    />
  )
})


Input.displayName = "Input"

export default Input