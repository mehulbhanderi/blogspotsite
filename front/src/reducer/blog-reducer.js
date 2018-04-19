import _ from 'lodash'
const blog=(state=[],action)=>{
    switch (action.type) {
        case 'GET_BLOGS':
            return action.payload;
        case 'GENERATE_BLOG':
            state.push(action.payload);
            return _.cloneDeep(state);
        case 'UPDATE_BLOG':
            let bid= state.map(x=>x._id).indexOf(action.payload._id);
            state.splice(bid, 1, action.payload);
            return _.cloneDeep(state);
        case 'USER_LOGOUT':
            return state=[];
            default:
            return state;
    }
};
export default blog;