(async()=>{let d=window.ELONEPEDIA_DATA;try{const r=await fetch('data/faqs.json');if(r.ok)d=await r.json()}catch(e){}
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
if(localStorage.dark==='1')document.body.classList.add('dark');
$('#dark').onclick=()=>{document.body.classList.toggle('dark');localStorage.dark=document.body.classList.contains('dark')?'1':'0'};
$('#meta').textContent=`${d.faqs.length} questions · Last updated ${new Date(d.last_updated).toLocaleString()}`;
[...new Set(d.faqs.map(f=>f.category))].sort().forEach(c=>$('#cat').insertAdjacentHTML('beforeend',`<option>${esc(c)}</option>`));
const card=f=>`<details id="${f.id}"><summary>${esc(f.question)}<span class="cat">${esc(f.category)}</span></summary>
<p>${esc(f.answer_summary)} <em class="upd">(${f.answer_type})</em> <span class="badge ${f.verification.startsWith('verified')?'ok':'warn'}">${esc(f.verification)}</span></p>${(f.quotes||[]).map(q=>`<blockquote>“${esc(q.text)}” — <a href="${esc(q.url||'#')}" target="_blank" rel="noopener">${esc(q.source)}</a>${q.timestamp?` @ ${esc(q.timestamp)}`:''}</blockquote>`).join('')}
<div>${f.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><h4>References</h4><ol class="refs">${f.sources.map(s=>`<li>${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>`:esc(s.title)} — ${esc(s.outlet)}, ${s.date}</li>`).join('')}</ol>
<p class="upd">First asked: ${f.first_asked} · Last updated: ${f.last_updated} · Asked in ≥${f.frequency} sources · ${f.verification}</p>
<details><summary class="upd">Update history (${f.updates.length})</summary><ul class="upd">${f.updates.map(u=>`<li>${u.date} [${u.type}] ${esc(u.summary)} — ${esc(u.source)}</li>`).join('')}</ul></details></details>`;
const render=()=>{const q=$('#q').value.toLowerCase(),c=$('#cat').value;
const r=d.faqs.filter(f=>(!c||f.category===c)&&(!q||JSON.stringify([f.question,f.answer_summary,f.tags,f.quotes]).toLowerCase().includes(q)));
$('#list').innerHTML=r.map(card).join('')||'<p>No matches.</p>';};
const P=new URLSearchParams(location.search);if(P.get('q'))$('#q').value=P.get('q');if(P.get('cat'))$('#cat').value=P.get('cat');
$('#q').oninput=render;$('#cat').onchange=render;render();
$('#archive').innerHTML=d.archive.length?d.archive.map(card).join(''):'<p class="note">No retired questions yet.</p>';})();
