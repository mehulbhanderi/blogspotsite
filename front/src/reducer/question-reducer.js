import _ from 'lodash'
const question=(state=[],action)=>{
    switch (action.type) {
        case 'GET_QUESTIONS':
            return action.payload;
        case 'GENERATE_QUESTION':
            state.push(action.payload)
            return _.cloneDeep(state);
        case 'UPDATE_QUESTION':
            let bid= state.map(x=>x._id).indexOf(action.payload._id);
            state.splice(bid, 1, action.payload);
            return _.cloneDeep(state);
        default:
            return state;
    }
};
export default question;