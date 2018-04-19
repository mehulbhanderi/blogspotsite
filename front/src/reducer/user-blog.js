const userBlogs=(state=[],action)=>{
    switch (action.type) {
        case 'GET_BLOG_BY_USER':
            return action.payload;
        default:
            return state;
    }
};
export default userBlogs;