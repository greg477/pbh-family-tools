/* =====================================================================
   PBH Family Tools — Apple Watch read-out for a child's view-only screen
   © 2026 Greg Snyder, Ph.D. · Perspective Behavioral Health
   ---------------------------------------------------------------------
   GET /api/watch?s=<screen id>   →   plain text, e.g.
       "12 points · 3 more for Pick a show"
       "45m banked · 4-day streak"
       "$19.00 left this week · 2 sticks"
   An Apple Shortcut ("Get Contents of URL" → "Show Result") calls this,
   so a watch can show the number without running the web app.

   Read-only by design: it can only READ the child's copy (views/<id>),
   which the security rules already let anyone with the screen id read.
   It holds no keys or secrets and cannot write anything.
   Vercel runs any file in /api as a small server function automatically.
   ===================================================================== */
const PROJECT = process.env.PBH_FIREBASE_PROJECT || "pbh-family-tools-f2911";   // must match projectId in pbh-sync-config.js
const BASE = process.env.PBH_FIRESTORE_REST || "https://firestore.googleapis.com";

module.exports = async (req, res) => {
  const send = (code, text) => {
    res.statusCode = code;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(text);
  };
  let s = "";
  try { s = (new URL(req.url, "http://localhost").searchParams.get("s") || "").toLowerCase(); } catch (e) {}
  if (!/^[a-f0-9]{64}$/.test(s)) return send(400, "This watch link isn't complete. Ask a parent to copy it again.");
  try {
    const url = `${BASE}/v1/projects/${PROJECT}/databases/(default)/documents/views/${s}?mask.fieldPaths=state._show`;
    const r = await fetch(url, { cache: "no-store" });
    if (r.status === 404) return send(200, "Not switched on right now. Ask a parent.");
    if (!r.ok) return send(502, "Can't check right now. Try again in a minute.");
    const j = await r.json();
    const t = j && j.fields && j.fields.state && j.fields.state.mapValue && j.fields.state.mapValue.fields
      && j.fields.state.mapValue.fields._show && j.fields.state.mapValue.fields._show.stringValue;
    return send(200, t || "Almost ready. A parent just needs to tap something in the app once.");
  } catch (e) {
    return send(502, "Can't check right now. Try again in a minute.");
  }
};
