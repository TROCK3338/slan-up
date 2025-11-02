import { Router, Request, Response } from 'express';
import { eventStore } from './eventStore';
import { CreateEventDTO, EventQuery } from './types';

const router = Router();

/**
 * POST /api/events - Create a new event
 */
router.post('/', (req: Request, res: Response) => {
  try {
    const eventData: CreateEventDTO = req.body;

    // Validation
    if (!eventData.title || !eventData.description || !eventData.location || !eventData.date || !eventData.maxParticipants) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['title', 'description', 'location', 'date', 'maxParticipants']
      });
    }

    if (eventData.maxParticipants < 1) {
      return res.status(400).json({
        error: 'maxParticipants must be at least 1'
      });
    }

    // Validate date
    const eventDate = new Date(eventData.date);
    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({
        error: 'Invalid date format. Use ISO 8601 format (e.g., 2025-11-15T18:00:00Z)'
      });
    }

    const event = eventStore.createEvent(eventData);
    
    res.status(201).json({
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({
      error: 'Failed to create event',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/events - Get all events with optional filters
 * Query params:
 *   - location: Filter by location (case-insensitive partial match)
 *   - category: Filter by category
 *   - date: Filter by date (format: YYYY-MM-DD)
 *   - latitude, longitude, radius: Filter by distance (radius in km)
 */
router.get('/', (req: Request, res: Response) => {
  try {
    const query: EventQuery = {
      location: req.query.location as string,
      category: req.query.category as string,
      date: req.query.date as string,
      latitude: req.query.latitude ? parseFloat(req.query.latitude as string) : undefined,
      longitude: req.query.longitude ? parseFloat(req.query.longitude as string) : undefined,
      radius: req.query.radius ? parseFloat(req.query.radius as string) : undefined
    };

    // Validate coordinates if provided
    if ((query.latitude !== undefined || query.longitude !== undefined || query.radius !== undefined)) {
      if (query.latitude === undefined || query.longitude === undefined || query.radius === undefined) {
        return res.status(400).json({
          error: 'latitude, longitude, and radius must all be provided together'
        });
      }

      if (isNaN(query.latitude) || isNaN(query.longitude) || isNaN(query.radius)) {
        return res.status(400).json({
          error: 'latitude, longitude, and radius must be valid numbers'
        });
      }

      if (query.radius <= 0) {
        return res.status(400).json({
          error: 'radius must be greater than 0'
        });
      }
    }

    const events = eventStore.getAllEvents(query);
    
    res.json({
      count: events.length,
      events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      error: 'Failed to fetch events',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * GET /api/events/:id - Get a specific event by ID
 */
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = eventStore.getEventById(id);

    if (!event) {
      return res.status(404).json({
        error: 'Event not found'
      });
    }

    res.json({ event });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      error: 'Failed to fetch event',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/events/:id/join - Join an event
 */
router.post('/:id/join', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = eventStore.joinEvent(id);

    if (!event) {
      return res.status(404).json({
        error: 'Event not found'
      });
    }

    res.json({
      message: 'Successfully joined event',
      event
    });
  } catch (error) {
    console.error('Error joining event:', error);
    
    if (error instanceof Error && error.message === 'Event is full') {
      return res.status(400).json({
        error: 'Event is full',
        message: 'This event has reached maximum participants'
      });
    }

    res.status(500).json({
      error: 'Failed to join event',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * POST /api/events/:id/leave - Leave an event
 */
router.post('/:id/leave', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = eventStore.leaveEvent(id);

    if (!event) {
      return res.status(404).json({
        error: 'Event not found'
      });
    }

    res.json({
      message: 'Successfully left event',
      event
    });
  } catch (error) {
    console.error('Error leaving event:', error);
    res.status(500).json({
      error: 'Failed to leave event',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
