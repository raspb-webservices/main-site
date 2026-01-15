export function openAuth0Popup(width = 450, height = 650) {
  const dualLeft = window.screenLeft ?? window.screenX ?? 0;
  const dualTop = window.screenTop ?? window.screenY ?? 0;

  const w = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;
  const h = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height;

  const left = Math.max(0, Math.floor(dualLeft + (w - width) / 2));
  const top = Math.max(0, Math.floor(dualTop + (h - height) / 2));

  const features = [
    `width=${width}`,
    `height=${height}`,
    `left=${left}`,
    `top=${top}`,
    'resizable=yes',
    'toolbar=no',
    'menubar=no',
    'location=no',
    'status=no'
  ].join(',');

  return window.open('about:blank', 'auth0:popup', features);
}
