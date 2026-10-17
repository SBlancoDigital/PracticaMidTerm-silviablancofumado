const SESSION_KEY = "pokememory_session";

export function saveProfile(profile) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(profile));
}

export function loadProfile() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function clearProfile() {
  sessionStorage.removeItem(SESSION_KEY);
}