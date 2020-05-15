let state = {
    token: null,
    user: {
        username: '',
        role: '',
        id: ''
    },
    company: {
        name: 'Happy Company',
        address: '123 Main Street, New York',
        email: 'happycompany@hotmail.com',
        phone: '1-541-754-3010'
    }
}

const setToken = (token) => {
    state.token = token;
    localStorage.setItem('token',token);
}

const setUser = (user) => {
    state.user = {
        username: user.username,
        role: user.role,
        id: user.id
    }
    localStorage.setItem('username',user.username);
    localStorage.setItem('role',user.role);
    localStorage.setItem('id',user.id);
}


const getToken = () => {
    const token = state.token ? state.token : 
    localStorage.getItem('token') ? localStorage.getItem('token') 
    : null ;

    return token
}

const isLogin = () => {
    return state.token || localStorage.getItem('token')
}


const deleteUser = () => {
    return new Promise (resolve => {
        state.token = null;
        state.id = null;
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        resolve();
    })
}


const users = [
    {
        username: 'admin',
        password: '123',
        role: 'admin',
        id: '1909'
    },
    {
        username: 'user',
        password: '123',
        role: 'user',
        id: '995'
    },
    {
        username: 'user!',
        password: '123',
        role: 'user',
        id: '7375'
    }
]

export { state, setToken, getToken, isLogin, deleteUser, setUser, users }