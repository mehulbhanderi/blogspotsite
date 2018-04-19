const user=(state=[],action)=>{
    switch (action.type) {
        case 'USER_REGISTRATION':
            return action.payload;
        default:
            return state
    }
};
export default user;