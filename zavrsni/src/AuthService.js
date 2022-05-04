export function saveTokenInLocalStorage(userDetails) {
    localStorage.setItem('token', JSON.stringify(userDetails.token));
    localStorage.setItem('user', JSON.stringify(userDetails.user));
    localStorage.setItem('expires', JSON.stringify(userDetails.expires));
}
