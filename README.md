Project Overview

This project is a frontend application that manages a product list with advanced state handling, including optimistic updates, undo/redo functionality, and background data synchronization.

The focus of this implementation is not just UI, but handling real-world complexities like async operations, race conditions, and state consistency.

## Key Features
- Product table with search, filter, and sorting
- Inline category editing with optimistic updates
- Undo / Redo using patch-based history
- Simulated API with delay and failure handling
- Background data updates (price & rating)
- Conflict resolution between user actions and server updates


## Architecture Decisions

### State Management
Used Zustand for:
- Lightweight global state
- Fine-grained subscriptions
- Better control over async + history logic


### Data Flow
Server State (products) --> Derived State (filter/search/sort) --> UI


### Optimistic Updates
- UI updates immediately
- API call happens in background
- On failure → rollback


### Undo / Redo Strategy
- Implemented using patch-based history
- Stores only category changes
- Efficient and memory-friendly


### Race Condition Handling
- Each update uses a requestId
- Only latest response is applied
- Prevents stale updates overriding new ones


### Background Sync
- Polling every 5 seconds
- Updates price & rating
- Skips rows under user interaction


### Tech Stack
- React + TypeScript
- Zustand (state management)
- Tailwind CSS

### How to Run
npm install
npm run dev