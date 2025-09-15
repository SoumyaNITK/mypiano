const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const { execSync } = require("child_process");

const argv = process.argv.slice(2);
if (!argv.length) {
  console.error('Usage: npm run new -- "Post Title" [--section=notes|chords|others] [--tags="a,b"]');
  process.exit(1);
}

let title = null;
const flags = {};
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith("--")) {
    const [k,v] = a.split("=");
    flags[k.replace(/^--/, "")] = v === undefined ? true : v;
  } else if (!title) {
    title = a;
  }
}

const section = flags.section || "notes";
const tags = flags.tags ? flags.tags.split(",").map(t => t.trim()).filter(Boolean) : [];

const dateObj = new Date();
const datePrefix = dateObj.toISOString().split("T")[0];
const slug = slugify(title, { lower: true, strict: true });
const filename = `${datePrefix}-${slug}.md`;

const dir = path.join(__dirname, "..", "src", "posts");
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const frontmatter = [
  "---",
  `title: "${title.replace(/"/g,'\\"')}"`,
  `date: ${datePrefix}`,
  `section: ${section}`,
  `tags: [${tags.map(t=>'"'+t+'"').join(",")}]`,
  `layout: layouts/post.njk`,
  "---",
  "",
  "Write your post content in Markdown below.",
  "",
  "### Example",
  "",
  "- Add your chords/notes here"
];

const filepath = path.join(dir, filename);
fs.writeFileSync(filepath, frontmatter.join("\n"), "utf8");
console.log("✅ Created:", filepath);

// Open in Notepad
execSync(`start notepad "${filepath}"`);
