import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RouteProp } from '@react-navigation/native'

import BlogContext from '../context/BlogContext'
import { RootStackParamList } from '../types/Navigation'

export const PostScreen = ({ route }: { route: RouteProp<RootStackParamList, 'BlogPost'> }) => {
    const { state } = useContext(BlogContext)

    const blogPost = state.posts.find(post => post.id === route.params.id)

    return (
        <View>
            <Text>{blogPost?.title}</Text>
            <Text>{blogPost?.content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
})