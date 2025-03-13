# URL Shortener Frontend

## Application Demo

https://drive.google.com/file/d/17NdJiwKtCFKXfiyWr2N0CTlGSO6MCEoH/view?usp=sharing


Frontend URL

- Frontend: https://url-shortener-frontend-wine.vercel.app/

- Swagger URL: https://url-shortener-backend-production-bb28.up.railway.app/api/docs#/

This is the frontend for the URL Shortener application built with React with Animations, TypeScript, Tailwind CSS, and Redux Toolkit.

## Features

- User authentication (login/register/logout)
- Dashboard to manage shortened URLs
- Analytics for URL performance
- Modern UI with animations
- Responsive design

## Tech Stack

- **React**: UI library
- **TypeScript**: Type safety
- **Redux Toolkit**: State management
- **RTK Query**: API data fetching
- **React Router**: Routing
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI component library
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Vite**: Build tool

## Project Structure

```
src/
├── app/                  # Redux store configuration
├── components/           # Reusable components
│   ├── layout/           # Layout components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   ├── ui/               # UI components (shadcn)
│   └── common/           # Common utility components
├── features/             # Redux slices and API queries
│   ├── auth/             # Authentication related code
│   └── urls/             # URL shortening related code
├── pages/                # Page components
├── utils/                # Utility functions
├── styles/               # CSS styles
├── types/                # TypeScript type definitions
├── hooks/                # Custom React hooks
├── constants/            # Constants and configuration
├── animations/           # Animation definitions
├── App.tsx               # Main application component
├── index.tsx             # Application entry point
└── routes.tsx            # Route definitions
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd url-shortener/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
5. Update the `.env` file with your backend API URL:
   ```
   VITE_API_URL=http://localhost:3001/api
   ```

### Development

Start the development server:

```bash
npm run dev
```

This will start the application at [http://localhost:3000](http://localhost:3000).

### Building for Production

Build the application:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Connecting to the Backend

The frontend connects to the backend API using RTK Query and Axios. The API base URL is configured in the `.env` file as `VITE_API_URL`.

Make sure your backend server is running and accessible at the URL specified in the `.env` file.

## Authentication Flow

The application uses JWT authentication:

1. User logs in or registers, receiving access and refresh tokens
2. Access token is used for authenticated API requests
3. If access token expires, refresh token is used to get a new one
4. For OAuth, the user is redirected to the provider's authentication page, then back to the application with tokens

## Features to Add

- More detailed analytics with charts
- Custom domain support
- User profile management
- Team collaboration features

## License

This project is licensed under the MIT License - see the LICENSE file for details.