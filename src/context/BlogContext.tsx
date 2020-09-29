import React, { createContext, useReducer } from "react";

import blogServer from '../api/blog'
import { BlogAction, BlogContextType, BlogPost, BlogState } from "../types/Blog";

const INITIAL_STATE: BlogState = {
    posts: []
}

const BlogContext = createContext<BlogContextType>({
    state: INITIAL_STATE,
    getPosts: () => null,
    addPost: () => null,
    editPost: () => null,
    deletePost: () => null
})

const blogReducer = (state: BlogState, action: BlogAction): BlogState => {
    switch (action.type) {
        case 'GET_POSTS':
            return {
                posts: action.payload
            }
        case 'ADD_POST':
            return { 
                posts: [...state.posts, action.payload]
            }
        case 'EDIT_POST': 
            const idx = state.posts.findIndex(post => post.id === action.payload.id)
            
            const posts = [
                ...state.posts.splice(0, idx),
                action.payload,
                ...state.posts.splice(idx + 1, state.posts.length)
            ]

            return { posts }
        case 'DELETE_POST':
            return {
                posts: state.posts.filter(post => post.id !== action.payload)
            }
        default:
            return state
    }
}
    
export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(blogReducer, INITIAL_STATE)

    const getPosts = async () => {
        const response = await blogServer.get<BlogPost[]>('/blogposts')
        dispatch({
            type: 'GET_POSTS',
            payload: response.data
        })
    }

    const addPost = async (title: string, content: string) => {
        const post = {
            id: Math.floor(Math.random() * 99999),
            title,
            content,
        }

        const response = await blogServer.post<BlogPost>('/blogposts', post)
 
        dispatch({ 
            type: 'ADD_POST', 
            payload: response.data
        })
    } 

    const editPost = async (post: BlogPost) => {
        const response = await blogServer.put<BlogPost>(`/blogposts/${post.id}`, post)

        dispatch({
            type: 'EDIT_POST',
            payload: response.data,
        })
    }

    const deletePost = async (id: number) => {
        await blogServer.delete(`/blogposts/${id}`)

        dispatch({ 
            type: 'DELETE_POST', 
            payload: id
        })
    }

    return (
        <BlogContext.Provider value={{ 
            state,
            getPosts,
            addPost,
            editPost,
            deletePost,
        }}>
            {children}
        </BlogContext.Provider>
    )
}

export default BlogContext