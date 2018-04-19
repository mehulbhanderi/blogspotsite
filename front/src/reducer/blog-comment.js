import _ from 'lodash'
const blogComment=(state=[],action)=>{
    switch (action.type) {
        case 'GET_COMMENT_BY_BLOG':
            // state.push(action.payload);
            // return _.cloneDeep(state);
        return action.payload;
        case 'BLOG_COMMENT':
            state.unshift(action.payload);
            return _.cloneDeep(state);
        case 'USER_LOGOUT':
            return state=[];
        default:
            return state;
    }
};
export default blogComment;