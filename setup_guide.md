# Complete Step-by-Step Setup Guide

This guide is designed to walk you through configuring email routing via Resend (so all customer contact forms are sent to `info@josancll.ca`) and completing your website's SEO indexing on Google.

---

## Part 1: Resend Email Routing Setup

### Step 1.1: Sign Up / Log In to Resend
1. Open your web browser and go to [https://resend.com](https://resend.com).
2. Click **Sign Up** (or log in if you already have an account). You can sign up using your GitHub account or a standard Gmail account.
3. Follow the screen prompts to set up your account.

### Step 1.2: Add Your Custom Domain
1. Once logged in to the Resend Dashboard, look at the left sidebar menu.
2. Click on **Domains**.
3. Click the **Add Domain** button in the top-right corner.
4. In the pop-up window:
   - **Domain**: Type `josancll.ca`
   - **Region**: Select the closest geographical region (usually `us-east-1` or `North America`).
5. Click **Add**.

### Step 1.3: Verify Your Domain in Your Domain Registrar
*Resend will now show you a table containing several DNS records (typically 3 MX records, 1 TXT record, and 1 SPF record).* These are security keys that prove you own the domain and authorize Resend to send emails on your behalf.

1. Open a new browser tab and log into the registrar website where you purchased the domain `josancll.ca` (e.g., GoDaddy, Namecheap, Domain.com, or Hostinger).
2. Go to your **Product list** or **Domain Portfolio**, select `josancll.ca`, and look for **DNS Settings** or **Manage DNS**.
3. You need to add the records shown on the Resend page one by one. For each row in the Resend table:
   - Look at the **Type** column (TXT or MX).
   - In your registrar's DNS panel, click **Add New Record**.
   - Select the matching **Type** (TXT or MX).
   - **Name / Host**: Paste the value from Resend (usually `resend._domainkey` or `@`).
   - **Value / Content**: Paste the long code provided by Resend.
   - **TTL**: Leave as Default or set to `1 hour` / `3600`.
   - **Priority** (Only for MX records): Set to the number specified by Resend (usually `10`).
4. Once you have added all DNS records to your registrar, return to the Resend browser tab and click the **Verify** button. 
   *(Note: DNS changes can take anywhere from 5 minutes to a few hours to update globally, so if it doesn't verify instantly, check back in a few minutes).*

### Step 1.4: Generate Your API Key
1. In the left sidebar of your Resend Dashboard, click on **API Keys**.
2. Click **Create API Key**.
3. Name it something memorable, like `Josan Website Production Key`.
4. Leave permissions set to **Full Access** and select your verified domain (`josancll.ca`).
5. Click **Add**.
6. **IMPORTANT**: Copy the generated API key immediately (it looks like `re_123456789...`). Save it in a temporary text file, as Resend will only show it to you once.

### Step 1.5: Configure the Website Code to Send Emails
Now we must place your API Key and set the destination email to `info@josancll.ca` in the codebase.
1. Open [src/services/emailService.js](file:///e:/engineering/4th%20year/mirai%20int/Afgani%20client/josan_cll/src/services/emailService.js) in your text editor.
2. Update the API key configuration block (or your `.env` file) with the key you copied in Step 1.4.
3. Update the `to` field in your email sending payload to:
   ```javascript
   to: 'info@josancll.ca'
   ```
4. Update the `from` field to send from your verified domain, for example:
   ```javascript
   from: 'Josan Website <inquiries@josancll.ca>'
   ```
5. Deploy or build the website to apply the updates.

---

## Part 2: Complete Google SEO Indexing

### Step 2.1: Deploy robots.txt and sitemap.xml
Before going to Google Search Console, make sure the sitemap and robots.txt files are published.
1. Commit the files we just created to Git:
   - `public/robots.txt`
   - `public/sitemap.xml`
2. Push the files to your GitHub repository and verify that your hosting platform builds the changes.
3. Confirm by opening `https://josancll.ca/sitemap.xml` in your web browser. If you see the XML layout, the deployment succeeded.

### Step 2.2: Set Up Google Search Console
1. Open your web browser and navigate to [https://search.google.com/search-console/about](https://search.google.com/search-console/about).
2. Click **Start Now**.
3. Log in using your Gmail address and password.

### Step 2.3: Add Your Website Property
1. Once logged in, click the dropdown menu in the top-left corner of the dashboard and select **Add Property**.
2. You will see two input columns: **Domain** and **URL prefix**.
3. Choose **URL prefix** (the right-hand column) because it is much simpler to verify.
4. In the box, type:
   `https://josancll.ca/`
5. Click **Continue**.

### Step 2.4: Verify Ownership
Google needs to check that you are the true owner of `josancll.ca`. They will offer multiple verification methods. Choose one of these two options:

#### Option A: HTML Tag (Recommended)
1. On the verification screen, scroll down to the **Other verification methods** section and click **HTML Tag**.
2. Google will display a meta tag line that looks like this:
   `meta name="google-site-verification" content="YourUniqueKey"`
3. Copy this tag.
4. Send the tag code to me, and I will place it inside the `<head>` tag of your website's main HTML file (`index.html`) and commit it.
5. Once I push the update to your site, wait 60 seconds, go back to Google Search Console, and click **Verify**.

#### Option B: HTML File Upload
1. On the verification screen, click **HTML File** (usually the recommended method on screen).
2. Click the download link to download a file named something like `google12345abcdef.html`.
3. Send this downloaded file to me, or copy its internal content and paste it in our chat.
4. I will write this file inside the `public/` directory of your project so it gets served at `https://josancll.ca/google12345abcdef.html`.
5. Once deployed, return to the Google Search Console page and click the **Verify** button.

### Step 2.5: Submit the Sitemap
1. After verification is complete, look at the left sidebar menu of Google Search Console.
2. Under the **Indexing** category, click on **Sitemaps**.
3. Under the **Add a new sitemap** input field, you will see your website URL followed by a text box.
4. In the text box, type:
   `sitemap.xml`
5. Click **Submit**.
6. Google will process the sitemap. The status column will initially say "Pending" and will turn to a green "Success" status shortly, listing the number of discovered URLs.
