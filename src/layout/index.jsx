import React from 'react';
import { Box, Container } from '@mui/material';

const Layout = ({ children }) => (
    <Box sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f7fa',
        pt: { xs: 2, sm: 4 },
        pb: { xs: 4, sm: 6 }
    }}>
        <Container maxWidth="lg">
            {children}
        </Container>
    </Box>
);

export default Layout;