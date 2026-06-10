
const roles=["Senior IT Support Engineer","Microsoft 365 Administrator","Active Directory Specialist","Infrastructure Support Engineer"];
let r=0;setInterval(()=>{document.getElementById("role").textContent=roles[r++%roles.length]},1500);

document.getElementById("theme").onclick=()=>{document.body.classList.toggle("light");localStorage.theme=document.body.classList.contains("light")?"light":"dark";};
if(localStorage.theme==="light")document.body.classList.add("light");

const t={
en:{high:"Professional Highlights",skills:"Skills",timeline:"Career Timeline",contact:"Contact"},
hi:{high:"व्यावसायिक उपलब्धियां",skills:"कौशल",timeline:"करियर यात्रा",contact:"संपर्क"},
mr:{high:"व्यावसायिक ठळक मुद्दे",skills:"कौशल्ये",timeline:"कारकीर्द प्रवास",contact:"संपर्क"}
};
document.getElementById("lang").onchange=e=>{
let l=t[e.target.value];
document.querySelector('[data-k="high"]').innerText=l.high;
document.querySelector('[data-k="skills"]').innerText=l.skills;
document.querySelector('[data-k="timeline"]').innerText=l.timeline;
document.querySelector('[data-k="contact"]').innerText=l.contact;
};
