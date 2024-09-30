export function setSession(key, value) {
  // console.log(key, value);
  window.sessionStorage.setItem(key, value)
}
export function getSession(key) {
  // console.log(key);
  return window.sessionStorage.getItem(key)
}
export function removeSession(key) {
  window.sessionStorage.removeItem(key)
}
