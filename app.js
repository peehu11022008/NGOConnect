/* NGOConnect - plain JavaScript, no libraries. Data is stored in localStorage (sample data only). */

// ---------- 1. Sample data ----------
const NGOS = [
  { id: 1, name: 'Ashadeep Association', cause: 'Children & Family Support', city: 'Mumbai', tag: 'Mumbai • Volunteers needed',
    lat: 19.076, lng: 72.878, rating: 4.5, n: 12, goal: 100000, raised: 42000, hours: 'Mon-Sat, 10 AM - 5 PM',
    email: 'hello@ashadeep.example', phone: '9000000001',
    desc: 'Supporting children and families through community-focused programmes and volunteer opportunities.',
    about: 'Ashadeep Association works with children and families and provides opportunities for people to contribute their time and skills.',
    acts: ['Community support programmes', 'Child and family support', 'Volunteer-led activities'],
    need: 'Volunteers needed for community activities.',
    roles: [['Community Volunteer', 'Help with community activities and support programmes.'], ['Child Support Volunteer', 'Assist with child-focused activities.']] },
  { id: 2, name: 'Shakti Centre', cause: 'Community & Child Care', city: 'Mumbai', tag: 'Andheri East • Open roles',
    lat: 19.113, lng: 72.869, rating: 4.2, n: 8, goal: 80000, raised: 30000, hours: 'Mon-Fri, 9 AM - 4 PM',
    email: 'info@shakti.example', phone: '9000000002',
    desc: 'Care and learning support for children and women in the community.',
    about: 'Shakti Centre runs daycare, tutoring and skill sessions for children and women in Andheri East.',
    acts: ['Daycare support', 'Evening tutoring', 'Skill workshops'], need: 'Tutors and activity helpers for evening classes.',
    roles: [['Evening Tutor', 'Help children with homework.'], ['Activity Helper', 'Support daycare activities.']] },
  { id: 3, name: 'GiveIndia', cause: 'Education & Social Impact', city: 'Mumbai', tag: 'Multiple causes • Popular',
    lat: 19.017, lng: 72.856, rating: 4.7, n: 40, goal: 500000, raised: 310000, hours: 'Mon-Fri, 10 AM - 6 PM',
    email: 'contact@giveindia.example', phone: '9000000003',
    desc: 'A giving platform that connects people to many causes.',
    about: 'GiveIndia supports education, health and livelihood causes through campaigns and volunteering drives.',
    acts: ['Fundraising campaigns', 'Awareness drives', 'Corporate volunteering'], need: 'Campaign volunteers for awareness drives.',
    roles: [['Campaign Volunteer', 'Help run awareness drives.'], ['Event Volunteer', 'Support on-ground events.']] },
  { id: 4, name: 'Akanksha Foundation', cause: 'Education', city: 'Mumbai', tag: 'Mumbai • Volunteers needed',
    lat: 19.05, lng: 72.83, rating: 4.4, n: 20, goal: 200000, raised: 95000, hours: 'Mon-Sat, 8 AM - 3 PM',
    email: 'team@akanksha.example', phone: '9000000004',
    desc: 'Quality education for children from low-income communities.',
    about: 'Akanksha Foundation runs after-school and school programmes and welcomes volunteers to mentor students.',
    acts: ['After-school classes', 'Student mentoring', 'Reading circles'], need: 'Mentors and reading-circle volunteers.',
    roles: [['Student Mentor', 'Guide students once a week.'], ['Reading Circle Volunteer', 'Read and discuss stories with children.']] },
  { id: 5, name: 'Green Mumbai Trust', cause: 'Environment', city: 'Thane', tag: 'Thane • Open roles',
    lat: 19.218, lng: 72.978, rating: 4.1, n: 6, goal: 60000, raised: 18000, hours: 'Sat-Sun, 7 AM - 12 PM',
    email: 'plant@greenmumbai.example', phone: '9000000005',
    desc: 'Tree planting and clean-up drives across the city.',
    about: 'A sample NGO that organises weekend tree plantation and beach clean-up drives.',
    acts: ['Tree plantation', 'Clean-up drives', 'School awareness talks'], need: 'Weekend plantation volunteers.',
    roles: [['Plantation Volunteer', 'Plant and water saplings.'], ['Clean-up Volunteer', 'Join weekend clean-up drives.']] }
];

// ---------- 2. Helpers ----------
const $ = s => document.querySelector(s);
const all = s => [...document.querySelectorAll(s)];
const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
let tt;
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 4000); }
const user = () => { try { return JSON.parse(sessionStorage.getItem('session')); } catch (e) { return null; } };  // session lasts only until the tab is closed
const setSession = u => sessionStorage.setItem('session', JSON.stringify(u));

