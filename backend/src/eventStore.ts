import { Event, CreateEventDTO, EventQuery } from './types';
import { v4 as uuidv4 } from 'uuid';
import { calculateDistance, isValidCoordinates } from './utils';

class EventStore {
  private events: Event[] = [];

  constructor() {
    // Seed with some initial events
    this.seedEvents();
  }

  private seedEvents() {
    const seedData: CreateEventDTO[] = [
      {
        title: 'Tech Meetup: AI & Machine Learning',
        description: 'Join us for an exciting discussion on the latest trends in AI and ML. Network with fellow tech enthusiasts!',
        location: 'Bangalore, India',
        date: '2025-11-15T18:00:00Z',
        maxParticipants: 50,
        latitude: 12.9716,
        longitude: 77.5946,
        category: 'Technology'
      },
      {
        title: 'Weekend Hiking Adventure',
        description: 'Explore the beautiful trails around Nandi Hills. Perfect for beginners and experienced hikers.',
        location: 'Nandi Hills, Bangalore',
        date: '2025-11-08T06:00:00Z',
        maxParticipants: 20,
        latitude: 13.3704,
        longitude: 77.6838,
        category: 'Outdoor'
      },
      {
        title: 'Startup Founders Networking',
        description: 'Connect with fellow entrepreneurs, share experiences, and build meaningful relationships.',
        location: 'Koramangala, Bangalore',
        date: '2025-11-10T19:00:00Z',
        maxParticipants: 30,
        latitude: 12.9352,
        longitude: 77.6245,
        category: 'Business'
      },
      {
        title: 'Photography Workshop',
        description: 'Learn professional photography techniques from industry experts. Bring your camera!',
        location: 'MG Road, Bangalore',
        date: '2025-11-12T10:00:00Z',
        maxParticipants: 25,
        latitude: 12.9759,
        longitude: 77.6061,
        category: 'Arts'
      },
      {
        title: 'Sunday Football Match',
        description: 'Friendly football match. All skill levels welcome. Just bring your energy!',
        location: 'Cubbon Park, Bangalore',
        date: '2025-11-09T07:00:00Z',
        maxParticipants: 22,
        latitude: 12.9763,
        longitude: 77.5993,
        category: 'Sports'
      },
      {
        title: 'Cooking Class: Indian Cuisine',
        description: 'Master the art of traditional Indian cooking with Chef Rajesh.',
        location: 'Indiranagar, Bangalore',
        date: '2025-11-11T16:00:00Z',
        maxParticipants: 15,
        latitude: 12.9719,
        longitude: 77.6412,
        category: 'Food'
      },
      {
        title: 'Yoga & Meditation Session',
        description: 'Start your day with peace and mindfulness. Suitable for all levels.',
        location: 'Lalbagh, Bangalore',
        date: '2025-11-07T06:30:00Z',
        maxParticipants: 40,
        latitude: 12.9507,
        longitude: 77.5848,
        category: 'Wellness'
      },
      {
        title: 'Book Club: Monthly Meetup',
        description: 'Discussing "The Midnight Library" this month. Coffee and snacks provided.',
        location: 'Church Street, Bangalore',
        date: '2025-11-14T18:30:00Z',
        maxParticipants: 20,
        latitude: 12.9716,
        longitude: 77.6069,
        category: 'Education'
      }
    ];

    seedData.forEach(data => {
      this.createEvent(data);
    });
  }

  createEvent(data: CreateEventDTO): Event {
    const event: Event = {
      id: uuidv4(),
      ...data,
      currentParticipants: 0,
      createdAt: new Date().toISOString()
    };

    this.events.push(event);
    return event;
  }

  getAllEvents(query?: EventQuery): Event[] {
    let filteredEvents = [...this.events];

    // Filter by location (case-insensitive partial match)
    if (query?.location) {
      const searchLocation = query.location.toLowerCase();
      filteredEvents = filteredEvents.filter(event =>
        event.location.toLowerCase().includes(searchLocation)
      );
    }

    // Filter by category
    if (query?.category) {
      filteredEvents = filteredEvents.filter(
        event => event.category?.toLowerCase() === query.category?.toLowerCase()
      );
    }

    // Filter by date
    if (query?.date) {
      filteredEvents = filteredEvents.filter(event =>
        event.date.startsWith(query.date!)
      );
    }

    // Filter by radius if coordinates provided
    if (
      query?.latitude !== undefined &&
      query?.longitude !== undefined &&
      query?.radius !== undefined &&
      isValidCoordinates(query.latitude, query.longitude)
    ) {
      filteredEvents = filteredEvents.filter(event => {
        if (!event.latitude || !event.longitude) return false;
        
        const distance = calculateDistance(
          query.latitude!,
          query.longitude!,
          event.latitude,
          event.longitude
        );
        
        return distance <= query.radius!;
      });

      // Add distance to events for sorting
      filteredEvents = filteredEvents.map(event => ({
        ...event,
        distance: event.latitude && event.longitude
          ? calculateDistance(
              query.latitude!,
              query.longitude!,
              event.latitude,
              event.longitude
            )
          : undefined
      }));

      // Sort by distance
      filteredEvents.sort((a: any, b: any) => {
        if (a.distance === undefined) return 1;
        if (b.distance === undefined) return -1;
        return a.distance - b.distance;
      });
    }

    // Sort by date (upcoming first)
    filteredEvents.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return filteredEvents;
  }

  getEventById(id: string): Event | undefined {
    return this.events.find(event => event.id === id);
  }

  updateEvent(id: string, updates: Partial<Event>): Event | undefined {
    const index = this.events.findIndex(event => event.id === id);
    if (index === -1) return undefined;

    this.events[index] = { ...this.events[index], ...updates };
    return this.events[index];
  }

  deleteEvent(id: string): boolean {
    const index = this.events.findIndex(event => event.id === id);
    if (index === -1) return false;

    this.events.splice(index, 1);
    return true;
  }

  // Join event (increment participants)
  joinEvent(id: string): Event | null {
    const event = this.getEventById(id);
    if (!event) return null;
    
    if (event.currentParticipants >= event.maxParticipants) {
      throw new Error('Event is full');
    }

    event.currentParticipants += 1;
    return event;
  }

  // Leave event (decrement participants)
  leaveEvent(id: string): Event | null {
    const event = this.getEventById(id);
    if (!event) return null;
    
    if (event.currentParticipants > 0) {
      event.currentParticipants -= 1;
    }

    return event;
  }
}

export const eventStore = new EventStore();
