export function handleError(fnc, callback) {
  fnc.catch(err => callback(err));
}
