// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: { sub: string; email: string; name?: string } | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

declare module '*.mp3' {
  const src: string;
  export default src;
}

export {};
