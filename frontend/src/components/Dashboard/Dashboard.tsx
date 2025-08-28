import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Stack,
  LinearProgress,
  Avatar,
  IconButton
} from '@mui/material';
import {
  FolderSpecial,
  Assignment,
  BugReport,
  CheckCircle,
  TrendingUp,
  Refresh,
  Speed,
  Psychology,
  Groups
} from '@mui/icons-material';
import axios from 'axios';
import { cardGradients } from '../../theme/theme';

interface DashboardStats {
  total_projects: number;
  total_tasks: number;
  total_bugs: number;
  open_bugs: number;
  completed_tasks: number;
  completion_rate: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/analytics/dashboard');
      setStats(response.data);
    } catch (err: any) {
      setError('Failed to load dashboard data');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="60vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Loading dashboard analytics...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          borderRadius: 3,
          '& .MuiAlert-icon': { fontSize: 28 }
        }}
      >
        {error}
      </Alert>
    );
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats?.total_projects || 0,
      icon: <FolderSpecial sx={{ fontSize: 32, color: '#0A21C0' }} />,
      gradient: cardGradients.projects,
      color: '#0A21C0'
    },
    {
      title: 'Total Tasks',
      value: stats?.total_tasks || 0,
      icon: <Assignment sx={{ fontSize: 32, color: '#059669' }} />,
      gradient: cardGradients.tasks,
      color: '#059669'
    },
    {
      title: 'Total Bugs',
      value: stats?.total_bugs || 0,
      icon: <BugReport sx={{ fontSize: 32, color: '#DC2626' }} />,
      gradient: cardGradients.bugs,
      color: '#DC2626'
    },
    {
      title: 'Open Bugs',
      value: stats?.open_bugs || 0,
      icon: <Psychology sx={{ fontSize: 32, color: '#8B5CF6' }} />,
      gradient: cardGradients.analytics,
      color: '#8B5CF6'
    },
    {
      title: 'Completed Tasks',
      value: stats?.completed_tasks || 0,
      icon: <CheckCircle sx={{ fontSize: 32, color: '#059669' }} />,
      gradient: cardGradients.completion,
      color: '#059669'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #0A21C0, #4F63FF)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Monitor your development progress and team performance
          </Typography>
        </Box>
        <IconButton 
          onClick={fetchDashboardData}
          sx={{ 
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' }
          }}
        >
          <Refresh />
        </IconButton>
      </Box>
      
      {/* Stats Cards */}
      <Box 
        display="flex" 
        flexWrap="wrap" 
        gap={3} 
        sx={{ mb: 4 }}
      >
        {statCards.map((card, index) => (
          <Card 
            key={index}
            sx={{ 
              flex: '1 1 240px',
              minWidth: 240,
              background: card.gradient,
              border: '1px solid rgba(107, 114, 128, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.12)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: card.color,
              }
            }}
          >
            <CardContent sx={{ position: 'relative', zIndex: 1 }}>
              <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(0, 0, 0, 0.08)'
                  }}
                >
                  {card.icon}
                </Avatar>
              </Box>
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700,
                  mb: 1,
                  color: '#1F2937',
                }}
              >
                {card.value}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#6B7280',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 1
                }}
              >
                {card.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Completion Rate Card */}
      <Box display="flex" flexWrap="wrap" gap={3} sx={{ mb: 4 }}>
          <Card 
            sx={{ 
              flex: '1 1 400px',
              background: cardGradients.premium,
              border: '1px solid rgba(107, 114, 128, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #0A21C0, #8B5CF6)',
              }
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={3}>
                <Avatar sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(0, 0, 0, 0.08)' }}>
                  <Speed sx={{ color: '#F59E0B' }} />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#1F2937' }}>
                    Completion Rate
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Overall project progress
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    fontWeight: 800,
                    color: '#F59E0B',
                  }}
                >
                  {Math.round(stats?.completion_rate || 0)}%
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={stats?.completion_rate || 0}
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  mt: 2,
                  bgcolor: 'rgba(249, 115, 22, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #F59E0B, #F97316)',
                    borderRadius: 4,
                  }
                }}
              />
            </CardContent>
          </Card>        <Card sx={{ flex: '1 1 400px' }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <Groups />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Quick Stats
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Key metrics overview
                </Typography>
              </Box>
            </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip 
                label={`${stats?.total_projects || 0} Projects`} 
                color="primary" 
                variant="filled"
                sx={{ fontWeight: 600 }}
              />
              <Chip 
                label={`${stats?.total_tasks || 0} Tasks`} 
                color="success" 
                variant="filled"
                sx={{ fontWeight: 600 }}
              />
              <Chip 
                label={`${stats?.open_bugs || 0} Open Bugs`} 
                color="error" 
                variant="filled"
                sx={{ fontWeight: 600 }}
              />
              <Chip 
                label={`${Math.round(stats?.completion_rate || 0)}% Complete`} 
                color="info" 
                variant="filled"
                sx={{ fontWeight: 600 }}
              />
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* System Status */}
      <Card>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Avatar sx={{ bgcolor: 'success.main' }}>
              <CheckCircle />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                System Status
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Real-time system health monitoring
              </Typography>
            </Box>
          </Box>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Chip 
              label="Backend Connected" 
              color="success"
              variant="filled"
              sx={{ 
                fontWeight: 600,
                '& .MuiChip-icon': { color: 'inherit' }
              }}
              icon={<CheckCircle />}
            />
            <Chip 
              label="Real-time Updates Active" 
              color="success"
              variant="filled"
              sx={{ 
                fontWeight: 600,
                '& .MuiChip-icon': { color: 'inherit' }
              }}
              icon={<Speed />}
            />
            <Chip 
              label="All Systems Operational" 
              color="success"
              variant="filled"
              sx={{ 
                fontWeight: 600,
                '& .MuiChip-icon': { color: 'inherit' }
              }}
              icon={<TrendingUp />}
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
