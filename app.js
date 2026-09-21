// EDIT THIS EMAIL FIRST. Every application will be sent here.
const hiringEmail = 'hr.fprc@hotmail.com';
// Edit these lists whenever you want to publish a job or update.
const jobs = [
  { id: 'admin-accounting-executive', title: 'Admin & Accounting Executive', team: 'Administration & Finance', type: 'Full-time · Ajman, UAE · Immediate', summary: 'Join a hands-on team managing day-to-day administration, accounting, and coordination.', details: 'You will manage administrative tasks, sales line orders, and packing and location coordination. You will maintain accounting entries and financial records, prepare invoices, receipts, and monthly reports, and support sales reporting, data entry, and documentation. We are looking for someone organized and reliable with accounting fundamentals, Excel and Microsoft Office skills, strong communication, and close attention to detail. Candidates should hold their own valid UAE visa.' },
  { id: 'sales-marketing-executive', title: 'Sales & Marketing Executive', team: 'Sales & Marketing', type: 'Full-time · Abu Dhabi, UAE · Immediate', summary: 'Drive new business and client relationships across fit-out, interiors, and furniture contracting.', details: 'You will generate leads, build client relationships, and help close opportunities in fit-out, interiors, and furniture contracting. This role suits a proactive, results-driven professional with a proven sales and marketing track record, excellent English, and a valid UAE driving license. Experience in furniture or interior fit-outs is a strong advantage. Global applicants are welcome; candidates already on a freelance or family visa receive priority.' }
];
const updates = [
  { date: 'September 21, 2026', title: 'We are growing our product team', text: 'We have opened two new remote roles for people who care deeply about making useful, human products.' },
  { date: 'September 10, 2026', title: 'A new chapter for our studio', text: 'We are sharpening our focus on digital tools that make everyday work a little easier.' },
  { date: 'August 26, 2026', title: 'Hello from Acme Studio', text: 'This is where we will share studio notes, new work, and future opportunities.' }
];

const jobsEl = document.querySelector('#jobs');
const updatesEl = document.querySelector('.updates');
const dialog = document.querySelector('#job-dialog');
const detail = document.querySelector('#job-detail');
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#role-count').textContent = `(${jobs.length})`;

jobsEl.innerHTML = jobs.map((job, i) => `<article class="job-card" style="--delay:${i * 70}ms"><div><p class="job-team">${job.team}</p><h3>${job.title}</h3><p>${job.summary}</p></div><div class="job-meta"><span>${job.type}</span><button class="text-button" data-job="${job.id}">View role <span>→</span></button></div></article>`).join('');
updatesEl.innerHTML = updates.map(update => `<article class="update"><p class="job-team">${update.date}</p><h3>${update.title}</h3><p>${update.text}</p></article>`).join('');

function escapeHtml(value) { const el = document.createElement('div'); el.textContent = value; return el.innerHTML; }
function showJob(job) {
  detail.innerHTML = `<p class="eyebrow">${job.team} · ${job.type}</p><h2>${job.title}</h2><p class="detail-copy">${job.details}</p><hr><h3>Apply for this role</h3>`;
  const form = document.querySelector('#application-template').content.cloneNode(true);
  detail.append(form);
  const applicationForm = detail.querySelector('form');
  applicationForm.elements.job.value = job.title;
  applicationForm.elements._subject.value = `New application — ${job.title}`;
  applicationForm.action = `https://formsubmit.co/${encodeURIComponent(hiringEmail)}`;
  const attachment = applicationForm.elements.attachment;
  attachment.addEventListener('change', () => { detail.querySelector('#file-name').textContent = attachment.files[0]?.name || 'No file selected'; });
  applicationForm.addEventListener('submit', event => {
    if (hiringEmail === 'YOUR_EMAIL_ADDRESS') { event.preventDefault(); applicationForm.querySelector('#form-error').textContent = 'The hiring email has not been set yet. Add it at the top of app.js.'; }
    else if (attachment.files[0]?.size > 10 * 1024 * 1024) { event.preventDefault(); applicationForm.querySelector('#form-error').textContent = 'Please choose a resume smaller than 10 MB.'; }
    else if (!attachment.files[0] && !applicationForm.elements.resume_link.value.trim()) { event.preventDefault(); applicationForm.querySelector('#form-error').textContent = 'Please upload a resume or add a resume link.'; }
  });
  dialog.showModal();
}
jobsEl.addEventListener('click', (event) => { const id = event.target.closest('[data-job]')?.dataset.job; if (id) showJob(jobs.find(job => job.id === id)); });
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
