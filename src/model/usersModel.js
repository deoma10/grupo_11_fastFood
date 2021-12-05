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
    writeFile: function (file) {
        return fs.writeFileSync(
            path.resolve(__dirname, '../data/users.json'),
            JSON.stringify(file, null, 4),
            { encoding: 'utf-8' }
        );
    },
    createUsers: function (user) {
        const users = this.getUsers();
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
        // const fileName = newProductsFile[indiceBuscado].productImage;
        //if(!product.productImage){
        //  user = {
        //     ...user
        //         productImage: fileName
        //    }
        // };
        //Borrar imagen de Usuario
        // fs.unlinkSync(path.resolve(__dirname, '../../public/img/Products/' + fileName));
        
        newUsersFile[indiceBuscado] = user        
        this.writeFile(newUsersFile);
        return 'Users succesfully updated'
    },
    deleteUser: function (id) {
        const newUsersFile = this.getUsers().filter(users => users.id != id);
        // const oldUsers = this.getUsers().filter(users => users.id == id);
        // const fileName = oldproduct[0].productImage;
        // fs.unlinkSync(path.resolve(__dirname, '../../public/img/Products/' + fileName));
        this.writeFile(newUsersFile);
    }
};

module.exports = usersModel;