// Applications will be sent here.
const hiringEmail = 'hr.fprc@hotmail.com';

// Edit these lists whenever you want to publish a job or update.
const jobs = [
  { id: 'admin-accounting-executive', title: 'Admin & Accounting Executive', team: 'Administration & Finance', type: 'Full-time · Ajman, UAE · closed', summary: 'Join a hands-on team managing day-to-day finance, operations, and admin across a fast-moving business.' },
  { id: 'sales-marketing-executive', title: 'Sales & Marketing Executive', team: 'Sales & Marketing', type: 'Full-time · Abu Dhabi, UAE · closed', summary: 'Drive new business and client relationships while helping shape our marketing and sales strategy.' }
];

const updates = [
  { date: 'September 21, 2026', title: 'We are growing our product team', text: 'We have opened two new remote roles for people who care deeply about making useful, human products.' },
  { date: 'September 10, 2026', title: 'A new chapter for our studio', text: 'We are sharpening our focus on digital tools that make everyday work a little easier.' },
  { date: 'August 26, 2026', title: 'Hello from GetHired', text: 'This is where we will share GetHired notes, new work, and future opportunities.' }
];

const jobsEl = document.querySelector('#jobs');
const updatesEl = document.querySelector('.updates');
const dialog = document.querySelector('#job-dialog');
const detail = document.querySelector('#job-detail');

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#role-count').textContent = `(${jobs.length})`;

jobsEl.innerHTML = jobs.map((job, i) => `
  <article class="job-card" style="--delay:${i * 70}ms">
    <div>
      <p class="job-team">${job.team}</p>
      <h3>${job.title}</h3>
      <p>${job.summary}</p>
    </div>
    <div class="job-meta">
      <p>${job.type}</p>
      <button class="button button-dark" type="button" data-job="${job.id}" style="display:inline-flex; visibility:visible; opacity:1;">View role</button>
    </div>
  </article>
`).join('');

updatesEl.innerHTML = updates.map(update => `
  <article class="update">
    <p class="job-team">${update.date}</p>
    <h3>${update.title}</h3>
    <p>${update.text}</p>
  </article>
`).join('');

function escapeHtml(value) {
  const el = document.createElement('div');
  el.textContent = String(value ?? '');
  return el.innerHTML;
}

function showJob(job) {
  detail.innerHTML = `
    <p class="eyebrow">${escapeHtml(job.team)} · ${escapeHtml(job.type)}</p>
    <h2>${escapeHtml(job.title)}</h2>
    <p class="detail-copy">${escapeHtml(job.details || job.summary)}</p>
    <hr>
    <h3>Apply for this role</h3>
  `;

  const form = document.querySelector('#application-template').content.cloneNode(true);
  detail.append(form);

  const applicationForm = detail.querySelector('form');
  applicationForm.elements.job.value = job.title;
  applicationForm.elements._subject.value = `New application — ${job.title}`;
  applicationForm.action = `https://formsubmit.co/${encodeURIComponent(hiringEmail)}`;

  const attachment = applicationForm.elements.attachment;
  const resumeLink = applicationForm.elements.resume_link;

  if (attachment) {
    attachment.addEventListener('change', () => {
      detail.querySelector('#file-name').textContent = attachment.files[0]?.name || 'No file selected';
    });
  }

  applicationForm.addEventListener('submit', event => {
    const selectedFile = attachment?.files?.[0];

    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      event.preventDefault();
      applicationForm.querySelector('#form-error').textContent = 'Please choose a resume smaller than 10 MB.';
    } else if (!selectedFile && !resumeLink.value.trim()) {
      event.preventDefault();
      applicationForm.querySelector('#form-error').textContent = 'Please upload a resume or add a portfolio link.';
    }
  });

  dialog.showModal();
}

jobsEl.addEventListener('click', (event) => {
  const id = event.target.closest('[data-job]')?.dataset.job;
  if (id) showJob(jobs.find(job => job.id === id));
});

document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
