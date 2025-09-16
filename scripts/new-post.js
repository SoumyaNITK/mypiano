const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const { exec } = require("child_process");

const argv = process.argv.slice(2);
if (!argv.length) {
  console.error('Usage: npm run new -- "Post Title"');
  process.exit(1);
}

const title = argv.join(" ");
const date = new Date().toISOString().split("T")[0];
const slug = slugify(title, { lower: true, strict: true });
const filename = `${date}-${slug}.md`;
const dir = path.join(__dirname, "..", "src", "posts");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const content = `---
title: "${title}"
date: ${date}
layout: layouts/post.njk
section: notes
tags: []
---

Write your post here.
`;

const filepath = path.join(dir, filename);
fs.writeFileSync(filepath, content, "utf8");
console.log("✅ Created:", filepath);

// Open in Notepad
exec(`"C:\\Windows\\System32\\notepad.exe" "${filepath}"`, (err) => {
  if (err) console.error("⚠️ Could not open Notepad:", err.message);
});
