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
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  FolderSpecial,
  Edit as EditIcon
} from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { cardGradients } from '../../theme/theme';

interface Project {
  id: number;
  name: string;
  description: string;
  owner_id: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects');
      setProjects(response.data);
    } catch (err: any) {
      setError('Failed to load projects');
      console.error('Projects fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!formData.name.trim()) {
      setError('Project name is required');
      return;
    }

    try {
      if (editingProject) {
        // Update existing project
        const response = await axios.put(`/projects/${editingProject.id}`, formData);
        setProjects(projects.map(p => p.id === editingProject.id ? response.data : p));
      } else {
        // Create new project
        const response = await axios.post('/projects', formData);
        setProjects([...projects, response.data]);
      }
      
      setDialogOpen(false);
      setFormData({ name: '', description: '' });
      setEditingProject(null);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.detail || `Failed to ${editingProject ? 'update' : 'create'} project`);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description || ''
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({ name: '', description: '' });
    setEditingProject(null);
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
        <Typography variant="h4">Projects</Typography>
        {(user?.role === 'admin' || user?.role === 'manager') && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
          >
            Create Project
          </Button>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box display="flex" flexWrap="wrap" gap={3}>
        {projects.map((project) => (
          <Card 
            key={project.id}
            sx={{ 
              minWidth: 300,
              flex: '1 1 300px',
              background: cardGradients.projects,
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
                  <FolderSpecial color="primary" />
                  <Typography variant="h6" component="div">
                    {project.name}
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => handleEditProject(project)}>
                  <EditIcon />
                </IconButton>
              </Box>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                {project.description || 'No description provided'}
              </Typography>
              
              <Box display="flex" gap={1} alignItems="center" mb={2}>
                <Chip 
                  label={project.is_active ? 'Active' : 'Inactive'} 
                  color={project.is_active ? 'success' : 'default'}
                  size="small"
                />
                <Chip 
                  label={`ID: ${project.id}`} 
                  size="small"
                  variant="outlined"
                />
              </Box>
              
              <Typography variant="caption" color="text.secondary">
                Created: {new Date(project.created_at).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {projects.length === 0 && (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          height="300px"
          textAlign="center"
        >
          <FolderSpecial sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Projects Found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.role === 'admin' || user?.role === 'manager' 
              ? 'Create your first project to get started'
              : 'No projects available yet'
            }
          </Typography>
        </Box>
      )}

      {/* Create/Edit Project Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Project Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateProject} variant="contained">
            {editingProject ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Projects;
