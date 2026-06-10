
const roles=['Senior IT Support Engineer','Microsoft 365 Administrator','Infrastructure Support Specialist','EUC Engineer'];
let i=0;
setInterval(()=>{
document.getElementById('typing').innerText=roles[i%roles.length];
i++;
},1500);

document.getElementById('themeBtn').onclick=()=>{
document.body.classList.toggle('light');
localStorage.theme=document.body.classList.contains('light')?'light':'dark';
};

if(localStorage.theme==='light'){document.body.classList.add('light');}
