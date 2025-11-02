export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
  currentParticipants: number;
  latitude?: number;
  longitude?: number;
  category?: string;
  createdAt: string;
}

export interface CreateEventDTO {
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
  latitude?: number;
  longitude?: number;
  category?: string;
}

export interface EventQuery {
  location?: string;
  category?: string;
  date?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
}
