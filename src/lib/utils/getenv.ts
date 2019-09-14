
export default function getenv() {
  let isNode = false;
  if (typeof module !== undefined && module.exports) {
    isNode = true;
  }
  return isNode ? 'node' : 'web';
}

export const isClient = () => getenv() === 'web';

export const isServer = () => getenv() === 'node';
