import getToken from './helpers/getToken';

class AuthService {
  authHeader() {
    return { Authorization: `Token ${getToken()}` };
  }
}

export default new AuthService();
