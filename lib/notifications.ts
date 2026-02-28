let cached: any = null;

export async function getNotifications() {
  if (cached) return cached;
  // dynamic import to avoid running module-top code in Expo Go
  // that requires a development build for push notifications
  // (avoids errors when running in Expo Go).
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  cached = await import('expo-notifications');
  return cached;
}

export function clearNotificationsCache() {
  cached = null;
}
