# 🎉 EventFinder - Mini Event Discovery App

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **A full-stack event discovery application built for the Slanup Technical Challenge**

Discover, create, and join amazing events happening around you! This project showcases modern web development practices with a focus on clean code, user experience, and scalable architecture.

---

## ✨ Features

### Core Features (Required)
- ✅ **Event Listing** - Browse all events with beautiful card layouts
- ✅ **Event Details** - View comprehensive event information
- ✅ **Create Events** - Easy-to-use form with validation
- ✅ **REST API** - Clean, RESTful backend with TypeScript
- ✅ **Responsive Design** - Works perfectly on all devices

### Bonus Features (Implemented)
- 🎯 **Location-Based Search** - Find events near you using geolocation
- 📏 **Distance Calculation** - Haversine formula for accurate distance
- 🔍 **Advanced Filters** - Search by location, category, and radius
- 🎨 **Modern UI/UX** - Beautiful gradient backgrounds and animations
- ⚡ **Loading States** - Smooth loading indicators
- 🚨 **Error Handling** - Comprehensive error messages and retry logic
- 📱 **Real-time Updates** - Join/leave events with instant feedback
- 🏷️ **Category System** - 8 different event categories
- 📊 **Visual Feedback** - Progress bars, participant counts, spot availability
- 🗺️ **Google Maps Integration** - Direct links to event locations

---

## 🚀 Tech Stack

### Backend
- **Node.js** + **Express** - Fast, minimalist web framework
- **TypeScript** - Type safety and better developer experience
- **In-Memory Storage** - Lightning-fast data operations (no database setup needed)
- **UUID** - Unique event identifiers

### Frontend
- **React 18** - Latest React with hooks
- **TypeScript** - Full type safety
- **React Router v6** - Client-side routing
- **TailwindCSS** - Utility-first styling
- **Axios** - HTTP client
- **Vite** - Ultra-fast build tool

---

## 📁 Project Structure

```
SLANUP/
├── backend/
│   ├── src/
│   │   ├── server.ts          # Express server setup
│   │   ├── routes.ts           # API route handlers
│   │   ├── eventStore.ts       # In-memory data store
│   │   ├── types.ts            # TypeScript interfaces
│   │   └── utils.ts            # Helper functions (distance calc)
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── EventCard.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── ErrorMessage.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Event listing with filters
│   │   │   ├── EventDetail.tsx     # Single event view
│   │   │   └── CreateEvent.tsx     # Event creation form
│   │   ├── services/
│   │   │   └── api.ts              # API service layer
│   │   ├── types/
│   │   │   └── index.ts            # TypeScript types
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
└── README.md
```

