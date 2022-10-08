function saveOptions(event) {
  event.preventDefault();
  browser.storage.sync.set({
    color: document.querySelector('#color').value,
  });
}

function restoreOptions() {
  browser.storage.sync.get('apiKey')
    .then(((result) => document.querySelector('#apiKey').value = result.apiKey || ''), onError);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

document.addEventListener('DOMContentLoaded', restoreOptions);

const form = document.querySelector('form')
form.addEventListener('submit', saveOptions);

form.style.backgroundColor = document.body.style.backgroundColor
