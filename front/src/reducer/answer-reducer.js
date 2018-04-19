import _ from 'lodash'
const answer=(state=[],action)=>{
    switch (action.type) {
        case 'GET_ANSWERS':
            return action.payload;
        case 'GENERATE_ANSWER':
            state.push(action.payload);
            return _.cloneDeep(state);
        default:
            return state;
    }
};
export default answer;