import React from 'react'

export interface Data {
  checked: boolean,
  label?: string
}

export interface Props {
  label?: string,
  initialValue: boolean,
  theme: any,
  onChange: (e: React.ChangeEvent<HTMLDivElement>, data: Data) => void
}

export interface KnobProps {
  active: boolean
}
