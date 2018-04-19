const userAnswer=(state=[],action)=>{
    debugger;
    switch (action.type) {
        case 'GET_ANSWER_BY_USER':
            return action.payload;
        default:
            return state;
    }
};
export default userAnswer;