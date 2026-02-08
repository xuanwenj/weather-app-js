# Weather App

A full-stack weather application that combines real-time weather data with AI-powered clothing suggestions. Built with modern web technologies and clean architecture principles.

## 🌟 Features

### Core Weather Functionality
- **Real-time Weather Data**: Display current temperature, humidity, wind speed, and weather conditions
- **Extended Forecast**: 3-day weather forecast with hourly temperature data
- **Weather Alerts**: Automatic detection and display of weather alerts for searched locations
- **Weather Visualization**: Interactive line chart showing hourly temperature trends

### AI Integration
- **AI-Powered Clothing Suggestions**: Uses Claude API to generate personalized clothing recommendations based on current weather conditions
- **Smart Prompting**: Custom system prompts that enforce formatting rules for clean, readable output

### Advanced Features
- **Multi-API Orchestration**: Combines 3 simultaneous API calls (current weather, forecast, alerts) using Promise.all for optimal performance
- **Geolocation Support**: Auto-loads weather for user's current location on app start
- **Error Handling**: Comprehensive error handling with user-friendly messages and graceful fallbacks
- **Timeout Protection**: Custom fetch wrapper with configurable timeout to prevent hanging requests

## 🏗️ Architecture

### Separation of Concerns
The project is organized into modular, single-responsibility components:

```
js/
├── main.js              # Application orchestration & event handling
├── weatherService.js    # Weather API integration & data processing
├── claudeService.js     # Claude API integration for AI suggestions
├── weatherUI.js         # UI updates & visualization (Chart.js)
└── helper/
    ├── fetchWithTimeout.js   # Reusable fetch utility with timeout
    └── elementCheck.js       # DOM validation utility
```

**Benefits of this structure:**
- **Testability**: Each module has a single responsibility and can be tested independently
- **Maintainability**: Changes to one feature don't cascade through the codebase
- **Reusability**: Helper functions and services can be used by multiple components
- **Scalability**: Easy to add new services or features without refactoring existing code

### Backend Architecture
Express server handles sensitive Claude API calls to prevent exposing credentials in the client:
- Validates weather data before sending to Claude API
- Implements CORS for secure cross-origin requests
- Environment variable configuration for API keys

## 🔧 Tech Stack

**Frontend:**
- Vanilla JavaScript (ES6 modules)
- Vite (build tool & dev server)
- Chart.js (data visualization)

**Backend:**
- Node.js with Express
- Anthropic SDK (Claude API)
- CORS & dotenv

**APIs:**
- WeatherAPI.com (weather data)
- Claude Sonnet 4.5 (AI suggestions)

## 💡 Technical Highlights

### Multiple API Calls with Promise.all
```javascript
const [current, forecast, alerts] = await Promise.all([
  fetchWithTimeout(currentUrl, { timeout: 10000 }),
  fetchWithTimeout(forecastUrl, { timeout: 10000 }),
  fetchWithTimeout(alertUrl, { timeout: 10000 }),
]);
```
Efficiently fetches three independent datasets in parallel, reducing overall load time.

### Robust Error Handling
- **API Response Validation**: Checks response status and validates data format before processing
- **Data Transformation**: Processes raw API responses with error checks
- **Timeout Protection**: Prevents requests from hanging indefinitely
- **User Feedback**: All errors are caught and displayed to users with meaningful messages

### Data Processing Pipeline
Each API response goes through a dedicated processing function that:
1. Validates the data structure exists
2. Extracts relevant fields
3. Formats data for UI consumption
4. Throws descriptive errors if data is malformed

### DOM Safety
Custom `getElementById` helper validates that DOM elements exist before use, preventing silent failures.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- API Keys: WeatherAPI.com and Anthropic Claude

### Environment Setup
Create a `.env` file in the project root:
```
ANTHROPIC_API_KEY=your_claude_api_key
VITE_ENABLE_CLAUDE=true
```

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
This runs both the Express server and Vite dev server concurrently.

### Production Build
```bash
npm run build
```

## 📊 Key Design Decisions

### Why Express Backend?
Claude API keys must never be exposed to the client. The Express backend acts as a secure proxy:
- Keeps API credentials safe
- Validates user input before API calls
- Implements rate limiting capabilities
- Provides centralized error handling

### Why Promise.all?
Fetching weather data from three endpoints in parallel:
- Reduces perceived load time
- More efficient than sequential requests
- Cleaner error handling with single try-catch
- Matches user expectations (all data together)

### Why Custom Fetch Wrapper?
The `fetchWithTimeout` utility handles:
- Network timeouts (prevents infinite hangs)
- Consistent timeout configuration
- Reusability across services

### Why Claude for Suggestions?
- More sophisticated reasoning than rule-based logic
- Natural language output
- Can handle edge cases and nuanced weather conditions
- Provides personalized, context-aware suggestions

## 🎯 What I Learned

Building this project provided hands-on experience with:
- **Full-stack development**: Frontend + backend + third-party APIs
- **API integration**: Working with multiple external APIs and handling their responses
- **Error handling patterns**: Validation, timeouts, user feedback
- **Software architecture**: Separation of concerns, modular design
- **Asynchronous JavaScript**: Promises, Promise.all, async/await
- **Modern tooling**: Vite, ES6 modules, npm scripts
- **Environment management**: Sensitive data handling with .env variables

## 🚢 Deployment

The application is structured to deploy on common platforms:
- **Frontend**: Built files deployable to static hosting (Vercel, Netlify, GitHub Pages)
- **Backend**: Node.js app deployable to services like Heroku, Railway, Render

Key deployment considerations implemented:
- Environment variables for API keys
- CORS configuration for cross-origin requests
- Build scripts for production optimization

## 📝 Author

Created as a learning project to master full-stack JavaScript development with API integration and AI features.

## 📄 License

ISC
