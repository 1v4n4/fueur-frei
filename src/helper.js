const msgs = (msg) => {
  const msgDiv = document.getElementById('forAlert');
  msgDiv.innerHTML = `<p class="sound">${msg}</p>`;
  setTimeout(() => {
    msgDiv.innerHTML = '';
  }, 1000);
};

const alrts = (msg) => {
  const msgDiv = document.getElementById('forAlert');
  msgDiv.innerHTML = `<p class="sound">${msg}</p>`;
  setTimeout(() => {
    msgDiv.innerHTML = '';
  }, 1000);
};

export { msgs, alrts };