import buildComparisonTable from "./buildComparisonTable";

console.log("Injected TornFox")

let url = window.location.href;
const xidPattern = /XID=(?<id>\d+)/

let isLoaded = false;

function getUserId() {
  const match = url.match(xidPattern)
  return match.length == 2 ? match[1] : undefined
}

const getApiKey = async () => (await browser.storage.sync.get('apiKey')).apiKey;

const tornUserEndpoint = 'https://api.torn.com/user';

function buildStatRequest(apiKey, userId) {
  if (userId == null) {
    return `${tornUserEndpoint}?selections=personalstats&key=${apiKey}`;
  }
  return `${tornUserEndpoint}/${userId}?selections=personalstats&key=${apiKey}`;
}

const fetchInit = {
  method: 'GET',
  mode: 'cors',
}

function fetchStats(apiKey, targetId) {
  return Promise.all([
    fetch(buildStatRequest(apiKey), fetchInit),
    fetch(buildStatRequest(apiKey, targetId), fetchInit),
  ]);
}

const parseResponse = (data) => ({
  ...data?.personalstats
})

function compare(dataMe, dataTarget) {
  const myStats = parseResponse(dataMe)
  const targetStats = parseResponse(dataTarget)
  console.log(myStats.xantaken, targetStats.xantaken)
  showComparison(myStats, targetStats)
}

async function run() {
  console.debug("Trigger comparison checker!")
  if (isLoaded) {
    console.debug("Comparison is already loaded.")
    return;
  }
  console.debug("Getting API key from store.")
  const apiKey = await getApiKey();
  if (apiKey == null) {
    console.warn("Could not find API key.")
    return;
  }
  console.debug('Fetching stats.')
  const [responseMe, responseTarget] = await fetchStats(apiKey, getUserId());

  compare(await responseMe.json(), await responseTarget.json());
  isLoaded = true;
}

// document.addEventListener('DOMContentLoaded', run());

function showComparison(myStats, targetStats) {
  const compareView = document.createElement('div');
  // compareView.style = 'background-color=var(--default-bg-panel-color)"'
  compareView.className = "personal-information"
  compareView.innerHTML = buildComparisonTable(myStats, targetStats);

  // compareView.innerHTML = `
  //   <table style="font-size=14px">
  //     <tr>
  //       <th></th>
  //       <th style="padding-left:5px; margin-right:2px">Xanax taken</th>
  //       <th style="padding-left:5px; margin-right:2px">User activity</th>
  //       <th style="padding-left:5px; margin-right:2px">Best damage</th>
  //     </tr>
  //     <tr>
  //       <td style="padding-top:2px; color:rgb(221, 221, 221)">Me</td>
  //       <td style="text-align:center; padding-top:2px; color:rgb(221, 221, 221)">${myStats.xantaken}</td>
  //       <td style="text-align:center; padding-top:2px; color:rgb(221, 221, 221)">${myStats.useractivity}</td>
  //       <td style="text-align:center; padding-top:2px; color:rgb(221, 221, 221)">${myStats.bestdamage}</td>
  //     </tr>
  //     <tr>
  //     <td style="padding-top:2px; color:rgb(221, 221, 221)">Opponent</td>
  //       <td style="text-align:center; padding-top:2px; color:rgb(221, 221, 221)">${targetStats.xantaken}</td>
  //       <td style="text-align:center; padding-top:2px; color:rgb(221, 221, 221)">${targetStats.useractivity}</td>
  //       <td style="text-align:center; padding-top:2px; color:rgb(221, 221, 221)">${targetStats.bestdamage}</td>
  //     </tr>
  //   </table> 
  // `
  // compareView.textContent = JSON.stringify({
  //   xanax: {
  //     me: myStats.xantaken,
  //     opponent: targetStats.xantaken
  //   },
  //   userActivity: {
  //     me: myStats.useractivity,
  //     opponent: targetStats.useractivity
  //   },
  //   bestdamage: {
  //     me: myStats.bestdamage,
  //     opponent: targetStats.bestdamage
  //   }
  // }, null, 2)

  const profile = document.querySelector('.user-profile');
  profile.appendChild(compareView);
  profile.childNodes
}

document.querySelector('div.user-information div.title-black.top-round')
  .addEventListener('click', run)
// document.addEventListener('div.user-information div.title-black.top-round')
