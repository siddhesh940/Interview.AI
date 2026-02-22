/**
 * 🚀 Upload PDFs to Supabase Storage
 * 
 * HOW TO USE:
 * 1. Open terminal in the project root folder
 * 2. Run: node upload-pdfs-to-supabase.js
 * 
 * REQUIREMENTS:
 * - Your .env.local file must have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * - The "interview-pdfs" bucket must already exist in Supabase (PUBLIC bucket)
 * - npm packages already installed (@supabase/supabase-js)
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// ─── Load .env.local ─────────────────────────────────────────
function loadEnv() {
  // Try .env.local first, then .env
  let envPath = path.join(__dirname, '.env.local');
  if (!fs.existsSync(envPath)) {
    envPath = path.join(__dirname, '.env');
  }
  if (!fs.existsSync(envPath)) {
    console.error('❌ No .env.local or .env file found! Create one with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
    process.exit(1);
  }
  const content = fs.readFileSync(envPath, 'utf-8');
  const vars = {};
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex > 0) {
        const key = trimmed.substring(0, eqIndex).trim();
        const val = trimmed.substring(eqIndex + 1).trim();
        vars[key] = val;
      }
    }
  });
  return vars;
}

const env = loadEnv();
const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
// Prefer service_role key (bypasses RLS) over anon key
const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing from .env');
  process.exit(1);
}

if (!env.SUPABASE_SERVICE_ROLE_KEY) {
  console.log('⚠️  SUPABASE_SERVICE_ROLE_KEY not found — using anon key (may fail due to RLS)');
  console.log('   Add SUPABASE_SERVICE_ROLE_KEY to your .env file from:');
  console.log('   https://supabase.com/dashboard/project/rlqxnacafghtdfzczmyy/settings/api');
  console.log('   (Look for "service_role" under "Project API keys")\n');
} else {
  console.log('✅ Using service_role key (bypasses RLS)');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const BUCKET = 'interview-pdfs';

// ─── Folders to upload ────────────────────────────────────────
const FOLDERS_TO_UPLOAD = [
  'InterviewPrep',
  'TCS',
  'WIPRO',
  'INFOSYS',
  'CAPGEMINI',
  'COGNIZANT',
  'ACCENTURE',
  'pdfs',
];

// ─── Stats ────────────────────────────────────────────────────
let totalFiles = 0;
let uploaded = 0;
let skipped = 0;
let failed = 0;

async function uploadFile(localFilePath, storagePath) {
  try {
    const fileBuffer = fs.readFileSync(localFilePath);
    
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: 'application/pdf',
        upsert: true, // overwrite if exists
      });

    if (error) {
      // If file already exists and upsert fails, skip
      if (error.message && error.message.includes('already exists')) {
        skipped++;
        return;
      }
      console.error(`  ❌ Failed: ${storagePath} → ${error.message}`);
      failed++;
    } else {
      uploaded++;
    }
  } catch (err) {
    console.error(`  ❌ Error uploading ${storagePath}:`, err.message);
    failed++;
  }
}

async function uploadFolder(folderName) {
  const folderPath = path.join(__dirname, 'public', folderName);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`⚠️  Folder not found: public/${folderName} — skipping`);
    return;
  }

  const files = fs.readdirSync(folderPath);
  const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));
  
  console.log(`\n📁 ${folderName}/ — ${pdfFiles.length} PDF files found`);
  totalFiles += pdfFiles.length;

  // Upload 3 files at a time (parallel but not too aggressive)
  for (let i = 0; i < pdfFiles.length; i += 3) {
    const batch = pdfFiles.slice(i, i + 3);
    const promises = batch.map(file => {
      const localPath = path.join(folderPath, file);
      const storagePath = `${folderName}/${file}`;
      process.stdout.write(`  📄 Uploading: ${file.substring(0, 50)}${file.length > 50 ? '...' : ''}\r`);
      return uploadFile(localPath, storagePath);
    });
    await Promise.all(promises);
  }
  
  console.log(`  ✅ Done with ${folderName}/`);
}

async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  📤 Supabase PDF Uploader                       ║');
  console.log('║  Bucket: interview-pdfs (PUBLIC)                 ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`\n🔗 Supabase URL: ${SUPABASE_URL}`);
  console.log(`📦 Bucket: ${BUCKET}`);

  // Try to verify bucket exists (anon key may not have listBuckets permission)
  const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
  if (bucketError) {
    console.log(`⚠️  Cannot list buckets (anon key may not have permission) — proceeding anyway...`);
  } else {
    const bucketExists = buckets.some(b => b.name === BUCKET);
    if (!bucketExists) {
      console.log(`⚠️  Bucket "${BUCKET}" not found in listing — will try uploading anyway...`);
    } else {
      console.log(`✅ Bucket "${BUCKET}" found`);
    }
  }
  
  // Quick test: try listing the bucket root
  const { error: testError } = await supabase.storage.from(BUCKET).list('', { limit: 1 });
  if (testError) {
    console.error(`❌ Cannot access bucket "${BUCKET}": ${testError.message}`);
    console.error('   Make sure the bucket exists and is PUBLIC in Supabase Dashboard → Storage');
    process.exit(1);
  }
  console.log(`✅ Bucket "${BUCKET}" is accessible`);

  // Upload each folder
  for (const folder of FOLDERS_TO_UPLOAD) {
    await uploadFolder(folder);
  }

  // Print summary
  console.log('\n╔══════════════════════════════════════════════════╗');
  console.log('║  📊 Upload Summary                              ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`  Total files found:  ${totalFiles}`);
  console.log(`  ✅ Uploaded:         ${uploaded}`);
  console.log(`  ⏭️  Skipped (exist): ${skipped}`);
  console.log(`  ❌ Failed:           ${failed}`);
  
  if (failed === 0) {
    console.log('\n🎉 All PDFs uploaded successfully!');
    console.log('\nNow run these git commands:');
    console.log('  git rm -r --cached public/InterviewPrep public/TCS public/WIPRO public/INFOSYS public/CAPGEMINI public/COGNIZANT public/ACCENTURE public/pdfs');
    console.log('  git add .');
    console.log('  git commit -m "Move PDFs to Supabase Storage - fix 250MB limit"');
    console.log('  git push');
  } else {
    console.log(`\n⚠️  ${failed} files failed. Re-run the script to retry (it will skip already uploaded files).`);
  }
}

main().catch(err => {
  console.error('💥 Unexpected error:', err);
  process.exit(1);
});
