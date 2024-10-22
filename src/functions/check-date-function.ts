export function isMonday(): boolean {
  const today = new Date();
  return today.getDay() === 2;
}
