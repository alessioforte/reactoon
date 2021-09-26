export const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export function getContrastYIQ(hex): string {
  const color = validateHex(hex);
  if (!color) {
    console.warn(`Something goes wrong getContrastYIQ not applied`);
    return 'dark';
  }
  const [r, g, b] = colorHexToRgb(color);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'dark' : 'light';
}

export function getColorLuminance(hex, luminance): string {
  const color = validateHex(hex);
  if (!color) {
    console.warn(`Something goes wrong getColorLuminance not applied`);
    return hex;
  }
  const rgb = colorHexToRgb(color);
  hex = '#';
  luminance = luminance || 0;
  rgb.forEach(c => {
    const x = Math.round(
      Math.min(Math.max(0, c + c * luminance), 255)
    ).toString(16);
    hex += ('00' + x).substr(x.length);
  });
  return hex;
}

function validateHex(color) {
  if (typeof color !== 'string') {
    console.error(`Validate hex color: ${color} is not a string`);
    return false;
  }
  if (color[0] !== '#') {
    console.error(`Validate hex color: ${color} is not a valid hex color`);
    return false;
  }
  color = color.replace('#', '');
  if (color.length < 3) {
    console.error(`Validate hex color: #${color} is not a valid hex color`);
    return false;
  }
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  return `#${color}`;
}

function colorHexToRgb(hex) {
  const r = parseInt(hex[1] + hex[2], 16);
  const g = parseInt(hex[3] + hex[4], 16);
  const b = parseInt(hex[5] + hex[6], 16);
  return [r, g, b];
}
