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
  Assignment,
  Edit as EditIcon
} from '@mui/icons-material';
import axios from 'axios';
import { cardGradients } from '../../theme/theme';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  project_id: number;
  assigned_to: number | null;
  created_by: number;
  created_at: string;
  updated_at: string;
}

interface Project {
  id: number;
  name: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    project_id: '',
    assigned_to: ''
  });

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data);
    } catch (err: any) {
      setError('Failed to load tasks');
      console.error('Tasks fetch error:', err);
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

  const handleCreateTask = async () => {
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
      
      if (editingTask) {
        // Update existing task
        const response = await axios.put(`/tasks/${editingTask.id}`, payload);
        setTasks(tasks.map(t => t.id === editingTask.id ? response.data : t));
      } else {
        // Create new task
        const response = await axios.post('/tasks', payload);
        setTasks([...tasks, response.data]);
      }
      
      setDialogOpen(false);
      setFormData({ title: '', description: '', priority: 'medium', project_id: '', assigned_to: '' });
      setEditingTask(null);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.detail || `Failed to ${editingTask ? 'update' : 'create'} task`);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      project_id: task.project_id.toString(),
      assigned_to: task.assigned_to ? task.assigned_to.toString() : ''
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData({ title: '', description: '', priority: 'medium', project_id: '', assigned_to: '' });
    setEditingTask(null);
    setError('');
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
      case 'todo': return 'default';
      case 'in_progress': return 'primary';
      case 'review': return 'warning';
      case 'done': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'success';
      case 'medium': return 'primary';
      case 'high': return 'warning';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const handleStatusUpdate = async (taskId: number, newStatus: string) => {
    try {
      const response = await axios.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus as any } : task
      ));
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update task');
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
        <Typography variant="h4">Tasks</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
        >
          Create Task
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box display="flex" flexWrap="wrap" gap={3}>
        {tasks.map((task) => (
          <Card 
            key={task.id}
            sx={{ 
              minWidth: 300,
              flex: '1 1 300px',
              background: cardGradients.tasks,
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
                  <Assignment color="primary" />
                  <Typography variant="h6" component="div">
                    {task.title}
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => handleEditTask(task)}>
                  <EditIcon />
                </IconButton>
              </Box>
              
              <Typography variant="body2" color="text.secondary" paragraph>
                {task.description || 'No description provided'}
              </Typography>
              
              <Box display="flex" gap={1} alignItems="center" mb={2} flexWrap="wrap">
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <Select
                    value={task.status}
                    onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                    variant="outlined"
                  >
                    <MenuItem value="todo">To Do</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="review">Review</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                  </Select>
                </FormControl>
                <Chip 
                  label={task.priority} 
                  color={getPriorityColor(task.priority)}
                  size="small"
                />
                <Chip 
                  label={`Project: ${task.project_id}`} 
                  size="small"
                  variant="outlined"
                />
              </Box>
              
              <Typography variant="caption" color="text.secondary">
                Created: {new Date(task.created_at).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {tasks.length === 0 && (
        <Box 
          display="flex" 
          flexDirection="column" 
          alignItems="center" 
          justifyContent="center" 
          height="300px"
          textAlign="center"
        >
          <Assignment sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Tasks Found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create your first task to get started
          </Typography>
        </Box>
      )}

      {/* Create/Edit Task Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Task Title"
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
            rows={3}
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
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formData.priority}
              label="Priority"
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
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleCreateTask} variant="contained">
            {editingTask ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Tasks;
