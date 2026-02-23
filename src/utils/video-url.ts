/**
 * Video URL utility
 * 
 * Since video files are stored via Git LFS and Vercel doesn't serve LFS files,
 * we serve videos directly from GitHub's media server for the deployed version.
 * Locally, videos are served from the public/ folder as usual.
 */

const GITHUB_OWNER = 'siddhesh940';
const GITHUB_REPO = 'Interview.AI';
const GITHUB_BRANCH = 'main';

const GITHUB_MEDIA_BASE = `https://media.githubusercontent.com/media/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/public`;

/**
 * Returns the correct video URL.
 * - In production (Vercel): uses GitHub media URL to serve LFS files
 * - In development (local): uses local path from public/ folder
 */
export function getVideoUrl(localPath: string): string {
  // In development, serve from local public/ folder
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return localPath;
  }

  // In production, serve from GitHub's LFS media server
  // Encode special characters in the path for URL safety
  const encodedPath = localPath
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/');

  return `${GITHUB_MEDIA_BASE}${encodedPath}`;
}
