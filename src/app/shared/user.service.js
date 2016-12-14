/* jshint esversion:6 */
class UserSrv {
  constructor() {
      this.user = null;
  }
  setUser(user){
      this.user = user;
  }

  getUser(user){
      return this.user ? this.user : null;
  }
}

export default UserSrv;
