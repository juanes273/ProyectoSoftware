// Utiliza una biblioteca para decodificar el token, como jsonwebtoken
import jwt_decode from 'jwt-decode';

function getToken() {
  return localStorage.getItem('token');
}

function getRole() {
  const token = getToken();
  if (token) {
    const decodedToken = jwt_decode(token);
    return decodedToken.role;
  }
  return null;
}

export { getToken, getRole };
