# News and careers website — free setup

This version needs **no domain, no database, and no paid account**. It runs as a simple static portfolio-style site on Vercel. Applications are sent directly to your normal email inbox using FormSubmit.

## Make it yours

1. Open `app.js`. Replace `YOUR_EMAIL_ADDRESS` at the top with the Gmail or Outlook address where you want applications to arrive.
2. In the same file, replace the sample entries in the `jobs` list and the `updates` list. That is the only place you need to edit to add a role or post a studio update.
3. In `index.html`, replace **ACME STUDIO** and `hello@example.com` with your name/business and email.

## Publish for free on Vercel

1. Create a free account at [github.com](https://github.com), then click **New repository**. Name it something simple, such as `my-careers-site`, and choose **Public**.
2. Click **Add file → Upload files**. Upload `index.html`, `app.js`, `styles.css`, and `README.md` from this folder. Click **Commit changes**.
3. Create a free account at [vercel.com](https://vercel.com). Choose **Add New → Project**, connect GitHub, and import `my-careers-site`.
4. Set the **Project Name** to the clean link you want, for example `acmejobs`. Leave the framework setting as **Other**, then click **Deploy**.
5. Your website will be live at `https://acmejobs.vercel.app`. The name must be available because Vercel allocates these links on a first-come, first-served basis.

## Turn on application emails

After publishing, submit one real test application. FormSubmit sends a one-time confirmation email to the hiring email you put in `app.js`. Click its activation link. From then on, every job application arrives by email, with the job title in the subject and the applicant’s details in the message. You can simply reply to the applicant from your inbox.

Applicants share a public resume link (Google Drive, Dropbox, LinkedIn, or their portfolio), so there is no upload storage or system to maintain.

## Post new jobs or updates

Open your GitHub repository, click `app.js`, click the pencil icon, edit the relevant `jobs` or `updates` item, and click **Commit changes**. Vercel automatically updates your website in about a minute.
