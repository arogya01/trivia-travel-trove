# Welcome to your Project

## How can I edit this code?

There are several ways of editing your application.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Tech Stack

This project is built with:

- **Vite**: Fast, modern frontend build tool
- **TypeScript**: JavaScript with syntax for types
- **React**: UI component library
- **shadcn-ui**: Reusable UI components
- **Tailwind CSS**: Utility-first CSS framework
- **Together AI**: Image generation API

## Together AI Integration

This project uses Together AI for generating travel-themed images. To set up the integration:

1. Sign up for an account at [Together AI](https://www.together.ai/)
2. Get your API key from the Together AI dashboard
3. Create a `.env.local` file in the root of your project (if it doesn't exist)
4. Add your API key to the `.env.local` file:
   ```
   NEXT_PUBLIC_TOGETHER_API_KEY=your_together_api_key_here
   ```
5. Restart your development server

## Deployment

You can deploy this project using services like:

- Netlify
- Vercel
- GitHub Pages
- AWS Amplify
