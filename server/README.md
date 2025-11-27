# Gemini API Proxy Server

This is a secure proxy server that handles Gemini API requests, keeping your API key safe on the backend.

## Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Create your `.env` file:**
   ```bash
   cp .env.example .env
   ```

3. **Add your Gemini API key to `.env`:**
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3000
   ALLOWED_ORIGIN=https://yourdomain.com
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### POST `/api/gemini`
Proxies requests to the Gemini API.

**Request body:**
```json
{
  "prompt": "Your prompt text here"
}
```

**Response:**
```json
{
  "text": "Gemini's response here"
}
```

### GET `/health`
Health check endpoint.

## Security Notes

- Never commit the `.env` file
- In production, set `ALLOWED_ORIGIN` to your actual domain
- Consider adding rate limiting for production use
- Rotate your API key if it was previously exposed

## Deployment Options

### Option 1: Traditional Server (e.g., DigitalOcean, AWS EC2)
Deploy this Node.js server and configure environment variables.

### Option 2: Serverless (Recommended for static sites)
Convert to serverless functions:
- **Vercel:** Create `api/gemini.js` in your project root
- **Netlify:** Create `netlify/functions/gemini.js`
- **Cloudflare Workers:** Adapt the logic to Workers format

## Alternative: Static Site with Serverless Functions

If you're hosting on GitHub Pages, consider:
1. Move to Vercel/Netlify (they support serverless functions)
2. Or use this server on a separate host (e.g., Railway, Render)
