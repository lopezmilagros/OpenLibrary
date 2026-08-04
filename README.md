# Book explorer
    This web application allows you to search for books by title or author, apply filters and view detailed information about each book. Users can see the book cover, author, publication year and description.

    The project was developed using React, TypeScript and Vite.

## Features
- Watch books in a card grid with infinite scrolling. Initial data loads on page when it is opened.
- Search for books by title or author using a search bar.
- Filter books by year or sort them.
- View detailed information about the book you choose.
- Button "home" to return to the initial view.
- Button "contact" to view my contact information.

## How to run
1. Clone the repository. Open a terminal and run:
```bash
git clone https://github.com/lopezmilagros/NOMBRE-DEL-REPOSITORIO.git
```

2. Navigate to the project folder:
```bash
cd CHALLENGE
```

3. Install dependencies:
```bash 
npm install
```

4. Start the development server:
```bash
npm run dev
```
if it fails, try:
```bash
npm.cmd run dev
```

5. Finally, open your browser and go to: http://localhost:5173/



## Decisions
### React and TypeScript
I used React to construct the interface using reusable components and make the application easier to organize, and I used TypeScript to add static typing, and make the code easier to read.
### Tailwind CSS
I used tailwind CSS to design the interface, prioritizing simplicity and clear navigation.
### Architecture
The architecture was divided in components to split responsibilities and organize the code.
The project structure is:

```text
Challenge/
└── src/
    ├── Assets/
    │   └── logo.png
    │
    ├── components/
    │   ├── BookCard.tsx
    │   ├── BookDetail.tsx
    │   ├── ContactDetail.tsx
    │   ├── Filters.tsx
    │   └── SearchBar.tsx
    │
    ├── services/
    │   └── OpenLibrary.ts
    │
    ├── types/
    │   └── book.ts
    │
    ├── App.css
    ├── App.tsx
    ├── index.css
    └── main.tsx
```
Main components and what they do:
- BookCard: shows a summarized information about each book.
- BookDetail: shows information about the selected book.
- SearchBar: allows you to search for books.
- Filters: allows you to apply filters and sort the results.
- OpenLibrary: connects the application to the Open Library API.
- Book.ts: defines the "book" type.
- App: manages the main application state and navigation.

### URL state
I made the decision to reflect searches and filters in the query parameters to make the appication´s shareable and bookmarkable.
This allows the users to share a specific search or save it as a bookmark

### Favorites
I decided not to add a favorites feature, because a i did not consider it necessary or consistent with an application that does not have user accounts or a database. 
Users cannot save their favorite books, but they can save their searches through URLs that reflect the current search state.

### Button Home
I decided to have a button that allows users to go back to the initial state of the app, so they don´t have to use the borwser´s back button.
This button clears the URL parameters and takes the user back to the start.

### Loading and error states
The appication includes loading and error states to inform users when data is being loaded or when an error occurs.


## What I would improve
- I would allow users to create accounts and store their information in a database.
- Then, I would allow each user to have a personal list of favorite books if needed.
- I would add a review system so users could share their opinions about books they have read and help other users.
- I would also add a section to the book details where registered users could see nearby libraries that have the selected book.