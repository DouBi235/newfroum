export const userStatus = (state, user) => {
    if(user) {
        state.currentUser = user.result.name;
        state.isLogin = true
        state.token = user.token;
    }else if(user === null) {
        //登出的时候，清空sessionStorage里的东西
        sessionStorage.setItem('userName', null);
        sessionStorage.setItem('userToken', '');
        state.currentUser = '';
        state.isLogin = false;
        state.token = ''
    }
};