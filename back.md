### Step 1: Create the backup using a WordPress plugin

1. Log in to the WordPress admin panel of the old site (usually at `https://josancll.ca/wp-admin` or `https://www.josancll.ca/wp-admin`).
2. In the left-hand sidebar menu, hover over **Plugins** and click  **Add New** .
3. In the search bar on the top right, search for  **All-in-One WP Migration** .
4. Click **Install Now** next to the plugin, and then click **Activate** once installed.
5. In the left-hand sidebar menu, you will now see a new menu item called  **All-in-One WP Migration** . Hover over it and click  **Export** .
6. On the export page, click **Export To** and choose  **File** .
7. Wait a few minutes for the plugin to bundle your database, images, plugins, and theme files.
8. Once complete, a green flashing button will appear saying  **"Download josancll.ca..."** . Click it and save the file (it will end with a `.wpress` extension) to your computer.

---

### Step 2: Set up the subdomain hosting

Since you have the Squarespace domain credentials, we can point `backup.josancll.ca` to the backup hosting space.

1. **Where is your hosting server located?** (e.g., Hostinger, GoDaddy, Bluehost, SiteGround, Vercel, Netlify).
   * If you are hosting the backup site on your own hosting account, log in to your hosting control panel (like cPanel or Hostinger hPanel).
   * Create a new subdomain named **`backup.josancll.ca`** inside your hosting control panel. This will generate a new folder on your server for the subdomain.
   * Install a clean, empty WordPress site on this subdomain.
2. Once the subdomain directory is created, get the **IP Address** of your hosting server.
3. Log into  **Squarespace Domains** , click on `josancll.ca` ->  **DNS Settings** , and add an `A` record:
   * **Host** : `backup`
   * **Points to / Value** : [Your Hosting Server IP Address]
   * **TTL** : `Default`






new website: https://react-website-seven-gamma.vercel.app/

old website
