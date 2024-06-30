// models/user.js
class User {
    constructor(UserID, Username, Password, Email, FullName, Role) {
        this.UserID = UserID;
        this.Username = Username;
        this.Password = Password;
        this.Email = Email;
        this.FullName = FullName;
        this.Role = Role;
    }
}

module.exports = User;
