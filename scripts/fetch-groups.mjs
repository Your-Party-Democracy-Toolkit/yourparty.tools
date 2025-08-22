import fs from 'node:fs'
import dotenv from 'dotenv'
import PublicGoogleSheetsParser from 'public-google-sheets-parser'

dotenv.config()

const SHEET_ID = process.env.GROUPS_SHEET_ID
const GID = process.env.GROUPS_SHEET_GID || '0'
const dir = 'content/groups'

if (!SHEET_ID) {
  console.error('Missing GROUPS_SHEET_ID')
  process.exit(1)
}

const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`

const parser = new PublicGoogleSheetsParser(SHEET_ID)

const data = await parser.parse()

// Each file in data collection should contain only one object
// (content/groups/[name].json)

// first clear the dir
fs.rmSync(dir, { recursive: true, force: true })
fs.mkdirSync(dir)

for (const [i, obj] of data.entries()) {
  fs.writeFileSync(`${dir}/${i}.json`, JSON.stringify(obj, null, 2))
}