---

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory (in a new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Create Event
```http
POST /events
Content-Type: application/json

{
  "title": "Weekend Hiking Adventure",
  "description": "Join us for an exciting hike!",
  "location": "Nandi Hills, Bangalore",
  "date": "2025-11-15T06:00:00Z",
  "maxParticipants": 20,
  "latitude": 13.3704,      // optional
  "longitude": 77.6838,     // optional
  "category": "Outdoor"     // optional
}

Response: 201 Created
{
  "message": "Event created successfully",
  "event": { ... }
}
```

#### 2. Get All Events
```http
GET /events
Query Parameters:
  - location (optional): Filter by location name
  - category (optional): Filter by category
  - date (optional): Filter by date (YYYY-MM-DD)
  - latitude, longitude, radius (optional): Distance-based filtering

Response: 200 OK
{
  "count": 8,
  "events": [ ... ]
}
```

#### 3. Get Event by ID
```http
GET /events/:id

Response: 200 OK
{
  "event": { ... }
}
```

#### 4. Join Event
```http
POST /events/:id/join

Response: 200 OK
{
  "message": "Successfully joined event",
  "event": { ... }
}
```

#### 5. Leave Event
```http
POST /events/:id/leave

Response: 200 OK
{
  "message": "Successfully left event",
  "event": { ... }
}
```

---

## 🎯 Key Features Explained

### 1. Distance Calculation
Uses the **Haversine formula** to calculate accurate distances between user location and events:

```typescript
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  // ... Haversine formula implementation
  return distance;
}
```

### 2. Smart Filtering
- **Location search**: Case-insensitive partial matching
- **Category filter**: Exact category matching
- **Radius filter**: Dynamic slider from 1km to 100km
- **Date filter**: Filter events by date

### 3. Real-time Participant Management
- Join events with one click
- Automatic participant count updates
- Visual progress bars showing capacity
- "Event Full" indicators

### 4. User Experience
- Loading states for all async operations
- Error messages with retry functionality
- Responsive design for all screen sizes
- Smooth animations and transitions
- Toast notifications for actions

---

## 🧪 Testing the Application

### Manual Testing Checklist

1. **Event Listing**
   - [ ] All events display correctly
   - [ ] Filters work as expected
   - [ ] Location-based search functions
   - [ ] Cards show correct information

2. **Event Details**
   - [ ] Event details load correctly
   - [ ] Join/Leave functionality works
   - [ ] Participant count updates
   - [ ] Google Maps link works

3. **Create Event**
   - [ ] Form validation works
   - [ ] Date must be in future
   - [ ] Event creates successfully
   - [ ] Redirects to event detail page

4. **Error Handling**
   - [ ] Network errors show appropriate messages
   - [ ] Invalid data shows validation errors
   - [ ] Retry functionality works

---

## 🚢 Deployment

### Backend Deployment (Render/Railway)

1. Connect your GitHub repository
2. Set environment variables:
   - `NODE_ENV=production`
   - `PORT=5000`
3. Build command: `npm run build`
4. Start command: `npm start`

### Frontend Deployment (Vercel)

1. Connect your GitHub repository
2. Framework preset: Vite
3. Environment variables:
   - `VITE_API_URL=<your-backend-url>`
4. Deploy!

---

## 💡 Challenges Faced & Solutions

### Challenge 1: Distance Calculation Accuracy
**Problem**: Initial implementation didn't account for Earth's curvature  
**Solution**: Implemented Haversine formula for accurate geographic distance calculation

### Challenge 2: Real-time State Management
**Problem**: Participant counts not updating immediately after join/leave  
**Solution**: Optimistic UI updates + backend response synchronization

### Challenge 3: Filter Performance
**Problem**: Multiple filters causing slow rendering  
**Solution**: Debouncing and efficient array filtering with early returns

### Challenge 4: Mobile Responsiveness
**Problem**: Cards breaking layout on small screens  
**Solution**: TailwindCSS responsive grid system with proper breakpoints

---

## 🤖 AI Tools Used

### 1. **Claude AI** (Primary)
- Generated initial project structure
- Helped with TypeScript type definitions
- Suggested UI/UX improvements
- Code review and optimization

### 2. **GitHub Copilot**
- Autocompleted repetitive code patterns
- Generated utility functions
- Suggested error handling patterns

### 3. **How I Used AI Effectively**
- ✅ Used AI for boilerplate and structure
- ✅ Modified generated code to fit requirements
- ✅ Asked for explanations of complex logic
- ✅ Used AI for debugging and optimization
- ❌ Didn't blindly copy-paste without understanding
- ❌ Made custom modifications based on needs

---

## 🎨 Design Decisions

### Why TailwindCSS?
- Rapid development with utility classes
- Consistent design system
- Easy responsive design
- No CSS file bloat

### Why In-Memory Storage?
- Faster than database for small datasets
- No setup required
- Easy to test
- Can be easily replaced with MongoDB later

### Why TypeScript?
- Type safety prevents bugs
- Better IDE support
- Self-documenting code
- Easier refactoring

### Why Vite?
- Lightning-fast HMR
- Modern build tool
- Better than Create React App
- Optimized production builds

---

## 📈 Performance Optimizations

1. **Lazy Loading**: Components load only when needed
2. **Memoization**: React.memo for expensive components
3. **Efficient Filtering**: Early returns in filter chains
4. **Optimistic Updates**: UI updates before API confirmation
5. **Code Splitting**: Automatic with Vite

---

## 🔒 Security Features

1. **Input Validation**: All inputs validated on both client and server
2. **CORS Protection**: Configured for specific origins
3. **XSS Prevention**: React's built-in escaping
4. **Type Safety**: TypeScript prevents type-related bugs
5. **Error Handling**: No sensitive data in error messages

---

## 🎓 What I Learned

1. **Full-Stack Integration**: Seamless frontend-backend communication
2. **Geospatial Calculations**: Haversine formula implementation
3. **State Management**: Complex filtering and real-time updates
4. **TypeScript**: Advanced type definitions and interfaces
5. **Modern React**: Hooks, Router v6, and best practices
6. **API Design**: RESTful principles and proper error handling
7. **UX Design**: Loading states, error handling, responsive design

---

## 🚀 Future Enhancements

If I had more time, I would add:
- [ ] User authentication system
- [ ] Event images upload
- [ ] Real-time notifications with WebSockets
- [ ] Calendar integration
- [ ] Social sharing features
- [ ] Event ratings and reviews
- [ ] MongoDB integration
- [ ] Redis caching layer
- [ ] Email notifications
- [ ] Advanced search with Elasticsearch

---

## 📝 Code Quality

- ✅ Clean, readable code with proper naming
- ✅ Consistent file/folder structure
- ✅ Comments where necessary
- ✅ No console errors or warnings
- ✅ TypeScript strict mode enabled
- ✅ Proper error boundaries
- ✅ ESLint compliant

---

## 👨‍💻 Author

**Aman Singhal**

Built with ❤️ for the Slanup Technical Challenge

---

## 📄 License

MIT License - feel free to use this project for learning!

---

## 🙏 Acknowledgments

- Slanup team for the exciting challenge
- Claude AI for development assistance
- React and Node.js communities for amazing tools
- TailwindCSS for beautiful styling utilities

---

## ⭐ Final Notes

This project demonstrates my ability to:
- ✅ Build full-stack applications quickly
- ✅ Write clean, maintainable code
- ✅ Design intuitive user interfaces
- ✅ Handle complex business logic
- ✅ Use AI tools effectively
- ✅ Ship production-ready code

**Total Development Time**: ~10 hours  
**Lines of Code**: ~2,000+  
**Features Implemented**: All required + 10 bonus features

Thank you for reviewing my submission! I'm excited about the opportunity to join Slanup! 🚀

---

### Quick Start Commands

```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm run dev

# Open http://localhost:3000 in your browser
```

**Let's build something amazing together! 🎉**
