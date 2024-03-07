const AuthRepository = require('../repository/auth');

class AuthService {
   static async login(data) {
      return AuthRepository.login(data);
   }

   static async signup(data) {
      return AuthRepository.signup(data);
   }
}

module.exports = AuthService;