# NeDB Car Management Application

A simple web application for managing a car database using NeDB, Express.js, and Handlebars. This project demonstrates basic CRUD (Create, Read, Update, Delete) operations with a clean, user-friendly interface.

## What It Does

This application provides a web-based interface to manage car records with the following attributes:
- Insurance status
- Fuel type
- Damage status
- Four-wheel drive capability

Users can add new cars, view all stored cars, edit existing records, and delete cars from the database—all through an intuitive web interface.

## Key Features

✨ **Add Cars** - Create new car records with detailed attributes  
📋 **View List** - Display all stored cars in a clean, organized table  
✏️ **Edit Records** - Modify existing car data in-place  
🗑️ **Delete Cars** - Remove unwanted records from the database  
💾 **Persistent Storage** - Data is stored in NeDB for persistence across sessions  
🎨 **Responsive Design** - User-friendly interface built with Handlebars templates  

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NEDB-Project
```

2. Install dependencies:
```bash
npm install
```

This will install:
- **Express.js** - Web framework
- **express-handlebars** - Template engine
- **NeDB** - Embedded NoSQL database

### Running the Application

Start the server:
```bash
node server.js
```

You should see:
```
start serwera na porcie 3000
```

Open your browser and navigate to:
```
http://localhost:3000
```

### Usage Examples

**Home Page**
- Visit `http://localhost:3000` to see the home page with welcome message

**Add a Car**
- Go to `/add` page
- Fill in the car attributes (insurance, fuel type, damage status, four-wheel drive)
- Submit the form to add the car to the database

**View All Cars**
- Visit `/list` to see all cars currently in the database
- Each car displays its ID and all attributes
- Delete button is available for each car

**Edit a Car**
- Go to `/edit` to see all cars
- Click the edit button next to a car to modify its attributes
- Update or cancel changes as needed

## Project Structure

```
.
├── server.js              # Main Express server with all routes
├── package.json           # Project dependencies and metadata
├── data/
│   ├── data.json         # Initial context data
│   └── kolekcja.db       # NeDB database file (auto-created)
├── views/                 # Handlebars template files
│   ├── index.hbs         # Home page
│   ├── add.hbs           # Add car form
│   ├── list.hbs          # Car listing page
│   ├── edit.hbs          # Edit car page
│   ├── layouts/
│   │   └── main.hbs      # Main layout template
│   └── partials/
│       ├── row.hbs       # Car row template
│       └── editRow.hbs   # Editable car row template
└── static/               # Static assets
    ├── css/
    │   └── index.css     # Stylesheet
    └── js/
        └── index.js      # Client-side scripts
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page |
| GET | `/add` | Add car form page |
| POST | `/addCar` | Submit new car |
| GET | `/list` | View all cars |
| POST | `/deleteCar` | Delete a car |
| GET | `/edit` | Edit cars page |
| POST | `/editCar` | Toggle edit mode |
| POST | `/updateCar` | Save car changes |
| POST | `/cancelUpdate` | Cancel edit mode |

## Data Schema

Each car record in the database contains:
```javascript
{
  _id: "auto-generated-id",
  insurance: "yes" | "no",
  gasoline: "yes" | "no",
  damaged: "yes" | "no",
  fourWheels: "yes" | "no"
}
```
