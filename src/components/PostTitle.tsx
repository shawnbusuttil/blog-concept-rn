import React, { useContext } from 'react'
import { StyleSheet, Text } from 'react-native'

import BlogContext from '../context/BlogContext'

export const PostTitle = ({ id }: { id: number }) => {
    const { state } = useContext(BlogContext)
    const post = state.posts.find(post => post.id === id)!

    return <Text style={styles.postTitleStyles}>{post.title}</Text>
}

const styles = StyleSheet.create({
    postTitleStyles: {
        fontSize: 18,
        fontWeight: "bold",
    }
})