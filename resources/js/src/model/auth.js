class Auth{
    constructor(){
        this.state = {
            isAuthenticated: false,
            accessType: ''
        }
    }

    login(){
        return true;
    }

    logout(){
        return true;
    }
}

export default new Auth()