# Real Time Chatting Application

A real-time chatting application built using Node.js, Express.js, Socket.io, and MongoDB.

## Features

- Real-time messaging
- User connection tracking
- Active users list
- Typing indicator
- Message timestamps
- Chat history storage in MongoDB
- Load previous messages on join
- Different UI for sender and receiver messages
- Automatic user disconnect handling

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- Socket.io

### Database
- MongoDB
- Mongoose

## Project Structure

```
Chatting Application/
│
├── client.html
├── chat.js
├── style.css
│
├── server.js
├── config.js
├── chat.schema.js
├── dotenv.js
│
├── package.json
└── .env
```

## Installation

### Install Dependencies

```bash
npm install
```

### Start MongoDB

Make sure MongoDB is running locally.

```bash
mongodb://localhost:27017/ChattingApp
```

### Start Server

```bash
nodemon server.js
```

or

```bash
node server.js
```

## Socket Events

### Client → Server

- join
- newMessage
- typing

### Server → Client

- countUserLive
- broadCastMsg
- loadingMsg
- typingBroadcast

## Future Improvements

- User avatars
- Authentication
- Private messaging
- Online/Offline status
- Message seen status
- Group chat support
- Emoji support

## Author

Krishna Singh

Learning Full Stack Developer
