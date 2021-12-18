const fs = require('fs');
const path = require('path');

const usersModel = {
    getUsers: function () {
        return JSON.parse(
            fs.readFileSync(
                path.join(__dirname, '../data/users.json'),
                { encoding: 'utf-8' }
                )
                );
    },
    findUserByField: function(field, value) {
         let allUsers = this.getUsers();
         let user = allUsers.find(item => item[field] == value);
         return user;
    },
    writeFile: function (file) {
        return fs.writeFileSync(
            path.resolve(__dirname, '../data/users.json'),
            JSON.stringify(file, null, 4),
            { encoding: 'utf-8' }
        );
    },
    createUsers: function (user) {
        const users = this.getUsers();
        user = {
            ...user,
            role: 1
        }
            users.push(user);
            this.writeFile(users);
            return 'User created'
    },
    updateUsers: function (id, user) {
        const indiceBuscado = this.getUsers().findIndex(user => user.id == id);
        if(indiceBuscado < 0) {
            return 'User does not exist in database';
        }
        let newUsersFile = this.getUsers()
        user = {
            ...user,
            role: 1
        };
        newUsersFile[indiceBuscado] = user
        this.writeFile(newUsersFile);
        return 'Users succesfully updated'
    },
    deleteImage: function(fileName) {        
        fs.unlinkSync(path.resolve(__dirname, '../../public/img/users/' + fileName));
    },
    
    deleteUser: function (id) {
        const newUsersFile = this.getUsers().filter(users => users.id != id);
        const oldUser = this.getUsers().filter(user => user.id == id);
        const fileName = oldUser[0].userImage;
        this.deleteImage(fileName);
        this.writeFile(newUsersFile);
    }
};

module.exports = usersModel;