const D = { ID: 'ID proof', C: 'College ID', A: 'Address proof', R: 'Resume', P: 'Police verification', M: 'Medical fitness' };
const S1 = ['Sat 9 AM - 12 PM', 'Sun 9 AM - 12 PM', 'Sat 2 PM - 5 PM'], S2 = ['Mon-Fri 4 PM - 6 PM', 'Sat 10 AM - 1 PM'], S3 = ['Sun 7 AM - 10 AM', 'Sun 4 PM - 7 PM'], S4 = ['Mon-Fri 10 AM - 1 PM', 'Mon-Fri 2 PM - 5 PM'];
const EX = { 1: [[D.ID, D.C], S2, 'Kurla, Mumbai'], 2: [[D.ID, D.A], S4, 'Andheri East, Mumbai'], 3: [[D.ID, D.R], S1, 'Lower Parel, Mumbai'], 4: [[D.ID, D.C, D.P], S2, 'Bandra, Mumbai'], 5: [[D.ID], S3, 'Thane West, Thane'] };
function mk(id, name, cause, area, city, lat, lng, desc, roles, docs, slots, need) {
  return { id, name, cause, city, area, addr: area + ', ' + city, tag: area + ' • ' + (id % 2 ? 'Volunteers needed' : 'Open roles'), lat, lng,
    rating: +(4 + (id % 8) / 10).toFixed(1), n: 5 + id * 3, goal: 50000 + id * 10000, raised: 10000 + id * 3000, hours: 'Mon-Sat, 10 AM - 5 PM',
    email: 'contact' + id + '@ngo.example', phone: '90000000' + String(id).padStart(2, '0'), desc, about: desc + ' This is sample data for the project.',
    acts: roles.split('|').map(r => r.split(':')[0] + ' programme'), need, roles: roles.split('|').map(r => r.split(':')), docs, slots };
}
NGOS.push(
  mk(6, 'Roti Ghar Foundation', 'Food & Hunger', 'Dadar', 'Mumbai', 19.018, 72.843, 'Cooks and serves meals to people in need.', 'Meal Server:Serve meals at the kitchen.|Kitchen Helper:Prepare and pack food.', [D.ID, D.M], S3, 'Weekend helpers for the meal kitchen.'),
  mk(7, 'Paws & Care Shelter', 'Animal Welfare', 'Borivali', 'Mumbai', 19.23, 72.857, 'Rescues and cares for stray animals.', 'Animal Caretaker:Feed and clean shelter areas.|Adoption Drive Helper:Help at adoption events.', [D.ID, D.A], S1, 'Caretakers for weekend shifts.'),
  mk(8, 'Silver Years Home', 'Elderly Care', 'Chembur', 'Mumbai', 19.062, 72.9, 'A day-care and companionship home for senior citizens.', 'Companion Volunteer:Spend time with seniors.|Activity Leader:Run games and music sessions.', [D.ID, D.C, D.P], S4, 'Companions for weekday afternoons.'),
  mk(9, 'Vidya Dhara Trust', 'Education', 'Powai', 'Mumbai', 19.118, 72.905, 'Free tuition and computer classes for school children.', 'Subject Tutor:Teach maths or science.|Computer Instructor:Teach basic computer skills.', [D.ID, D.C, D.R], S2, 'Tutors for evening batches.'),
  mk(10, 'Disha Disability Support', 'Disability Support', 'Ghatkopar', 'Mumbai', 19.086, 72.908, 'Skill training and therapy support for persons with disabilities.', 'Support Assistant:Assist during training sessions.|Event Volunteer:Help with inclusive events.', [D.ID, D.P], S4, 'Assistants for training sessions.'),
  mk(11, 'Swasth Seva Camps', 'Health', 'Vile Parle', 'Mumbai', 19.1, 72.85, 'Organises free health check-up camps in communities.', 'Registration Desk:Register patients at camps.|Awareness Volunteer:Share health tips.', [D.ID, D.M], S1, 'Volunteers for monthly camps.'),
  mk(12, 'Nari Shakti Network', 'Women Empowerment', 'Malad', 'Mumbai', 19.187, 72.848, 'Training and livelihood support for women.', 'Skill Trainer:Teach stitching or digital skills.|Outreach Volunteer:Reach out to local groups.', [D.ID, D.R], S2, 'Trainers for weekend workshops.'),
  mk(13, 'Clean Coast Mumbai', 'Environment', 'Versova', 'Mumbai', 19.131, 72.813, 'Beach clean-up and recycling drives.', 'Clean-up Volunteer:Join Sunday beach clean-ups.|Sorting Helper:Sort and weigh collected waste.', [D.ID], S3, 'Early-morning clean-up volunteers.'),
  mk(14, 'Bal Mitra Learning Centre', 'Children & Family Support', 'Colaba', 'Mumbai', 18.915, 72.825, 'Learning and play centre for children from nearby settlements.', 'Reading Buddy:Read with children.|Art and Craft Helper:Run creative sessions.', [D.ID, D.C], S1, 'Buddies for weekend sessions.'),
  mk(15, 'Navi Mumbai Youth Aid', 'Community & Child Care', 'Vashi', 'Navi Mumbai', 19.077, 72.998, 'Youth-led community support and childcare programmes.', 'Childcare Helper:Support the daycare team.|Drive Organiser:Plan collection drives.', [D.ID, D.A], S2, 'Helpers for community drives.')
);
NGOS.forEach(n => { const e = EX[n.id]; if (e) { n.docs = e[0]; n.slots = e[1]; n.addr = e[2]; n.area = e[2].split(',')[0]; } });
load('ngos', []).forEach(n => { n.docs = n.docs || [D.ID]; n.slots = n.slots || S1; n.addr = n.addr || n.city; n.area = n.area || n.city; NGOS.push(n); });
const EXT = ['jpg', 'png', 'jpeg', 'webp'];  // tries these file types in order, then shows a letter box
function imgFail(el) {
  const k = (+el.dataset.k || 0) + 1;
  if (k < EXT.length) { el.dataset.k = k; el.src = 'images/ngo-' + el.dataset.id + '.' + EXT[k]; }
  else el.outerHTML = '<div class="' + el.dataset.cls + ' ph">' + el.alt.charAt(0) + '</div>';
}
const pic = (n, cls) => `<img class="${cls}" data-id="${n.id}" data-cls="${cls}" src="images/ngo-${n.id}.jpg" alt="${n.name}" onerror="imgFail(this)">`;
const card = (n, extra = '') => `<a class="ngo" href="#ngo/${n.id}">${pic(n, 'thumb')}<b>${n.name}</b><span>${n.cause}</span><span class="sm">★ ${n.rating || 'New'} • ${n.area}</span><span class="sm clamp">${n.desc}</span><em>${extra}${n.tag}</em></a>`;
const reviewsOf = id => load('reviews', []).filter(r => r.ngo === id);
const raisedOf = n => n.raised + load('donations', []).filter(d => d.ngo === n.id).reduce((s, d) => s + d.amt, 0);

