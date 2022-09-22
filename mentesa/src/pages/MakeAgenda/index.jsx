import React from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import { postProfessional } from '../../services/professionalRequests'
import { useAuth } from '../../hooks/useAuth'
import { Container } from './styles'

export function MakeAgenda() {
  const date = []
  const [days, setDays] = React.useState(date)
  const defaultMonth = new Date(2022, 8)
  const { user } = useAuth()

  const footer =
    days && days.length > 0 ? (
      <p style={{ color: '#fff', marginLeft: '10px' }}>Você selecionou {days.length} dias(s).</p>
    ) : (
      <p style={{ color: '#fff', marginLeft: '10px' }}>Por favor selecione um ou mais dias.</p>
    )

  const disabledDays = [{ from: new Date(2022, 8, 0), to: new Date(2022, 8, 6) }]

  const handleClick = () => {
    const body = {
      email: user.email,
      name: user.name,
      userId: user.userId,
      agenda: { ...days },
    }
    postProfessional(body)
  }

  return (
    <>
      <Container>
        <DayPicker
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
          selected={days}
          onSelect={setDays}
          footer={footer}
        />
        {days.length > 0 && (
          <Button onClick={handleClick} variant='contained' size='large' endIcon={<SendIcon />}>
            Agendar
          </Button>
        )}
      </Container>
    </>
  )
}
