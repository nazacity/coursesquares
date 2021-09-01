import HttpRequest from './HttpRequest';

class AuthProvider extends HttpRequest {
  login(payload) {
    return this.post('/login', payload);
  }

  resetPassword(email) {
    return this.get(`/forget-password/email/${email}/3`);
  }
}

export default AuthProvider;
