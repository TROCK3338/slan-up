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
  distance?: number;
}

export interface CreateEventData {
  title: string;
  description: string;
  location: string;
  date: string;
  maxParticipants: number;
  latitude?: number;
  longitude?: number;
  category?: string;
}
