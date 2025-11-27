# Git History Cleanup Guide

## ⚠️ IMPORTANT: Your API key was exposed in git history

The API key `REMOVED_API_KEY` was found in `assets/portfolio.js` and needs to be removed from git history.

## Step 1: Rotate Your API Key IMMEDIATELY

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Find your Gemini API key
3. **Delete the exposed key** or restrict it immediately
4. Create a new API key
5. Add restrictions:
   - Application restrictions: None (for server-side use)
   - API restrictions: Limit to "Generative Language API"

## Step 2: Add the New Key to Your Backend

1. Create `server/.env` file:
   ```bash
   cd server
   cp .env.example .env
   ```

2. Add your NEW key to `server/.env`:
   ```
   GEMINI_API_KEY=your_new_api_key_here
   ```

## Step 3: Clean Git History

### Option A: Using git-filter-repo (Recommended)

1. **Install git-filter-repo:**
   ```bash
   # macOS
   brew install git-filter-repo
   
   # Or via pip
   pip3 install git-filter-repo
   ```

2. **Backup your repository:**
   ```bash
   cd ..
   cp -r swastik.github.io swastik.github.io.backup
   cd swastik.github.io
   ```

3. **Create a file with text to remove** (`replacements.txt`):
   ```
   REMOVED_API_KEY==>REMOVED_API_KEY
   ```

4. **Run git-filter-repo:**
   ```bash
   git filter-repo --replace-text replacements.txt --force
   ```

5. **Force push to remote:**
   ```bash
   git remote add origin git@github.com:sharmaswastik/swastik.github.io.git
   git push --force --all
   git push --force --tags
   ```

### Option B: Using BFG Repo-Cleaner

1. **Download BFG:**
   ```bash
   brew install bfg
   ```

2. **Clone a fresh copy:**
   ```bash
   cd ..
   git clone --mirror git@github.com:sharmaswastik/swastik.github.io.git
   cd swastik.github.io.git
   ```

3. **Create replacements.txt:**
   ```
   REMOVED_API_KEY==>REMOVED_API_KEY
   ```

4. **Run BFG:**
   ```bash
   bfg --replace-text replacements.txt
   ```

5. **Clean and push:**
   ```bash
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   git push --force
   ```

### Option C: Simple Approach (If History Isn't Critical)

If you don't have many important commits, you can start fresh:

1. **Create a new orphan branch:**
   ```bash
   git checkout --orphan clean-main
   git add .
   git commit -m "Initial commit with secure API setup"
   ```

2. **Delete old main and rename:**
   ```bash
   git branch -D main
   git branch -m main
   git push -f origin main
   ```

## Step 4: Verify the Key is Gone

```bash
# Search for the old key
git log -S "REMOVED_API_KEY" --all

# Should return nothing
```

## Step 5: Set Up the Backend Server

```bash
cd server
npm install
npm start
```

Test that the proxy works:
```bash
curl -X POST http://localhost:3000/api/gemini \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Say hello"}'
```

## Step 6: Update Your Frontend

Open `assets/portfolio.js` and update the production proxy URL:

```javascript
const PROXY_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api/gemini'
    : 'https://YOUR-BACKEND-DOMAIN.com/api/gemini';  // ← UPDATE THIS
```

## Deployment Options

### For GitHub Pages + Separate Backend:
- Deploy the server folder to Railway, Render, or Heroku
- Update `PROXY_URL` in `assets/portfolio.js` to point to your deployed server

### Better: Use a Platform with Serverless Functions:
- **Vercel** (recommended): Built-in serverless functions
- **Netlify**: Built-in serverless functions
- **Cloudflare Pages**: Workers for serverless functions

## Final Checklist

- [ ] Old API key deleted/restricted in Google Cloud Console
- [ ] New API key created with proper restrictions
- [ ] New key added to `server/.env` (never committed)
- [ ] `.gitignore` includes `.env` files
- [ ] Git history cleaned (key removed from all commits)
- [ ] Backend server running and tested
- [ ] Frontend updated with production proxy URL
- [ ] Changes committed and pushed with `--force`

## Need Help?

If you run into issues:
1. Check the server logs: `npm start` in the `server/` directory
2. Test the proxy endpoint with curl (see Step 5)
3. Check browser console for CORS errors
4. Verify environment variables are loaded correctly

---

**Remember:** Never commit API keys again! Always use environment variables and `.gitignore`.
