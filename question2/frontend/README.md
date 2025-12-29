# Habit Tracker Frontend

Next.js React application for tracking daily habits.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Build for Production

```bash
npm run build
npm start
```

## Features

- **Authentication**: Login and signup pages
- **Habit Dashboard**: View all your habits
- **Create Habits**: Add new habits with name and description
- **Mark Complete**: Mark habits as done for today
- **Visual Indicators**: See completion status with ✓ or ✗
- **Responsive Design**: Works on desktop and mobile

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Dashboard (home page)
│   ├── login/
│   │   └── page.tsx      # Login/Signup page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── HabitList.tsx    # List of habits
│   ├── HabitItem.tsx    # Individual habit item
│   └── HabitForm.tsx    # Form to create habits
├── context/
│   └── AuthContext.tsx  # Authentication context
└── lib/
    └── api.ts           # API client functions
```

## Usage

1. Navigate to `/login` to sign up or login
2. After authentication, you'll be redirected to the dashboard
3. Add habits using the form at the top
4. Mark habits as complete using the "Mark as Done" button
5. Visual indicators show completion status for today

## API Integration

The frontend communicates with the backend API at the URL specified in `NEXT_PUBLIC_API_URL`. All API calls are handled in `src/lib/api.ts`.

Authentication tokens are stored in localStorage and automatically included in API requests.

