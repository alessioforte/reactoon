import React from 'react'

export type Data = {
  checked: boolean,
  label?: string,
  name?: string,
  value: boolean
}

export type Props = {
  label?: string,
  name?: string,
  initialValue?: boolean,
  onChange?: (data: Data, e: React.ChangeEvent<HTMLDivElement>) => void
  theme: any,
}

export type KnobProps = {
  active: boolean,
  name?: string,
  value: boolean
}
