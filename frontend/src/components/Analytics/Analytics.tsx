import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import axios from 'axios';

interface AnalyticsData {
  total_projects: number;
  total_tasks: number;
  total_bugs: number;
  open_bugs: number;
  completed_tasks: number;
  completion_rate: number;
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get('/analytics/dashboard');
      setAnalyticsData(response.data);
    } catch (err: any) {
      setError('Failed to load analytics data');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  const taskData = [
    {
      name: 'Completed',
      value: analyticsData?.completed_tasks || 0,
      color: '#4caf50'
    },
    {
      name: 'Remaining',
      value: (analyticsData?.total_tasks || 0) - (analyticsData?.completed_tasks || 0),
      color: '#ff9800'
    }
  ];

  const bugData = [
    {
      name: 'Open',
      value: analyticsData?.open_bugs || 0,
      color: '#f44336'
    },
    {
      name: 'Closed',
      value: (analyticsData?.total_bugs || 0) - (analyticsData?.open_bugs || 0),
      color: '#4caf50'
    }
  ];

  const overviewData = [
    {
      name: 'Projects',
      value: analyticsData?.total_projects || 0
    },
    {
      name: 'Tasks',
      value: analyticsData?.total_tasks || 0
    },
    {
      name: 'Bugs',
      value: analyticsData?.total_bugs || 0
    }
  ];

  const completionData = [
    {
      name: 'Week 1',
      completion: 10
    },
    {
      name: 'Week 2',
      completion: 25
    },
    {
      name: 'Week 3',
      completion: 45
    },
    {
      name: 'Week 4',
      completion: Math.round(analyticsData?.completion_rate || 0)
    }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={3}>
        {/* Overview Bar Chart */}
        <Card sx={{ flex: '1 1 400px', minHeight: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Project Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={overviewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Completion Pie Chart */}
        <Card sx={{ flex: '1 1 400px', minHeight: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Task Completion Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bug Status Pie Chart */}
        <Card sx={{ flex: '1 1 400px', minHeight: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Bug Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bugData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {bugData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Completion Trend Line Chart */}
        <Card sx={{ flex: '1 1 400px', minHeight: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Completion Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="completion" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ fill: '#8884d8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Summary Cards */}
      <Box display="flex" flexWrap="wrap" gap={3} mt={3}>
        <Card sx={{ flex: '1 1 200px' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="primary">
              {analyticsData?.total_projects || 0}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Total Projects
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: '1 1 200px' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="success.main">
              {Math.round(analyticsData?.completion_rate || 0)}%
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Completion Rate
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: '1 1 200px' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="error.main">
              {analyticsData?.open_bugs || 0}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Open Bugs
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: '1 1 200px' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="warning.main">
              {analyticsData?.total_tasks || 0}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Total Tasks
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Analytics;
