import React, {FunctionComponent} from "react";

const Input: FunctionComponent<React.InputHTMLAttributes<HTMLInputElement>> = ({...rest}) => {
  return (
    <input {...rest} className="rounded block w-full border border-gray-200 px-4 py-2" />
  )
}

export default Input
