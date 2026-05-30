# ClustraNotes

ClustraNotes is a student-focused note-sharing platform. The goal is to make it easy for students to upload study material, discover useful notes, discuss them, and keep track of the resources they want to revisit.

This repository currently contains the backend API. A frontend application has not been checked in yet. The local workspace may contain an empty `client/` placeholder, but Git does not preserve empty directories.

## Features At A Glance

- **Discover study material:** browse a public feed and search notes by title or subject.
- **Filter notes:** narrow the feed by semester, category, or course.
- **Upload notes:** share PDF, DOCX, TXT, PPTX, JPEG, and PNG files with academic metadata.
- **Organize content:** add a title, description, subject, category, tags, course, university, semester, and language.
- **Sign in with Firebase:** verify Firebase ID tokens and create a matching MongoDB user profile on first login.
- **Manage profiles:** update student details and upload an avatar.
- **Discuss notes:** create comments, add one level of replies, edit your own comments, and soft-delete them.
- **React to content:** like notes and comments, and bookmark notes.
- **Track engagement:** store views, likes, bookmarks, comments, downloads, ratings, and moderation-related metadata.

## Current Status

ClustraNotes is under active development. The backend has a substantial API foundation, but it is not production-ready yet.

- A frontend application has not been checked in yet.
- Automatic thumbnail generation is intentionally on hold.
- Bookmarking comments is planned but not implemented yet.
- Automated tests have not been added yet.
- The current backend build has unfinished like-module wiring, so `pnpm run build` does not pass yet.

## How The App Is Designed To Work

1. A client application signs a user in with Firebase Authentication.
2. The client receives a Firebase ID token.
3. The client sends that token to the backend as `Authorization: Bearer <token>`.
4. `POST /api/v1/auth/login` verifies the token and creates the user's MongoDB profile if it does not already exist.
5. The user can upload notes, update their profile, comment, like content, and bookmark notes.
6. Anyone can browse the public note feed and read note comments.

## Tech Stack

| Area | Technology |
| --- | --- |
| API | Node.js, Express 5, TypeScript |
| Database | MongoDB with Mongoose |
| Authentication | Firebase Authentication through the Firebase Admin SDK |
| File storage | Firebase Cloud Storage |
| Validation | Zod |
| File uploads | Multer |
| API middleware | CORS, Helmet, Compression, Morgan, Cookie Parser |
| Package manager | pnpm |

## Repository Structure

```text
ClustraNotes/
|-- server/
|   |-- src/
|   |   |-- config/             # Database and environment configuration
|   |   |-- firebase/           # Firebase Admin SDK setup
|   |   |-- infrastructure/
|   |   |   `-- storage/        # Firebase Storage provider and file validation
|   |   |-- modules/
|   |   |   |-- auth/           # Firebase login and MongoDB user creation
|   |   |   |-- bookmarks/      # Bookmark toggling
|   |   |   |-- comments/       # Comments and replies
|   |   |   |-- likes/          # Likes for notes and comments
|   |   |   |-- notes/          # Note uploads, feed, details, updates, and deletion
|   |   |   `-- users/          # User profiles and avatars
|   |   |-- routes/             # Top-level API routes
|   |   `-- shared/             # Shared middleware, helpers, types, and utilities
|   |-- package.json
|   `-- tsconfig.json
`-- README.md
```

## Beginner Setup Guide

### 1. Install The Prerequisites

You need:

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/installation)
- A MongoDB database, either local or hosted
- A Firebase project with Authentication and Cloud Storage enabled
- A Firebase service account JSON file for the Admin SDK

### 2. Install Backend Dependencies

Run these commands from the repository root:

```bash
cd server
pnpm install
```

### 3. Add Firebase Credentials

Place your Firebase service account JSON file somewhere inside `server/` that is ignored by Git. For example:

```text
server/src/firebase/local.service-account.json
```

Never commit this file. It contains private credentials.

### 4. Create The Environment File

Create `server/.env`:

```dotenv
PORT=1500
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/clustra-notes