// ---------- 3. Validation ----------
const R = {
  regno: v => /^[A-Za-z0-9\/-]{5,25}$/.test(v.trim()) || 'Enter a valid registration number (letters, digits, / or -).',
  name: v => v.trim().length >= 2 || 'This field is required.',
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Enter a valid email address.',
  phone: v => /^[6-9]\d{9}$/.test(v.trim()) || 'Enter a 10-digit mobile number starting with 6-9.',
  dob: v => {
    if (!v) return 'Select your date of birth.';
    const d = new Date(v), t = new Date();
    if (d > t) return 'Date of birth cannot be in the future.';
    let age = t.getFullYear() - d.getFullYear();
    if (t < new Date(t.getFullYear(), d.getMonth(), d.getDate())) age--;
    return age >= 14 || 'You must be at least 14 years old.';
  },
  pw: v => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(v) || 'Use 8+ characters with upper case, lower case, a number and a symbol.',
  pw2: v => v === $('#r-pw').value || 'Passwords do not match.'
};
function check(el) {
  const r = R[el.dataset.r](el.value), ok = r === true;
  el.classList.toggle('bad', !ok);
  el.parentElement.querySelector('.err').textContent = ok ? '' : r;
  return ok;
}

// ---------- 4. Router ----------
const VIEWS = ['home', 'search', 'location', 'ngo', 'login', 'register', 'profile', 'more'];
function go() {
  const [p, id] = (location.hash.slice(1) || 'home').split('/');
  let name = VIEWS.includes(p) ? p : 'home';
  // Entry gate: logged-out visitors only see login and register
  if (!user() && name !== 'login' && name !== 'register') {
    if (location.hash !== '#login') { location.hash = '#login'; return; }
    name = 'login';
  }
  document.body.classList.toggle('out', !user());
  all('.view').forEach(v => v.classList.toggle('on', v.id === 'v-' + name));
  all('.bn a').forEach(a => a.classList.toggle('on', a.dataset.v === name));
  const tl = $('#topLink');
  tl.textContent = name === 'home' ? 'Profile •' : '← Back to Home';
  tl.href = name === 'home' ? '#profile' : '#home';
  ({ home: rHome, search: rSearch, location: rLoc, ngo: () => rNgo(+id), profile: rProfile })[name]?.();
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', go);

// ---------- 5. Home and search ----------
function season() {  // switch with grouped cases (Exp 5)
  const m = new Date().getMonth() + 1; let s, t;
  switch (m) {
    case 12: case 1: case 2: s = 'Winter'; t = 'blanket and warm-clothes drives'; break;
    case 3: case 4: case 5: s = 'Summer'; t = 'water distribution and shelter support'; break;
    case 6: case 7: case 8: case 9: s = 'Monsoon'; t = 'tree plantation and relief volunteering'; break;
    default: s = 'Autumn'; t = 'festival-season food drives and education support';
  }
  $('#season').innerHTML = '<b>It is ' + s + '.</b> Popular ways to help right now: ' + t + '.';
}
function rHome() { season(); $('#recs').innerHTML = NGOS.slice(0, 8).map(n => card(n)).join(''); }
$('#heroForm').addEventListener('submit', e => { e.preventDefault(); $('#q2').value = $('#q').value; location.hash = '#search'; });
function fillFilters() {
  const opts = (key, sel) => [...new Set(NGOS.map(n => n[key]))].forEach(v => $(sel).insertAdjacentHTML('beforeend', `<option>${v}</option>`));
  all('#cause option:not([value=""]), #city option:not([value=""])').forEach(o => o.remove());
  opts('cause', '#cause'); opts('city', '#city');
}
function rSearch() {
  fillFilters();
  const q = $('#q2').value.toLowerCase(), c = $('#cause').value, ci = $('#city').value;
  const list = NGOS.filter(n => (!c || n.cause === c) && (!ci || n.city === ci) &&
    (n.name + n.cause + n.desc + n.addr + n.roles.join(' ')).toLowerCase().includes(q));
  $('#count').textContent = list.length + ' NGO' + (list.length === 1 ? '' : 's') + ' found';
  $('#results').innerHTML = list.length ? list.map(n => card(n)).join('') : '<p>No NGOs match your search. Try fewer words or clear the filters.</p>';
}
['#q2', '#cause', '#city'].forEach(s => $(s).addEventListener('input', rSearch));

// ---------- 6. Nearby NGOs ----------
let me = { lat: 19.076, lng: 72.878 };
const dist = (a, b, c, d) => {
  const r = x => x * Math.PI / 180, h = Math.sin(r(c - a) / 2) ** 2 + Math.cos(r(a)) * Math.cos(r(c)) * Math.sin(r(d - b) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(h));
};
function rLoc() {
  const km = +$('#km').value; $('#kmv').textContent = km + ' km';
  const list = NGOS.map(n => ({ n, d: dist(me.lat, me.lng, n.lat, n.lng) })).filter(x => x.d <= km).sort((a, b) => a.d - b.d);
  $('#near').innerHTML = list.length ? list.map(x => card(x.n, x.d.toFixed(1) + ' km away • ')).join('') : '<p>No NGOs within ' + km + ' km. Increase the distance.</p>';
  $('#map').src = `https://www.openstreetmap.org/export/embed.html?bbox=${me.lng - .1},${me.lat - .07},${me.lng + .1},${me.lat + .07}&layer=mapnik&marker=${me.lat},${me.lng}`;
}
$('#km').addEventListener('input', rLoc);
const AREAS = { 'Mumbai (default)': [19.076, 72.878], Andheri: [19.119, 72.847], Bandra: [19.06, 72.836], Dadar: [19.018, 72.843], Borivali: [19.23, 72.857], Powai: [19.118, 72.905], Thane: [19.218, 72.978], 'Navi Mumbai': [19.033, 73.03], Colaba: [18.915, 72.825] };
$('#area').innerHTML = Object.keys(AREAS).map(a => `<option>${a}</option>`).join('');
$('#area').addEventListener('change', () => { const c = AREAS[$('#area').value]; me = { lat: c[0], lng: c[1] }; rLoc(); });
$('#useLoc').addEventListener('click', () => {
  if (!navigator.geolocation) return toast('Location is not supported. Showing Mumbai.');
  navigator.geolocation.getCurrentPosition(p => { me = { lat: p.coords.latitude, lng: p.coords.longitude }; rLoc(); toast('Location updated.'); },
    () => toast('Location blocked. Showing Mumbai.'));
});

// ---------- 7. NGO details ----------
function rNgo(id) {
  const n = NGOS.find(x => x.id === id), el = $('#v-ngo');
  if (!n) { el.innerHTML = '<p>NGO not found. <a href="#search">Search NGOs</a></p>'; return; }
  const rv = reviewsOf(id), sum = rv.reduce((s, r) => s + r.stars, 0), avg = ((n.rating * n.n + sum) / ((n.n + rv.length) || 1)).toFixed(1);
  const raised = raisedOf(n), pct = Math.min(100, Math.round(raised / n.goal * 100)), u = user(), mine = (u && u.docs || []).map(d => d.type);
  let stars = '';
  for (let i = 1; i <= 5; i++) stars += `<label><input type="radio" name="stars" value="${i}" ${i === 5 ? 'checked' : ''}>${'★'.repeat(i)}</label>`;
  const map = `https://www.openstreetmap.org/export/embed.html?bbox=${n.lng - .01},${n.lat - .007},${n.lng + .01},${n.lat + .007}&layer=mapnik&marker=${n.lat},${n.lng}`;
  el.innerHTML = `
  <p class="crumb"><a href="#home">Home</a> / NGO Details</p><h2>NGO Details</h2>
  <div class="head">${pic(n, 'logoBox')}
    <div class="info"><h3>${n.name}</h3><span class="muted">${n.cause}</span><br><b style="color:var(--blue);font-size:.85rem">${n.tag}</b><p class="muted">${n.desc}</p></div>
    <div class="acts"><button class="btn" data-act="roles">Volunteer / Register</button>
      <a class="btn o" href="mailto:${n.email}">Contact NGO</a>
      <button class="btn ghost" data-act="donate">Donate</button></div></div>
  <div class="cols"><div>
    <div class="box"><h3>About</h3><p>${n.about}</p><h3>Activities</h3><ul>${n.acts.map(a => `<li>${a}</li>`).join('')}</ul>
      <h3>Current Needs</h3><p style="color:var(--blue);font-weight:600">${n.need}</p>
      <p class="muted sm">Address: ${n.addr} • Hours: ${n.hours} • Phone: ${n.phone}</p>
      <iframe class="nmap" title="Map of ${n.name}" loading="lazy" src="${map}"></iframe></div>
    <div class="box" id="applyBox" hidden><h3 id="apTitle"></h3>
      <label>Preferred time slot<select id="apSlot"><option value="">Select a slot</option>${n.slots.map(s => `<option>${s}</option>`).join('')}</select></label>
      <p class="lbl">Documents attached from your profile</p><div id="apDocs"></div><small class="err" id="apErr"></small>
      <div class="row2"><button class="btn o" data-act="cancelApply">Cancel</button><button class="btn" data-act="confirmApply">Submit application</button></div></div>
    <div class="box" id="donBox" hidden><h3>Donations and fundraising</h3>
      <div class="prog"><i style="width:${pct}%"></i></div><p>₹${raised.toLocaleString('en-IN')} raised of ₹${n.goal.toLocaleString('en-IN')} (${pct}%)</p>
      <p class="muted">To contribute, pay by UPI to <b>${n.name.split(' ')[0].toLowerCase()}@upi</b> (sample ID), then record your contribution below.</p>
      <label>Amount (₹)<input id="amt" type="number" min="50" placeholder="Minimum 50"><small class="err" id="amtErr"></small></label>
      <button class="btn" data-act="record">Record my contribution</button></div>
    <div class="box"><h3>Reviews</h3>${rv.length ? rv.map(r => `<p><b>${'★'.repeat(r.stars)}</b> ${r.text}<br><span class="muted sm">${r.who}</span></p>`).join('') : '<p class="muted">No new reviews yet.</p>'}
      ${u ? `<p class="lbl">Rating</p><div class="grp">${stars}</div>
      <label>Your review<textarea id="rtext" rows="2"></textarea><small class="err" id="rErr"></small></label><button class="btn" data-act="review">Post review</button>`
      : '<p><a href="#login">Sign in</a> to write a review.</p>'}</div></div>
  <div><div class="box" id="roles"><h3>Volunteer Opportunities</h3>
      ${n.roles.map((r, i) => `<div class="role"><b>${r[0]}</b><span class="muted">${r[1]}</span><br><button class="btn o" style="margin-top:6px" data-act="apply" data-i="${i}">Apply</button></div>`).join('')}
      <p><b>Time slots</b></p><ul>${n.slots.map(s => `<li>${s}</li>`).join('')}</ul>
      <p><b>Documents needed</b></p><ul>${n.docs.map(d => `<li>${mine.includes(d) ? '✓' : '○'} ${d}</li>`).join('')}</ul>
      <p class="muted sm">✓ means it is already in your <a href="#profile">Profile</a>.</p>
      <p><b>Reviews &amp; Ratings</b><br>${avg} / 5 • ${n.n + rv.length} reviews</p>
      <button class="btn" data-act="roles" style="width:100%">Register as Volunteer</button></div>
    <button class="btn o" data-act="share" style="width:100%">Share this NGO</button></div></div>`;
  el.dataset.id = id;
}
function openApply(n, i) {
  const mine = (user().docs || []).map(d => d.type);
  $('#apTitle').textContent = 'Apply: ' + n.roles[i][0]; $('#applyBox').dataset.i = i; $('#applyBox').hidden = false; $('#apErr').textContent = '';
  $('#apDocs').innerHTML = n.docs.map(d => mine.includes(d) ? `<p>✓ ${d} (from your profile)</p>` : `<p style="color:var(--bad)">✗ ${d} is missing. <a href="#profile">Upload it in Profile</a></p>`).join('');
  $('#applyBox').scrollIntoView({ behavior: 'smooth' });
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const id = +$('#v-ngo').dataset.id, n = NGOS.find(x => x.id === id), u = user(), a = b.dataset.act;
  if (a === 'roles') $('#roles').scrollIntoView({ behavior: 'smooth' });
  if (a === 'donate') $('#donBox').hidden = !$('#donBox').hidden;
  if (a === 'share') {
    const url = location.href;
    if (navigator.share) navigator.share({ title: n.name, url }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => toast('Link copied.'));
    else toast('Copy the link from the address bar.');
  }
  if (a === 'apply') {
    if (!u) { sessionStorage.setItem('next', location.hash); toast('Sign in to apply.'); location.hash = '#login'; return; }
    if (u.role !== 'v') return toast('Only volunteer accounts can apply.');
    openApply(n, +b.dataset.i);
  }
  if (a === 'cancelApply') $('#applyBox').hidden = true;
  if (a === 'confirmApply') {
    const role = n.roles[+$('#applyBox').dataset.i][0], sl = $('#apSlot'), mine = (u.docs || []).map(d => d.type), miss = n.docs.filter(d => !mine.includes(d)), apps = load('apps', []);
    if (sl.selectedIndex < 1) { $('#apErr').textContent = 'Choose a time slot.'; return; }
    if (miss.length) { $('#apErr').textContent = 'Upload these in Profile first: ' + miss.join(', ') + '.'; return; }
    if (apps.some(x => x.ngo === id && x.role === role && x.email === u.email)) { $('#apErr').textContent = 'You have already applied for this role.'; return; }
    apps.push({ ngo: id, name: n.name, role, email: u.email, slot: sl.value, docs: n.docs.join(', '), date: new Date().toLocaleDateString('en-IN'), status: 'Applied' });
    save('apps', apps); $('#applyBox').hidden = true; toast('Application sent. Track it in Profile.');
  }
  if (a === 'record') {
    const v = +$('#amt').value;
    if (!(v >= 50)) { $('#amtErr').textContent = 'Enter an amount of at least ₹50.'; return; }
    const d = load('donations', []); d.push({ ngo: id, amt: v, email: u ? u.email : 'guest' }); save('donations', d);
    toast('Thank you. Your contribution is recorded.'); rNgo(id); $('#donBox').hidden = false;
  }
  if (a === 'review') {
    const t = $('#rtext').value.trim(), rv = load('reviews', []);
    if (t.length < 5) { $('#rErr').textContent = 'Write at least 5 characters.'; return; }
    if (rv.some(r => r.ngo === id && r.email === u.email)) { $('#rErr').textContent = 'You have already reviewed this NGO.'; return; }
    rv.push({ ngo: id, stars: +document.querySelector('input[name=stars]:checked').value, text: t, who: u.name, email: u.email }); save('reviews', rv); toast('Review posted.'); rNgo(id);
  }
  if (a === 'withdraw') { save('apps', load('apps', []).filter((x, i) => i !== +b.dataset.i)); toast('Application withdrawn.'); rProfile(); }
  if (a === 'rmdoc') { u.docs.splice(+b.dataset.i, 1); saveUser(u); toast('Document removed.'); rProfile(); }
  if (a === 'logout') { sessionStorage.removeItem('session'); toast('Signed out.'); location.hash = '#login'; }
});

