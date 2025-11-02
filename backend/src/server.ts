import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import eventRoutes from './routes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '🎉 Event Finder API is running!',
    version: '1.0.0',
    endpoints: {
      health: 'GET /',
      createEvent: 'POST /api/events',
      getAllEvents: 'GET /api/events',
      getEventById: 'GET /api/events/:id',
      joinEvent: 'POST /api/events/:id/join',
      leaveEvent: 'POST /api/events/:id/leave'
    },
    documentation: 'See README.md for detailed API documentation'
  });
});

// API Routes
app.use('/api/events', eventRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║   🚀 Event Finder API Server Started     ║
║                                           ║
║   Port: ${PORT}                           ║
║   Environment: ${process.env.NODE_ENV || 'development'}              ║
║   URL: http://localhost:${PORT}            ║
║                                           ║
║   Ready to accept requests! 🎉           ║
╚═══════════════════════════════════════════╝
  `);
});

export default app;
