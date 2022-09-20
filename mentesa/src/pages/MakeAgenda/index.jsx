import React from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export function MakeAgenda() {
  const date = []
  const [days, setDays] = React.useState(date)
  const defaultMonth = new Date(2022, 8)

  const footer =
    days && days.length > 0 ? (
      <p>Você selecionou {days.length} dias(s).</p>
    ) : (
      <p>Por favor selecinou um ou mais dias.</p>
    )

  return (
    <DayPicker
      defaultMonth={defaultMonth}
      fromMonth={defaultMonth}
      toDate={new Date(2022, 11, 20)}
      mode='multiple'
      min={1}
      max={4}
      selected={days}
      onSelect={setDays}
      footer={footer}
    />
  )
}
