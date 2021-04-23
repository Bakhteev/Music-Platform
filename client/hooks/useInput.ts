import React, { useState } from 'react'

export const useInput = (initialValue) => {
  const [value, setvalue] = useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setvalue(e.target.value)
  }
  return {
    value,
    onChange,
  }
}