// ---------- 8. Login with OTP (simulated) ----------
let role = 'v', ch = 'email', otp = null, otpExp = 0, tries = 0, cd;
$('#roleTog').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; role = b.dataset.role; all('#roleTog button').forEach(x => x.classList.toggle('on', x === b)); });
$('#chTog').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return; ch = b.dataset.ch;
  all('#chTog button').forEach(x => x.classList.toggle('on', x === b));
  $('#idLbl').textContent = ch === 'email' ? 'Email address' : 'Mobile number';
  $('#l-id').placeholder = ch === 'email' ? 'Enter your email address' : 'Enter your 10-digit mobile number'; $('#l-id').value = '';
});
const boxes = all('.ob');
boxes.forEach((b, i) => {
  b.addEventListener('input', () => { b.value = b.value.replace(/\D/g, ''); if (b.value && boxes[i + 1]) boxes[i + 1].focus(); });
  b.addEventListener('keydown', e => { if (e.key === 'Backspace' && !b.value && boxes[i - 1]) boxes[i - 1].focus(); });
});
$('#sendOtp').addEventListener('click', () => {
  const el = $('#l-id'), val = el.value.trim().toLowerCase(), err = el.parentElement.querySelector('.err');
  const bad = ch === 'email' ? R.email(val) : R.phone(val);
  if (bad !== true) { err.textContent = bad; return; }
  const found = load('users', []).find(u => u.role === role && (ch === 'email' ? u.email === val : u.phone === val));
  if (!found) { err.innerHTML = 'No account found for this role. Create an account first.'; return; }
  err.textContent = '';
  otp = String(Math.floor(100000 + Math.random() * 900000)); otpExp = Date.now() + 5 * 60000; tries = 0;
  $('#otpMsg').textContent = 'OTP sent. It is valid for 5 minutes.';
  toast('Demo OTP: ' + otp + ' (a real site would send this by ' + (ch === 'email' ? 'email' : 'SMS') + ')');
  boxes.forEach(x => x.value = ''); boxes[0].focus();
  let s = 30; const btn = $('#sendOtp'); btn.disabled = true; clearInterval(cd);
  cd = setInterval(() => { btn.textContent = 'Resend in ' + --s + 's'; if (s <= 0) { clearInterval(cd); btn.disabled = false; btn.textContent = 'Send OTP'; } }, 1000);
});
$('#verify').addEventListener('click', () => {
  const code = boxes.map(b => b.value).join(''), m = $('#otpMsg');
  if (!otp) { m.textContent = 'Select Send OTP first.'; return; }
  if (code.length < 6) { m.textContent = 'Enter all 6 digits.'; return; }
  if (Date.now() > otpExp) { otp = null; m.textContent = 'OTP expired. Send a new one.'; return; }
  if (code !== otp) { tries++; if (tries >= 3) { otp = null; m.textContent = 'Too many wrong attempts. Send a new OTP.'; } else m.textContent = 'Wrong OTP. ' + (3 - tries) + ' attempt(s) left.'; return; }
  const val = $('#l-id').value.trim().toLowerCase();
  setSession(load('users', []).find(u => u.role === role && (ch === 'email' ? u.email === val : u.phone === val)));
  otp = null; toast('Signed in.');
  const next = sessionStorage.getItem('next'); sessionStorage.removeItem('next'); location.hash = next || '#home';
});

