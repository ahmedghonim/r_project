// Custom components
import React from "react"

function InputField(props) {
  const {
    label,
    id,
    extra,
    type,
    placeholder,
    variant,
    state,
    disabled,
    ...all
  } = props

  return (
    <div className={`${extra}`}>
      <label htmlFor={id} className={`text-sm text-navy-700 dark:text-white `}>
        {label}
      </label>
      <input
        disabled={disabled}
        type={type}
        id={id}
        placeholder={placeholder}
        className={`flex w-full items-center justify-center rounded-[2px] border border-[#cccccc]  p-2 text-sm outline-none`}
        {...all}
      />
    </div>
  )
}

export default InputField
