export interface Session {
  id: string;
  username: string;
  name: string;
  is_admin: boolean;
}

export function encodeSession(session: Session): string {
  return btoa(JSON.stringify(session));
}

export function decodeSession(value: string): Session | null {
  try {
    const decoded = JSON.parse(atob(value));
    if (!decoded.id || !decoded.username) return null;
    return decoded as Session;
  } catch {
    return null;
  }
}
