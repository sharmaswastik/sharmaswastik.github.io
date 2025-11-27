/* Frontend logic (Gemini calls proxied via Netlify function) */

// --- AI FEATURE 1: EXPLAIN PROJECT ---
async function callGeminiAPI(prompt) {
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Gemini error');
    return data.text;
  } catch (e) {
    console.error('Frontend Gemini error:', e);
    showToast('AI Service Unavailable');
    return 'Sorry, the AI service is currently unavailable.';
  }
}

async function explainProject(sourceId, targetId) {
  const descText = document.getElementById(sourceId).innerText;
  const targetEl = document.getElementById(targetId);
  targetEl.classList.remove('hidden');
  targetEl.innerHTML = `<div class="flex items-center gap-2"><i data-lucide="loader-2" class="animate-spin w-4 h-4"></i> Simplifying complex concepts...</div>`;
  if (window.lucide) lucide.createIcons();
  const prompt = `You are a helpful science communicator. Rewrite the following research project description so it is easy for a high school student to understand. Keep it under 2 sentences. Description: "${descText}"`;
  const result = await callGeminiAPI(prompt);
  targetEl.innerHTML = `<strong class="block mb-1 text-[var(--text-main)] opacity-80">Simpler Explanation:</strong> ${result}`;
}

// --- AI FEATURE 2: SMART DRAFT ---
async function draftEmail() {
  const topic = document.getElementById('draft-topic').value;
  if (!topic) { showToast('Please enter a topic first'); return; }
  const msgBox = document.getElementById('message-box');
  const originalPlaceholder = msgBox.placeholder;
  msgBox.placeholder = '✨ AI is drafting your email...';
  msgBox.value = '✨ Drafting...';
  msgBox.classList.add('animate-pulse');
  const prompt = `Draft a professional, concise email to Swastik Sharma (a PhD Candidate at IIT Kanpur) regarding the following topic: "${topic}". The sender is a fellow researcher. Keep it under 100 words. Only output the body of the email.`;
  const result = await callGeminiAPI(prompt);
  msgBox.classList.remove('animate-pulse');
  msgBox.value = result;
  msgBox.placeholder = originalPlaceholder;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'show';
  setTimeout(() => { toast.className = toast.className.replace('show',''); }, 3000);
}

// Minimal init (icons + year)
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
