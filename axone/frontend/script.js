async function loadStatus() {
  const res = await fetch("http://161.97.121.205:8244/api/status");
  const data = await res.json();

  document.getElementById("dashboard").innerHTML = `
    <p><strong>Moniker:</strong> ${data.moniker}</p>
    <p><strong>Block Height:</strong> ${data.block_height}</p>
    <p><strong>Block Time:</strong> ${new Date(data.block_time).toLocaleString()}</p>
    <p><strong>Catching Up:</strong> ${data.catching_up ? "Yes" : "No"}</p>
    <p><strong>Voting Power:</strong> ${data.voting_power}</p>
  `;
}

loadStatus();
setInterval(loadStatus, 10000);
