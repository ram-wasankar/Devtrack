import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  BugReport,
  Edit as EditIcon
} from '@mui/icons-material';
import axios from 'axios';
import { cardGradients } from '../../theme/theme';

interface Bug {
  id: number;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'fixed' | 'closed';
  project_id: number;
  assigned_to: number | null;
  reported_by: number;
  created_at: string;
  updated_at: string;
}

interface Project {
  id: number;
  name: string;
}

const Bugs: React.FC = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium',
    project_id: '',
    assigned_to: ''
  });

  useEffect(() => {
    fetchBugs();
    fetchProjects();
  }, []);

  const fetchBugs = async () => {
    try {
      const response = await axios.get('/bugs');
      setBugs(response.data);
    } catch (err: any) {
      setError('Failed to load bugs');
      console.error('Bugs fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects');
      setProjects(response.data);
    } catch (err: any) {
      console.error('Projects fetch error:', err);
    }
  };

  const handleCreateBug = async () => {
    if (!formData.title.trim() || !formData.project_id) {
      setError('Title and Project are required');
      return;
    }

    try {
      const payload = {
        ...formData,
        project_id: parseInt(formData.project_id),
        assigned_to: formData.assigned_to ? parseInt(formData.assigned_to) : null
      };
      const response = await axios.post('/bugs', payload);
      setBugs([...bugs, response.data]);
      setDialogOpen(false);
      setFormData({ title: '', description: '', severity: 'medium', project_id: '', assigned_to: '' });
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create bug report');
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'error';
      case 'in_progress': return 'warning';
      case 'fixed': return 'info';
      case 'closed': return 'success';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'success';
      case 'medium': return 'primary';
      case 'high': return 'warning';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Bug Reports</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Report Bug
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box display="flex" flexWrap="wrap" gap={3}>
        {bugs.map((bug) => (
          <Card 
            key={bug.id}
            sx={{ 
              minWidth: 300,
              flex: '1 1 300px',
              background: cardGradients.bugs,
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: 2,
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <BugReport color="error" />
                  <Typography variant="h6" component="div">
                    {bug.title}
                  </Typography>
                </Box>
                <IconButton size="small">
                  <EditIcon />
                </IconButton>
              </Box>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                {bug.description || 'No description provided'}
              </Typography>
              
              <Box display="flex" gap={1} alignItems="center" mb={2} flexWrap="wrap">
                <Chip 
                  label={bug.status} 
                  color={getStatusColor(bug.status)}
                  size="small"
                />
                <Chip 
                  label={bug.severity} 
                  color={getSeverityColor(bug.severity)}
                  size="small"
                />
                <Chip 
                  label={`Project: ${bug.project_id}`} 
                  size="small"
                  variant="outlined"
                />
              </Box>
              
              <Typography variant="caption" color="text.secondary">
                Reported: {new Date(bug.created_at).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {bugs.length === 0 && (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          height="300px"
          textAlign="center"
        >
          <BugReport sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Bug Reports Found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Great! No bugs reported yet, or create your first bug report
          </Typography>
        </Box>
      )}

      {/* Create Bug Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Report New Bug</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Bug Title"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={formData.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth margin="dense" sx={{ mb: 2 }}>
            <InputLabel>Project</InputLabel>
            <Select
              name="project_id"
              value={formData.project_id}
              label="Project"
              onChange={handleInputChange}
            >
              {projects.map((project) => (
                <MenuItem key={project.id} value={project.id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Severity</InputLabel>
            <Select
              name="severity"
              value={formData.severity}
              label="Severity"
              onChange={handleInputChange}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateBug} variant="contained">
            Report Bug
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Bugs;