// ---------- 9. Registration (2 steps) ----------
let reg = 'v';
function fileErr(f) { return !f ? 'Upload a file.' : !/\.(pdf|jpe?g|png)$/i.test(f.name) ? 'Use a PDF, JPG or PNG file.' : f.size > 2 * 1024 * 1024 ? 'File is larger than 2 MB.' : ''; }
function saveUser(u) { setSession(u); save('users', load('users', []).map(x => x.email === u.email && x.role === u.role ? u : x)); }
$('#regTog').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return; reg = b.dataset.reg;
  all('#regTog button').forEach(x => x.classList.toggle('on', x === b));
  all('[data-for]').forEach(d => d.hidden = d.dataset.for !== reg);
});
all('[data-r]').forEach(el => el.addEventListener('input', () => check(el)));
const stepOk = s => all(s + ' [data-r]').filter(el => !el.closest('[hidden]')).map(check).every(Boolean);
const picked = name => all('input[name=' + name + ']:checked').map(x => x.value);
$('#same').addEventListener('change', e => { const p = $('#r-ephone'); p.disabled = e.target.checked; p.value = e.target.checked ? $('#r-phone').value : ''; });  // enable/disable (Exp 6)
$('#nextBtn').addEventListener('click', () => {
  if (!stepOk('#step1')) return toast('Fix the highlighted fields.');
  const email = $('#r-email').value.trim().toLowerCase(), phone = $('#r-phone').value.trim();
  if (load('users', []).some(u => u.role === reg && (u.email === email || u.phone === phone))) return toast('An account with this email or mobile already exists.');
  $('#step1').hidden = true; $('#step2').hidden = false; window.scrollTo(0, 0);
});
$('#backBtn').addEventListener('click', () => { $('#step2').hidden = true; $('#step1').hidden = false; });
$('#regBtn').addEventListener('click', () => {
  if (!stepOk('#step2')) return toast('Fix the highlighted fields.');
  const u = { role: reg, name: $('#r-name').value.trim(), email: $('#r-email').value.trim().toLowerCase(), phone: $('#r-phone').value.trim() };
  if (reg === 'v') {
    if ($('#r-course').selectedIndex < 1 || $('#r-year').selectedIndex < 1 || $('#r-slot').selectedIndex < 1) return toast('Select your course, year and preferred time.');
    const days = picked('day'); if (!days.length) return toast('Choose at least one day you are available.');
    if ($('#r-why').value.trim().length < 10) return toast('Tell us why you want to volunteer (10+ characters).');
    const f1 = $('#r-id').files[0], f2 = $('#r-cid').files[0], e1 = fileErr(f1), e2 = f2 ? fileErr(f2) : '';
    $('#idErr').textContent = e1 ? 'ID proof: ' + e1 : e2 ? 'College ID: ' + e2 : ''; if (e1 || e2) return;
    Object.assign(u, { dob: $('#r-dob').value, city: $('#r-vcity').value.trim(), password: $('#r-pw').value, college: $('#r-college').value.trim(),
      course: $('#r-course').value, year: $('#r-year').value, skills: picked('skill'), days, slot: $('#r-slot').value,
      ename: $('#r-ename').value.trim(), ephone: $('#r-ephone').value.trim(), why: $('#r-why').value.trim(),
      docs: [{ type: 'ID proof', name: f1.name }].concat(f2 ? [{ type: 'College ID', name: f2.name }] : []) });
  } else {
    const slots = $('#r-nslots').value.split(',').map(s => s.trim()).filter(Boolean);
    if (!slots.length) return toast('Add at least one volunteer time slot.');
    const city = $('#r-city').value.trim(), desc = $('#r-desc').value.trim() || 'New NGO on NGOConnect.', area = $('#r-addr').value.trim();
    const n = { id: Date.now(), name: u.name, cause: $('#r-cause').value.trim(), city, area: city, addr: area + ', ' + city, tag: city + ' • New', lat: 19.076, lng: 72.878,
      rating: 0, n: 0, goal: 50000, raised: 0, hours: 'Contact NGO', email: u.email, phone: u.phone, desc, about: desc, acts: ['To be updated'],
      need: 'Contact the NGO for current needs.', roles: [['General Volunteer', 'Contact the NGO for details.']], docs: picked('ndoc'), slots, regno: $('#r-regno').value.trim() };
    const saved = load('ngos', []); saved.push(n); save('ngos', saved); NGOS.push(n);
  }
  if (!$('#r-terms').checked) return toast('Accept the terms to continue.');
  const users = load('users', []); users.push(u); save('users', users); toast('Account created. Sign in with an OTP.'); location.hash = '#login';
});

