import * as React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

export default function CardProfile(props) {

    return (
        <Card sx={{ display: 'flex', width: 850, marginTop: 4, height: '20%' }}>
            <CardMedia
                component="img"
                sx={{ width: 80, margin: 1.5 }}
                image={props.image}
                alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' , display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <Typography component="div" variant="h4">
                        {props.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" component="div">
                        ID {props.id}
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}