from fastapi import WebSocket
from typing import Dict, List
import json

class ConnectionManager:
    """Manages WebSocket connections for real-time communication."""
    
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
    
    async def connect(self, websocket: WebSocket, client_id: str):
        """Accept a new WebSocket connection."""
        await websocket.accept()
        self.active_connections[client_id] = websocket
        
        # Send welcome message
        await self.send_personal_message(
            json.dumps({
                "type": "connection_established",
                "message": f"Connected successfully as {client_id}",
                "timestamp": "2025-08-27T00:00:00Z"
            }),
            client_id
        )
    
    def disconnect(self, client_id: str):
        """Remove a WebSocket connection."""
        if client_id in self.active_connections:
            del self.active_connections[client_id]
    
    async def send_personal_message(self, message: str, client_id: str):
        """Send a message to a specific client."""
        if client_id in self.active_connections:
            try:
                await self.active_connections[client_id].send_text(message)
            except:
                # Connection might be closed, remove it
                self.disconnect(client_id)
    
    async def broadcast(self, message: str):
        """Broadcast a message to all connected clients."""
        disconnected_clients = []
        
        for client_id, connection in self.active_connections.items():
            try:
                await connection.send_text(message)
            except:
                # Connection is closed, mark for removal
                disconnected_clients.append(client_id)
        
        # Clean up disconnected clients
        for client_id in disconnected_clients:
            self.disconnect(client_id)
    
    async def broadcast_to_project(self, message: str, project_id: int):
        """Broadcast a message to all clients in a specific project."""
        # For now, broadcast to all. In production, you'd track project memberships
        await self.broadcast(message)
    
    def get_connected_count(self) -> int:
        """Get the number of active connections."""
        return len(self.active_connections)
    
    def get_connected_clients(self) -> List[str]:
        """Get list of connected client IDs."""
        return list(self.active_connections.keys())
