// EDIT THIS EMAIL FIRST. Every application will be sent here.
const hiringEmail = 'YOUR_EMAIL_ADDRESS';
// Edit these lists whenever you want to publish a job or update.
const jobs = [
  { id: 'product-designer', title: 'Product Designer', team: 'Design', type: 'Full-time · Remote', summary: 'Shape clear, useful experiences from first sketch to shipped product.', details: 'You will partner with product and engineering to turn complex problems into simple, beautiful flows. You have a strong product portfolio, excellent visual judgment, and enjoy talking to customers.' },
  { id: 'full-stack-engineer', title: 'Full-stack Engineer', team: 'Engineering', type: 'Full-time · Remote', summary: 'Build resilient product features across our modern web stack.', details: 'You will own features end to end: shaping technical direction, writing maintainable code, and helping us improve how we ship. We value practical judgment, care for users, and clear communication.' },
  { id: 'customer-success-lead', title: 'Customer Success Lead', team: 'Operations', type: 'Full-time · Hybrid', summary: 'Help customers get lasting value from the work we make.', details: 'You will guide onboarding, develop trusted customer relationships, and turn recurring feedback into better product decisions. You are organized, empathetic, and comfortable working across teams.' }
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
  applicationForm.addEventListener('submit', event => {
    if (hiringEmail === 'YOUR_EMAIL_ADDRESS') { event.preventDefault(); applicationForm.querySelector('#form-error').textContent = 'The hiring email has not been set yet. Add it at the top of app.js.'; }
  });
  dialog.showModal();
}
jobsEl.addEventListener('click', (event) => { const id = event.target.closest('[data-job]')?.dataset.job; if (id) showJob(jobs.find(job => job.id === id)); });
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
