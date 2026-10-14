/* =====================================================================
   PBH Family Sync — Firebase settings (ONE file, shared by all three apps)
   © 2026 Greg Snyder, Ph.D. · Perspective Behavioral Health
   ---------------------------------------------------------------------
   1. Paste the values from your Firebase project below (Firebase console
      → Project settings → Your apps → Web app → firebaseConfig).
   2. Upload this file next to the app files on GitHub.
   Families who never turn on Family Sync never download this file
   (it's only fetched when a parent opens Settings → Sync).
   These values are not secret — every web app sends them to the
   browser. What protects families' data is the security rules
   (firestore.rules), so make sure those are published.
   ===================================================================== */
window.PBH_FIREBASE_CONFIG = {
  apiKey: "AIzaSyB1YMOAyU-zgp02iYu4qkJQJg3MyCgZBUY",
  authDomain: "pbh-family-tools-f2911.firebaseapp.com",
  projectId: "pbh-family-tools-f2911",
  storageBucket: "pbh-family-tools-f2911.firebasestorage.app",
  messagingSenderId: "29490368396",
  appId: "1:29490368396:web:ad8f26d5d5cd75e8f110a9"
};

/* Who can start a family?
   "open"   — any family can tap "Start a family" and make their own code.
   "invite" — no Start button; only codes YOU create in the Firebase
              console (collection allowedFamilies) will work.
   This must match the rules block you published in firestore.rules. */
window.PBH_SYNC_MODE = "open";
