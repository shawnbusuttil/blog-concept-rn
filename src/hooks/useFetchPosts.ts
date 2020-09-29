import { useContext, useEffect } from 'react'

import BlogContext from '../context/BlogContext'

export const useFetchPosts = () => {
    const { getPosts } = useContext(BlogContext)

    useEffect(() => {
        getPosts()
    }, [])
}