const publicVapidKey = '<YOUR_PUBLIC_KEY>';

if ('serviceWorker' in navigator) {
  registerServiceWorkerAndSubscribe().catch(err => console.error(err));
}

async function registerServiceWorkerAndSubscribe() {
  const sw = await navigator.serviceWorker.register('/service-worker.js');
  const subscription = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: { 'Content-Type': 'application/json' }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

document.getElementById('remindBtn').addEventListener('click', async () => {
  const message = prompt("What do you want to be reminded about?");
  if (!message) return;
  const minutes = prompt("After how many minutes?");
  if (!minutes || isNaN(minutes)) return;

  await fetch('/notify', {
    method: 'POST',
    body: JSON.stringify({ message, delay: parseInt(minutes) }),
    headers: { 'Content-Type': 'application/json' }
  });
  alert(`Reminder set for ${minutes} minutes`);
});
