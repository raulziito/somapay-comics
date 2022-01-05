export const AUTENTICATE = "@autenticado";
export const INFO = "@userInfo";

export const isAuthenticated =  () =>   localStorage.getItem(AUTENTICATE);
export const userInfo = () => JSON.parse(localStorage.getItem(INFO));
export const getToken = () =>  localStorage.getItem(AUTENTICATE);

export const login = token => {
 
  if(token.name !== undefined) {
    localStorage.setItem(INFO, JSON.stringify(token));
    localStorage.setItem(AUTENTICATE,token.name);
  } else {
    localStorage.setItem(INFO, JSON.stringify(token));
    localStorage.setItem(AUTENTICATE,token.profileObj.name);
  }
}


export const logout = () => {
  localStorage.removeItem(AUTENTICATE);
  localStorage.removeItem(INFO);

};