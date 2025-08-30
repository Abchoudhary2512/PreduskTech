# PreduskTech Dashboard

PreduskTech Dashboard is a React-based web application that allows users to:

- Fetch user profiles by email
- Search profiles, projects, and skills globally
- Load projects filtered by skills

The backend is powered by **Supabase**, providing a REST API for fetching and managing profiles, projects, and skills.


## ScreenShots
<img width="1892" height="863" alt="image" src="https://github.com/user-attachments/assets/d8ede49f-2e02-4f49-aa0b-c38c1495925b" />
<img width="1367" height="817" alt="image" src="https://github.com/user-attachments/assets/b2178d9f-493d-4e2a-929a-b85beb153a9f" />
<img width="922" height="679" alt="image" src="https://github.com/user-attachments/assets/680c9d55-64a9-4a10-a8d0-77bbdeecfda1" />
<img width="1304" height="311" alt="image" src="https://github.com/user-attachments/assets/50af7a18-9a61-40d1-b883-d87ecc15e55a" />
<img width="1670" height="783" alt="image" src="https://github.com/user-attachments/assets/59240187-b97a-41fd-b8b2-d3fe0a022d56" />
<img width="1718" height="868" alt="image" src="https://github.com/user-attachments/assets/31e7a21e-7539-4c6e-8b29-ab2b9f386200" />



## Architecture

### Frontend

- **Framework:** React 
- **UI Components:** Shadcn/UI, TailwindCSS
- **Data Fetching:** `useSWRMutation`
- **Notifications:** `react-hot-toast`
- **Responsibilities:**
  - Fetch profiles
  - Search globally
  - Filter projects by skill
  - Render responsive UI

### Backend

- **Server:** Node.js / Express or Next.js API routes
- **Database:** Supabase (PostgreSQL)
- **Responsibilities:**
  - CRUD operations on profiles
  - Global search endpoint
  - Projects by skill endpoint
  - Data aggregation (profiles, skills, projects, work, links)

### Setup
1. Clone the repository:
- git clone https://github.com/Abchoudhary2512/PreduskTech
- cd PreduskTech
2. Frontend Setup:
  - cd frontend
  - npm i
  - Create a .env file in the frontend directory with the following content:
  - NEXT_PUBLIC_API_URL=http://localhost:5000
3. Backend Setup:
  - cd ../backend
  - npm i
  - Create a .env file in the backend directory with the following content:
  - SUPABASE_URL=your_supabase_url
  - SUPABASE_KEY=your_supabase_key
4. Database Setup:
   -Log in to your Supabase dashboard.
  - Create a new project.
  - Set up the following tables:
   <img width="945" height="631" alt="image" src="https://github.com/user-attachments/assets/90d1dedc-a068-44b6-8230-5addbff09c09" />

  -Ensure the relationships between tables are set up correctly. 


### Production Deploymment
  - Frontend Deployment:
    • Deploy the frontend using Vercel or Netlify
    • Set the environment variable NEXT_PUBLIC_API_URL to your backend API URL.

  - Backend Deployment:
  • Deploy the backend using Render or Heroku
  • Set the environment variables SUPABASE_URL and SUPABASE_KEY to your Supabase credentials.

### Limitations:
  1. Search Functionality: Currently, the search is based on ilike queries, which may not be efficient for large datasets.

  2. Authentication: There is no authentication mechanism implemented; any user can access the profiles.

  3. Data Validation: Minimal data validation is performed; ensure data integrity at the application level.

  4. Error Handling: Basic error handling is in place; consider implementing more robust error handling for production environments.
