export type BlogPost = {
    id: number
    title: string
    content: string
}

export type BlogAction =
    | { type: 'GET_POSTS', payload: BlogPost[] }
    | { type: 'ADD_POST', payload: BlogPost }
    | { type: 'EDIT_POST', payload: BlogPost }
    | { type: 'DELETE_POST', payload: number }


export type BlogState = {
    posts: BlogPost[]
}

export type BlogContextType = {
    state: BlogState
    getPosts: () => void
    addPost: (title: string, content: string) => void
    editPost: (post: BlogPost) => void
    deletePost: (id: number) => void
}