import { Box, Paper } from '@mui/material';
import { Container } from '@mui/system';
import * as React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUser } from '../../services/usersRequests';
import CardProfile from './Components/CardProfile';
import Form from './Components/Form';

export default function Profile() {
    const { user } = useAuth()


    // getUser(user.userId)
    console.log('userLogado', getUser(user?.userId))

    return (
        <Container maxWidth="gl">
            <Box sx={{ bgcolor: 'red', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardProfile
                    image={user?.avatar}
                    name={user?.name}
                    id={user?.userId}
                ></CardProfile>

               <Form />
            </Box>
        </Container>
    )
}