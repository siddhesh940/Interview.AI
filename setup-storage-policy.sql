-- Run this in Supabase SQL Editor to allow file uploads to interview-pdfs bucket
-- After running this, the upload script will work with the anon key

-- Allow anyone to upload files to the interview-pdfs bucket
CREATE POLICY "Allow public uploads to interview-pdfs"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'interview-pdfs');

-- Allow anyone to update files in the interview-pdfs bucket  
CREATE POLICY "Allow public updates to interview-pdfs"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (bucket_id = 'interview-pdfs');

-- Allow anyone to read files from the interview-pdfs bucket
CREATE POLICY "Allow public reads from interview-pdfs"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'interview-pdfs');
