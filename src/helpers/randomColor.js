export function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 20) + 90;
  const lightness = Math.floor(Math.random() * 10) + 85;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

