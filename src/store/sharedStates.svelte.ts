// Store für Authentifizierungsstatus
export const isAuthenticated = createIsAuthenticated();
export function createIsAuthenticated() {
  let value = $state(false);
  return {
    get() {
      return value;
    },
    set(newValue: boolean) {
      value = newValue;
    }
  };
}

// Store für User-Daten
export const user = createUser();
export function createUser() {
  let value = $state({ name: '', nickname: '', user_id: '', email: '' });
  return {
    get() {
      return value;
    },
    set(user: any) {
      value = user;
    }
  };
}

// Store für Popup-Status
export const popupOpen = createPopupOpen();
export function createPopupOpen() {
  let value = $state(false);
  return {
    get() {
      return value;
    },
    set(newValue: boolean) {
      value = newValue;
    }
  };
}

export let error = $state({ error: 'no error' });