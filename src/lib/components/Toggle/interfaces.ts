import React from 'react'

export interface Data {
  checked: boolean,
  label?: string
}

export interface Props {
  label?: string,
  name?: string,
  initialValue?: boolean,
  theme: any,
  onChange: (e: React.ChangeEvent<HTMLDivElement>, data: Data) => void
}

export interface KnobProps {
  active: boolean,
  name?: string,
  value: boolean
}
