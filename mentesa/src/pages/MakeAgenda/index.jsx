import React from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

export function MakeAgenda() {
  const date = []
  const [days, setDays] = React.useState(date)
  const defaultMonth = new Date(2022, 8)

  const footer =
    days && days.length > 0 ? (
      <p style={{ color: '#fff', marginLeft: '10px' }}>Você selecionou {days.length} dias(s).</p>
    ) : (
      <p style={{ color: '#fff', marginLeft: '10px' }}>Por favor selecione um ou mais dias.</p>
    )

  const disabledDays = [{ from: new Date(2022, 8, 0), to: new Date(2022, 8, 6) }]

  return (
    <DayPicker
      onDayClick={() => console.log(days)}
      styles={{
        caption: { color: '#fff' },
        month: {
          backgroundColor: '#00A6FB',
          borderRadius: '8px',
          color: '#d3cece',
          fontSize: '14px',
          fontWeight: '600',
        },
      }}
      disabled={disabledDays}
      defaultMonth={defaultMonth}
      fromMonth={defaultMonth}
      toDate={new Date(2022, 11, 20)}
      mode='multiple'
      min={1}
      selected={days}
      onSelect={setDays}
      footer={footer}
    />
  )
}
