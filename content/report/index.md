---
title: "Report in!"
description: "Share a short write-in from your local organising."
nav_title: "Report in!"
updated: 2025-08-22
---

Use the form below to send a short report. An editor will review before publishing.

<form method="post" action="/api/report" class="space-y-3">
  <input name="title" placeholder="Title" required class="border p-2 rounded w-full" />
  <input name="city" placeholder="City" class="border p-2 rounded w-full" />
  <input name="region" placeholder="Region" class="border p-2 rounded w-full" />
  <textarea name="body" placeholder="What happened? What should others copy?" required class="border p-2 rounded w-full" rows="6"></textarea>
  <input name="link" placeholder="Link to notes (optional)" class="border p-2 rounded w-full" />
  <button type="submit" class="border px-3 py-2 rounded">Send</button>
</form>
