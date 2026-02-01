import { forwardRef } from "react"

interface InputProps {
    placeholder: string,
    type: string,
    onClick?: () => void,
    style: keyof typeof styles
}

const styles = {
  primary: "border px-3 py-2 rounded w-[80%]",
  secondary: "border px-3 py-2 rounded bg-gray-100",
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({placeholder, type, onClick, style}, ref) => {
  return (
    <input  
      className={`${styles[style]}`} 
      ref={ref}
      placeholder={placeholder} 
      type={type} 
      onClick={onClick}
    />
  )
})


Input.displayName = "Input"

export default Input