# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Running Locally

To run this project on your local machine using Visual Studio Code, follow these steps:

### Prerequisites

*   [Node.js](https://nodejs.org/) (version 18 or later recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   A code editor like [Visual Studio Code](https://code.visualstudio.com/)

### 1. Install Dependencies

Open the project folder in VS Code, then open the integrated terminal (`View` > `Terminal` or `Ctrl+\``) and run the following command to install all the necessary packages:

```bash
npm install
```

### 2. Set Up Environment Variables

The application requires API keys for Firebase and Google Maps to function correctly.

1.  Create a new file named `.env` in the root of the project.
2.  Copy the contents from `.env.example` into your new `.env` file.
3.  Fill in the required values for Firebase and Google Maps. You can get these from your Firebase and Google Cloud project settings.

### 3. Run the Application

You need to run two separate processes in two different terminals for the full application to work.

**Terminal 1: Run the Next.js App**

This command starts the main web application.

```bash
npm run dev
```

Your application will be available at [http://localhost:9002](http://localhost:9002).

**Terminal 2: Run the Genkit AI Server**

This command starts the Genkit development server, which handles all the AI-powered features like route planning.

```bash
npm run genkit:dev
```

This will run the AI flows and make them available for the Next.js app to call. You can inspect your flows at the Genkit developer UI, which is usually available at `http://localhost:4000`.

Now, both parts of your application are running, and you can start developing!
