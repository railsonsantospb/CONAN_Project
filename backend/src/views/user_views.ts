import User from '../model/User';

export default {
  render(user: User) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    }
  },
  renderMany(users: User[]) {
    return users.map(user => this.render(user))
  }
}