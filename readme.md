# Dicoding Submission

This repository serves as the queue consumer for the [Open Music API project](https://github.com/fajrianwarf/open-music-api). It utilizes Redis and RabbitMQ to handle message queuing and processing tasks related to the main API operations.

## Prerequisites

Ensure you have Redis and RabbitMQ installed and running on your system as they are crucial for the message queue operations.

## Getting Started

1. **Configure Environment Variables**  
   Copy the contents of `.env.example` to a new file named `.env` and fill in the required credentials.

2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Start the Project**
   ```bash
   npm start
   ```
