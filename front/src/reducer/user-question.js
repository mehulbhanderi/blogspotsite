const userQuestion=(state=[],action)=>{
    switch (action.type) {
        case 'GET_QUESTION_BY_USER':
            return action.payload;
        default:
            return state;
    }
};
export default userQuestion;