FIREBASE_ADMIN_FILE_PATH=./src/firebase/local.service-account.json
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
PUBLIC_FILE_PATH_INITIAL=https://storage.googleapis.com
```

Environment variable reference:

| Variable | Purpose |
| --- | --- |
| `PORT` | Port used by the API server. The development fallback is `1500`. |
| `CLIENT_URL` | Frontend origin allowed by CORS. If omitted, the current code allows any origin. |
| `MONGODB_URI` | Connection string for MongoDB. |
| `FIREBASE_ADMIN_FILE_PATH` | Path to the Firebase service account JSON file, relative to `server/`. |
| `FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket name. |
| `PUBLIC_FILE_PATH_INITIAL` | Base URL used when creating public upload URLs. |

### 5. Start The Development Server

From the `server/` directory:

```bash
pnpm run dev
```

The current checkout still has the like-module wiring gap listed in [Current Status](#current-status). Until that is fixed, the server will not complete startup.

Once the server starts successfully, the API should be available at:

```text
http://localhost:1500
```

Check the health route in a browser or with curl:

```bash
curl http://localhost:1500/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is running"
}
```

## API Overview

All versioned API routes start with:

```text
/api/v1
```

Protected routes expect this header:

```text
Authorization: Bearer <firebase-id-token>
```

The route map below is a guide to the currently wired API surface. Some routes are still being hardened as development continues.

| Method | Route | Access | Purpose |
| --- | --- | --- | --- |
| `GET` | `/health` | Public | Check whether the server is running |
| `POST` | `/api/v1/auth/login` | Firebase token | Verify login and create the MongoDB user if needed |
| `GET` | `/api/v1/note/feed` | Public | Browse and search published public notes |
| `POST` | `/api/v1/note/create` | Firebase token | Upload a note using multipart form data |
| `GET` | `/api/v1/note/:noteId` | Firebase token | Fetch one note |
| `PATCH` | `/api/v1/note/:noteId` | Firebase token | Update your own note metadata |
| `DELETE` | `/api/v1/note/delete/:noteId` | Firebase token | Delete your own note |
| `GET` | `/api/v1/note/:noteId/comments` | Public | Read top-level comments |
| `POST` | `/api/v1/note/:noteId/comments` | Firebase token | Add a comment or reply |
| `GET` | `/api/v1/comment/:commentId/replies` | Public | Read replies to a comment |
| `PATCH` | `/api/v1/comment/:commentId` | Firebase token | Edit your own comment |
| `DELETE` | `/api/v1/comment/:commentId` | Firebase token | Soft-delete your own comment |
| `POST` | `/api/v1/note/:noteId/like` | Firebase token | Like or unlike a note |
| `POST` | `/api/v1/comment/:commentId/like` | Firebase token | Like or unlike a comment |
| `POST` | `/api/v1/bookmark/Note/:noteId` | Firebase token | Bookmark or unbookmark a note |
| `GET` | `/api/v1/me` | Firebase token | Fetch your personal profile |
| `PATCH` | `/api/v1/me` | Firebase token | Update your profile |
| `PATCH` | `/api/v1/me/avatar` | Firebase token | Upload a new avatar |

Example public feed request:

```bash
curl "http://localhost:1500/api/v1/note/feed?page=1&limit=15&q=calculus&semester=2"
```

## Supported Uploads

### Notes

| File type | Accepted MIME types |
| --- | --- |
| PDF | `application/pdf` |
| Word document | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` |
| Text file | `text/plain` |
| PowerPoint | `application/vnd.openxmlformats-officedocument.presentationml.presentation` |
| Image | `image/jpeg`, `image/png` |

The current note upload service enforces a maximum file size of `10 MB`.

### Avatars

Avatar uploads support JPEG, PNG, HEIC, and HEIF images up to `5 MB`.

## Useful Backend Commands

Run these from `server/`:

```bash
pnpm run dev      # Start the API with automatic reloads
pnpm run build    # Compile TypeScript into dist/
pnpm run start    # Run the compiled API after a successful build
pnpm run lint     # Run ESLint
pnpm run format   # Format the project with Prettier
```

## Notes For Contributors

- Keep backend source code inside `server/src`.
- Run backend commands from `server/` because Firebase credential paths are resolved from the current working directory.
- Keep `.env` files, Firebase service account files, and generated build output out of Git.
- Treat the API as evolving while the backend build gaps and missing tests are addressed.
- Add frontend documentation when a client implementation is checked in.

## License

The backend package currently declares the ISC license.
