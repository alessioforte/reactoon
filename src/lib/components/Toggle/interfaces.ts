import React from 'react'

export interface Data {
  checked: boolean,
  label?: string,
  name?: string,
  value: boolean
}

export interface Props {
  label?: string,
  name?: string,
  initialValue?: boolean,
  theme: any,
  onChange: (data: Data, e: React.ChangeEvent<HTMLDivElement>) => void
}

export interface KnobProps {
  active: boolean,
  name?: string,
  value: boolean
}
