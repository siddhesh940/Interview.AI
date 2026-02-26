const puppeteer = require('puppeteer');
const supabaseService = require('../config/supabaseClient');

class TcsScraper {
  constructor() {
    this.companyName = 'TCS';
    this.baseUrl = 'https://careers.tcs.com';
    this.searchUrls = [
      'https://careers.tcs.com/careers/apply?keywords=&experience=Fresher&location=India',
      'https://ibegin.tcs.com/iBegin/jobs',
      'https://careers.tcs.com/careers/apply?keywords=graduate&experience=Fresher'
    ];
    // TCS NQT / special hiring pages on www.tcs.com
    this.nqtUrls = [
      'https://www.tcs.com/careers/india/tcs-all-india-nqt-hiring'
    ];
  }

  async scrape() {
    let browser;
    try {
      console.log(`[${this.companyName}] Starting scrape...`);
      
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        timeout: 30000
      });

      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      
      const allDrives = [];
      
      // ── Scrape standard careers pages ──
      for (const url of this.searchUrls) {
        try {
          console.log(`[${this.companyName}] Scraping: ${url}`);
          await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
          
          // Wait for job listings
          await page.waitForSelector('.job-result, .job-item, .job-card, .career-card', { timeout: 10000 });
          
          const drives = await page.evaluate(() => {
            const jobElements = document.querySelectorAll('.job-result, .job-item, .job-card, .career-card, [class*="job"]');
            const drives = [];
            
            jobElements.forEach(element => {
              try {
                const titleElement = element.querySelector('h3, .job-title, .title, h2, h4');
                const linkElement = element.querySelector('a') || element;
                const descElement = element.querySelector('.description, .job-description, p');
                const locationElement = element.querySelector('.location, .job-location');
                
                if (!titleElement) {return;}
                
                const title = titleElement.textContent?.trim();
                const description = descElement?.textContent?.trim() || '';
                const location = locationElement?.textContent?.trim() || '';
                
                let link = '';
                if (linkElement && linkElement.href) {
                  link = linkElement.href;
                } else if (linkElement && linkElement.onclick) {
                  // Try to extract link from onclick
                  const onclickStr = linkElement.onclick.toString();
                  const urlMatch = onclickStr.match(/['"]([^'"]*careers[^'"]*)['\"]/);
                  if (urlMatch) {link = urlMatch[1];}
                }
                
                if (!title) {return;}
                
                // Filter for relevant positions
                const isRelevant = /ninja|fresher|graduate|entry|trainee|associate|campus|ibegin|tcs ion|digital|nqt|national qualifier/i.test(title) ||
                                 /ninja|fresher|graduate|entry|trainee|associate|campus|nqt/i.test(description);
                
                if (isRelevant) {
                  drives.push({
                    title,
                    description,
                    location,
                    link: link.startsWith('http') ? link : `https://careers.tcs.com${link}`,
                    scraped_from: window.location.href
                  });
                }
              } catch (error) {
                console.log('Error parsing job element:', error);
              }
            });
            
            return drives;
          });
          
          allDrives.push(...drives);
          console.log(`[${this.companyName}] Found ${drives.length} potential drives from ${url}`);
          
          await page.waitForTimeout(3000);
          
        } catch (error) {
          console.error(`[${this.companyName}] Error scraping ${url}:`, error.message);
        }
      }
      
      const normalizedDrives = await this.normalizeDrives(allDrives);

      // ── Scrape TCS NQT / special hiring pages ──
      const nqtDrives = await this.scrapeNqtPages(page);
      const normalizedNqtDrives = await this.normalizeNqtDrives(nqtDrives);
      normalizedDrives.push(...normalizedNqtDrives);

      console.log(`[${this.companyName}] Total normalized drives: ${normalizedDrives.length} (${normalizedNqtDrives.length} from NQT pages)`);
      
      return normalizedDrives;
      
    } catch (error) {
      console.error(`[${this.companyName}] Scraping failed:`, error);
      
return [];
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  async normalizeDrives(rawDrives) {
    const company = await supabaseService.getCompanyByName(this.companyName);
    if (!company) {
      console.error(`Company ${this.companyName} not found in database`);
      
return [];
    }

    const normalizedDrives = [];
    
    for (const drive of rawDrives) {
      try {
        // Determine drive type
        let driveType = 'off-campus';
        if (/campus|on-campus/i.test(drive.title + ' ' + drive.description)) {
          driveType = 'on-campus';
        } else if (/virtual|remote|online/i.test(drive.title + ' ' + drive.description)) {
          driveType = 'virtual';
        }

        // Extract batch
        let batch = '2024';
        const batchMatch = (drive.title + ' ' + drive.description).match(/20\d{2}/);
        if (batchMatch) {
          batch = batchMatch[0];
        }

        // TCS typically requires 60% (6.0 CGPA) with no active backlogs
        const minCgpa = 6.0;

        // TCS accepts most engineering branches
        const branches = [
          'Computer Science Engineering',
          'Information Technology',
          'Electronics and Communication',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Electronics and Instrumentation',
          'Instrumentation and Control',
          'Aerospace Engineering',
          'Chemical Engineering'
        ];

        // Default deadline (TCS drives usually have 2-4 weeks notice)
        let deadline = new Date();
        deadline.setDate(deadline.getDate() + 21); // 3 weeks

        const normalizedDrive = {
          company_id: company.id,
          role: drive.title,
          drive_type: driveType,
          batch: batch,
          min_cgpa: minCgpa,
          branches: branches,
          deadline: deadline.toISOString(),
          registration_link: drive.link || 'https://careers.tcs.com',
          source_url: drive.scraped_from
        };

        if (this.validateDrive(normalizedDrive)) {
          normalizedDrives.push(normalizedDrive);
        }

      } catch (error) {
        console.error(`[${this.companyName}] Error normalizing drive:`, error);
      }
    }

    return normalizedDrives;
  }

  validateDrive(drive) {
    const requiredFields = ['role', 'registration_link', 'deadline'];
    for (const field of requiredFields) {
      if (!drive[field]) {
        console.log(`[${this.companyName}] Drive validation failed: missing ${field}`);
        
return false;
      }
    }

    try {
      new URL(drive.registration_link);
    } catch {
      console.log(`[${this.companyName}] Drive validation failed: invalid registration link`);
      
return false;
    }

    if (new Date(drive.deadline) < new Date()) {
      console.log(`[${this.companyName}] Drive validation failed: deadline in past`);
      
return false;
    }

    return true;
  }

  // ─────────────────────────────────────────────────────
  // TCS NQT / Special Hiring Pages Scraper
  // Handles pages like www.tcs.com/careers/india/tcs-all-india-nqt-hiring
  // ─────────────────────────────────────────────────────
  async scrapeNqtPages(page) {
    const nqtDrives = [];

    for (const url of this.nqtUrls) {
      try {
        console.log(`[${this.companyName}] Scraping NQT page: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });

        // Wait for content to load (these pages are heavy on JS)
        await page.waitForTimeout(5000);

        const pageData = await page.evaluate(() => {
          const bodyText = document.body.innerText || '';
          
          // Extract batch info (e.g. "Batch of 2026, 2025 & 2024")
          const batchMatch = bodyText.match(/Batch\s+of\s+([\d,\s&]+)/i);
          const batches = [];
          if (batchMatch) {
            const batchStr = batchMatch[1];
            const years = batchStr.match(/\d{4}/g);
            if (years) batches.push(...years);
          }

          // Extract registration dates
          let registrationStart = null;
          let registrationEnd = null;
          const startMatch = bodyText.match(/Registration\s+Start\s+Date[:\s]*(\d+\s+\w+\s+\d{4})/i);
          const endMatch = bodyText.match(/Registration\s+End\s+Date[:\s]*(\d+\s+\w+\s+\d{4})/i);
          if (startMatch) registrationStart = startMatch[1];
          if (endMatch) registrationEnd = endMatch[1];

          // Extract test date
          let testDate = null;
          const testMatch = bodyText.match(/Test\s+Date[:\s]*(\d+\s+\w+\s+\d{4})/i);
          if (testMatch) testDate = testMatch[1];

          // Look for Apply Now link (NextStep portal)
          let applyLink = '';
          const links = document.querySelectorAll('a[href*="nextstep"], a[href*="tcsapps"], a[href*="ibegin"]');
          if (links.length > 0) {
            applyLink = links[0].href;
          }

          // Check for CTC info to determine categories
          const hasPrime = /prime/i.test(bodyText);
          const hasDigital = /digital/i.test(bodyText);

          // Check if it's NQT
          const isNQT = /nqt|national\s+qualifier/i.test(bodyText);

          return {
            batches,
            registrationStart,
            registrationEnd,
            testDate,
            applyLink,
            hasPrime,
            hasDigital,
            isNQT,
            pageTitle: document.title || ''
          };
        });

        if (pageData.isNQT && pageData.batches.length > 0) {
          // Create a drive entry per batch
          for (const batch of pageData.batches) {
            let role = 'TCS NQT Hiring';
            if (pageData.hasPrime && pageData.hasDigital) {
              role = `TCS NQT Hiring – Prime & Digital Cadre (Batch ${batch})`;
            } else if (pageData.hasPrime) {
              role = `TCS NQT Hiring – Prime Cadre (Batch ${batch})`;
            } else if (pageData.hasDigital) {
              role = `TCS NQT Hiring – Digital Cadre (Batch ${batch})`;
            }

            // Parse deadline from registration end date
            let deadline = null;
            if (pageData.registrationEnd) {
              try {
                deadline = new Date(pageData.registrationEnd).toISOString();
              } catch (e) {
                // Fallback: 21 days from now
                const d = new Date();
                d.setDate(d.getDate() + 21);
                deadline = d.toISOString();
              }
            }

            nqtDrives.push({
              title: role,
              batch,
              link: pageData.applyLink || 'https://nextstep.tcsapps.com/indiacampus/#/',
              scraped_from: url,
              deadline,
              testDate: pageData.testDate,
              isNQT: true
            });
          }

          console.log(`[${this.companyName}] Found ${nqtDrives.length} NQT drives from ${url}`);
        } else {
          console.log(`[${this.companyName}] No NQT drives detected on ${url}`);
        }

        await page.waitForTimeout(3000);

      } catch (error) {
        console.error(`[${this.companyName}] Error scraping NQT page ${url}:`, error.message);
      }
    }

    return nqtDrives;
  }

  async normalizeNqtDrives(nqtDrives) {
    const company = await supabaseService.getCompanyByName(this.companyName);
    if (!company) {
      console.error(`Company ${this.companyName} not found in database`);
      return [];
    }

    const normalizedDrives = [];

    for (const drive of nqtDrives) {
      try {
        // NQT is always off-campus (All India test)
        const driveType = 'off-campus';

        // TCS NQT min CGPA is typically 60% = 6.0
        const minCgpa = 6.0;

        // TCS NQT accepts all major engineering branches
        const branches = [
          'Computer Science Engineering',
          'Information Technology',
          'Electronics and Communication',
          'Electrical Engineering',
          'Mechanical Engineering',
          'Civil Engineering',
          'Electronics and Instrumentation',
          'Instrumentation and Control',
          'Aerospace Engineering',
          'Chemical Engineering',
          'CSE', 'IT', 'ECE', 'EEE', 'ME', 'CE'
        ];

        // Use extracted deadline or fallback
        let deadline = drive.deadline;
        if (!deadline) {
          const d = new Date();
          d.setDate(d.getDate() + 21);
          deadline = d.toISOString();
        }

        const normalizedDrive = {
          company_id: company.id,
          role: drive.title,
          drive_type: driveType,
          batch: drive.batch,
          min_cgpa: minCgpa,
          branches: branches,
          deadline: deadline,
          registration_link: drive.link,
          source_url: drive.scraped_from,
          is_dummy: false
        };

        if (this.validateDrive(normalizedDrive)) {
          normalizedDrives.push(normalizedDrive);
        }
      } catch (error) {
        console.error(`[${this.companyName}] Error normalizing NQT drive:`, error);
      }
    }

    return normalizedDrives;
  }
}

module.exports = TcsScraper;