// ---------- 10. Profile ----------
const DOCT = Object.values(D);
function rProfile() {
  const u = user(), el = $('#v-profile');
  if (!u) { el.innerHTML = '<h2>Profile</h2><div class="box"><p>Sign in to see your profile and applications.</p><a class="btn" href="#login">Sign in</a></div>'; return; }
  const apps = load('apps', []).map((a, i) => ({ ...a, i })).filter(a => a.email === u.email), v = u.role === 'v';
  el.innerHTML = `<h2>Profile</h2>
  <div class="box"><h3>${u.name}</h3><p class="muted">${v ? 'Volunteer / Student' : 'NGO'} • ${u.email} • +91 ${u.phone}</p>
    ${v ? `<p>${u.course || ''} ${u.year || ''} • ${u.college || ''}<br>Skills: ${(u.skills || []).join(', ') || '-'}<br>Available: ${(u.days || []).join(', ') || '-'} • ${u.slot || '-'}<br>Emergency contact: ${u.ename || '-'} (${u.ephone || '-'})</p>` : ''}
    <button class="btn o" data-act="logout">Sign out</button></div>
  ${v ? `<div class="box"><h3>My documents</h3><p class="muted sm">NGOs ask for specific documents. Keep yours here (PDF, JPG or PNG, up to 2 MB).</p>
    <ul>${(u.docs || []).map((d, i) => `<li><b>${d.type}</b>: ${d.name} <button class="btn o" style="padding:2px 8px" data-act="rmdoc" data-i="${i}">Remove</button></li>`).join('') || '<li class="muted">No documents added yet.</li>'}</ul>
    <label>Document type<select id="dtype">${DOCT.map(t => `<option>${t}</option>`).join('')}</select></label>
    <input type="file" id="doc" accept=".pdf,.jpg,.jpeg,.png"><small class="err" id="docErr"></small></div>
  <div class="box"><h3>My applications</h3>${apps.length ? apps.map(a => `<div class="role"><b>${a.role}</b> at <a href="#ngo/${a.ngo}">${a.name}</a><br>Slot: ${a.slot || '-'} • Documents: ${a.docs || '-'}<br>
    <span class="status">${a.status}</span> <span class="muted sm">${a.date}</span> <button class="btn o" style="padding:4px 10px" data-act="withdraw" data-i="${a.i}">Withdraw</button></div>`).join('')
    : '<p class="muted">No applications yet. <a href="#search">Find an NGO</a> to get started.</p>'}</div>` : ''}`;
  const f = $('#doc');
  if (f) f.addEventListener('change', () => {
    const file = f.files[0]; if (!file) return;
    const er = fileErr(file); if (er) { $('#docErr').textContent = er; return; }
    const t = $('#dtype').value; u.docs = (u.docs || []).filter(d => d.type !== t).concat({ type: t, name: file.name });
    saveUser(u); toast(t + ' added.'); rProfile();
  });
}

// ---------- 11. Feedback ----------
$('#fbBtn').addEventListener('click', () => {
  const t = $('#fb'), ok = t.value.trim().length >= 10;
  t.classList.toggle('bad', !ok); t.parentElement.querySelector('.err').textContent = ok ? '' : 'Write at least 10 characters.';
  if (!ok) return;
  const f = load('feedback', []); f.push({ text: t.value.trim(), date: new Date().toISOString() }); save('feedback', f);
  t.value = ''; toast('Thank you for your feedback.');
});

// ---------- 12. Start ----------
go();