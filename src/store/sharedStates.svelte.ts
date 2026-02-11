import type { User } from '$interfaces/user.interface';

// Store fuer Authentifizierungsstatus
class AuthState {
  value = $state(false);
}
export const isAuthenticated = new AuthState();

// Store fuer User-Daten
class UserState {
  value = $state<User | {}>({});
}
export const user = new UserState();

// Store fuer User-Roles
class RolesState {
  value = $state<string[]>([]);
}
export const userroles = new RolesState();
