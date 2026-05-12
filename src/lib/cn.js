export function cn(...args) {
  return args
    .flat()
    .filter(Boolean)
    .filter((x) => typeof x === 'string')
    .join(' ');
}
export default cn;
