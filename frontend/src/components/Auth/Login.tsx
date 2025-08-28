import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  Link,
  Container
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { Link as RouterLink } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (userType: string) => {
    const credentials = {
      admin: { email: 'admin@devtrack.com', password: 'admin123' },
      manager: { email: 'manager@devtrack.com', password: 'manager123' },
      developer: { email: 'developer@devtrack.com', password: 'dev123' },
      tester: { email: 'tester@devtrack.com', password: 'test123' }
    };

    const cred = credentials[userType as keyof typeof credentials];
    if (cred) {
      setEmail(cred.email);
      setPassword(cred.password);
      setError('');
      setLoading(true);
      
      try {
        await login(cred.email, cred.password);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            DevTrack
          </Typography>
          <Typography component="h2" variant="h5" align="center" gutterBottom>
            Sign In
          </Typography>
          
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            {/* Demo Login Buttons */}
            <Typography variant="subtitle2" align="center" sx={{ mt: 2, mb: 1, color: 'text.secondary' }}>
              Quick Demo Login:
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap" sx={{ mb: 2 }}>
              <Button 
                size="small" 
                variant="outlined" 
                onClick={() => handleDemoLogin('admin')}
                disabled={loading}
                sx={{ flex: 1 }}
              >
                Admin
              </Button>
              <Button 
                size="small" 
                variant="outlined" 
                onClick={() => handleDemoLogin('manager')}
                disabled={loading}
                sx={{ flex: 1 }}
              >
                Manager
              </Button>
              <Button 
                size="small" 
                variant="outlined" 
                onClick={() => handleDemoLogin('developer')}
                disabled={loading}
                sx={{ flex: 1 }}
              >
                Developer
              </Button>
              <Button 
                size="small" 
                variant="outlined" 
                onClick={() => handleDemoLogin('tester')}
                disabled={loading}
                sx={{ flex: 1 }}
              >
                Tester
              </Button>
            </Box>
            
            <Box textAlign="center">
              <Link component={RouterLink} to="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
