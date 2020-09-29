import React, { useContext, useState } from 'react'
import { Button, Text, TextInput, StyleSheet, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'

import BlogContext from '../context/BlogContext'
import { RootStackParamList } from '../types/Navigation'
import { RouteProp } from '@react-navigation/native'

export const EditScreen = ({ navigation, route }: { 
    navigation: StackNavigationProp<RootStackParamList>,
    route: RouteProp<RootStackParamList, 'EditPost'>,
}) => {
    const { state, editPost } = useContext(BlogContext)
    const post = state.posts.find(post => post.id === route.params.id)!

    const [newTitle, setTitle] = useState(post!.title)
    const [newContent, setContent] = useState(post!.content)

    return (
        <View style={{ margin: 15 }}>
            <Text style={styles.labelStyles}>Title:</Text>
            <TextInput style={styles.inputStyles} value={newTitle} onChangeText={(text) => setTitle(text)} />
            <Text style={styles.labelStyles}>Content:</Text>
            <TextInput 
                numberOfLines={5}
                multiline 
                style={styles.inputStyles}
                value={newContent} 
                onChangeText={(text) => setContent(text)} 
            />
            <Button title='Save Changes' onPress={() => {
                editPost({ 
                    id: post.id,
                    title: newTitle,
                    content: newContent
                })
                navigation.pop()
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyles: {
        borderColor: 'black',
        borderWidth: 1,
        fontSize: 18,
        marginBottom: 15,
        padding: 5,

    },
    labelStyles: {
        fontSize: 20,
        marginBottom: 10
    }
})