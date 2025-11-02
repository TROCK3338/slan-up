import axios from 'axios';
import { Event, CreateEventData } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface EventFilters {
  location?: string;
  category?: string;
  date?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export const eventService = {
  // Get all events with optional filters
  async getEvents(filters?: EventFilters) {
    const params = new URLSearchParams();
    
    if (filters?.location) params.append('location', filters.location);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.date) params.append('date', filters.date);
    if (filters?.latitude !== undefined) params.append('latitude', filters.latitude.toString());
    if (filters?.longitude !== undefined) params.append('longitude', filters.longitude.toString());
    if (filters?.radius !== undefined) params.append('radius', filters.radius.toString());

    const response = await api.get<{ events: Event[]; count: number }>(`/events?${params}`);
    return response.data;
  },

  // Get a single event by ID
  async getEventById(id: string) {
    const response = await api.get<{ event: Event }>(`/events/${id}`);
    return response.data.event;
  },

  // Create a new event
  async createEvent(data: CreateEventData) {
    const response = await api.post<{ event: Event; message: string }>('/events', data);
    return response.data;
  },

  // Join an event
  async joinEvent(id: string) {
    const response = await api.post<{ event: Event; message: string }>(`/events/${id}/join`);
    return response.data;
  },

  // Leave an event
  async leaveEvent(id: string) {
    const response = await api.post<{ event: Event; message: string }>(`/events/${id}/leave`);
    return response.data;
  },
};
