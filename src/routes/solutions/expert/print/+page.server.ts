import QRCode from 'qrcode';

export async function load() {
  const qrSvg = await QRCode.toString('https://raspb.de/solutions/expert', {
    type: 'svg',
    margin: 1,
    color: { dark: '#1a1a2e', light: '#00000000' }
  });
  return { qrSvg };
}
