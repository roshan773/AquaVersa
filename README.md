# FishVerse - Aquarium & Fish Care Portal

FishVerse is a production-ready, SEO-optimized web application designed for fish-keeping and aquarium hobbyists. It helps users explore fish species care, verify tank mate compatibility, size equipment setups, and diagnose common diseases.

## Tech Stack
* **Frontend**: Next.js 14+ (App Router) with TypeScript & Tailwind CSS (v4)
* **Backend**: Node.js + Express REST API with TypeScript
* **Database**: MongoDB with Mongoose ODM
* **State Management**: Zustand / React Context for client state, TanStack React Query for cached server state
* **Icons**: Lucide React

---

## Directory Structure

```text
AquaVersa/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection setup
│   │   ├── controllers/     # Compatibility and equipment calculator logic
│   │   ├── models/          # Mongoose Schemas (Fish, Plant, Disease, Medicine)
│   │   ├── routes/          # Versioned API routes (/api/v1/...)
│   │   ├── scripts/         # DB Seed script
│   │   ├── tests/           # Logic unit tests
│   │   ├── app.ts           # Express Application definition
│   │   └── server.ts        # Express Server Entrypoint
│   ├── jest.config.js       # Testing settings
│   ├── tsconfig.json        # TS settings
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js pages (App Router)
│   │   ├── components/      # Reusable views (Navbar, Footer, FishCard, CatalogClient)
│   │   └── lib/             # API client client-side fetchers
│   ├── tsconfig.json        # TS settings
│   └── package.json
│
└── README.md                # System documentation
```

---

## Setup & Running Locally

### Prerequisites
* **Node.js**: v18+ (tested on v22)
* **MongoDB**: A running local MongoDB instance or a MongoDB Atlas Connection String.

### 1. Setup Backend
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `/backend` (or copy `.env.example`):
   ```ini
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/fishverse
   JWT_SECRET=supersecretjwtkeychangeinproduction
   ```
4. Run the seed script to populate the database with ~15 detailed fish species, diseases, medicines, and plants:
   ```bash
   npm run seed
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend will start listening on `http://localhost:5000`.

### 2. Setup Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

---

## Testing & Verification
We use Jest for unit testing backend controllers. To run tests, navigate to the `/backend` directory and execute:
```bash
npm test
```
The test suite validates:
* Water parameter intersection checks
* Temperament matches
* Special species constraints (Bettas, Tiger Barbs)
* Predator-prey sizing warnings
* Filter and heater calculations