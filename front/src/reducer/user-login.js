
const loginUser=(state=[],action)=>{
    switch (action.type) {
        case 'USER_LOGIN':
            localStorage.setItem('user',action.payload._id);
            return action.payload;
        case 'USER_LOGOUT':
            localStorage.removeItem('user');
            return state=[];
        case 'USER_DETAIL':
            return action.payload;
        default:
            return state
    }
};
export default loginUser;