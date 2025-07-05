const chains = {
  "Aeneid": "http://161.97.121.205:8000/api/status",
  "Symphony": "http://161.97.121.205:8001/api/status",
  "Lumera": "http://161.97.121.205:8002/api/status",
  "Empeirias": "http://161.97.121.205:8003/api/status",
  "Warden": "http://161.97.121.205:8004/api/status",
  "0g Labs": "http://161.97.121.205:8005/api/status",
  "Kiichain": "http://161.97.121.205:8006/api/status",
  "Axone": "http://161.97.121.205:8007/api/status"
};

const container = document.getElementById("dashboard");

function createCard(name) {
  const card = document.createElement("div");
  card.className = "card";
  card.id = `card-${name}`;
  card.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Moniker:</strong> <span id="${name}-moniker">Loading...</span></p>
    <p><strong>Block Height:</strong> <span id="${name}-height">Loading...</span></p>
    <p><strong>Block Time:</strong> <span id="${name}-time">Loading...</span></p>
    <p><strong>Catching Up:</strong> <span id="${name}-sync">Loading...</span></p>
    <p><strong>Voting Power:</strong> <span id="${name}-vp">Loading...</span></p>
  `;
  container.appendChild(card);
}

function updateCard(name, data) {
  document.getElementById(`${name}-moniker`).innerText = "OneNov";
  document.getElementById(`${name}-height`).innerText = data.block_height || "N/A";
  document.getElementById(`${name}-time`).innerText = new Date(data.block_time).toLocaleString() || "N/A";
  document.getElementById(`${name}-sync`).innerText = data.catching_up ? "Yes" : "No";
  document.getElementById(`${name}-vp`).innerText = data.voting_power || "N/A";
}

async function fetchAll() {
  for (const [name, url] of Object.entries(chains)) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      updateCard(name, data);
    } catch (e) {
      updateCard(name, {
        block_height: "-",
        block_time: "-",
        catching_up: "-",
        voting_power: "-"
      });
    }
  }
}

for (const name of Object.keys(chains)) {
  createCard(name);
}
fetchAll();
setInterval(fetchAll, 10000);
