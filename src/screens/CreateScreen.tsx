import React, { useContext, useState } from 'react'
import { Button, Text, TextInput, StyleSheet, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'

import BlogContext from '../context/BlogContext'
import { RootStackParamList } from '../types/Navigation'

export const CreateScreen = ({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const { addPost } = useContext(BlogContext)

    return (
        <View style={{ margin: 15 }}>
            <Text style={styles.labelStyles}>Title:</Text>
            <TextInput style={styles.inputStyles} value={title} onChangeText={(text) => setTitle(text)} />
            <Text style={styles.labelStyles}>Content:</Text>
            <TextInput 
                numberOfLines={5}
                multiline 
                style={styles.inputStyles}
                value={content} 
                onChangeText={(text) => setContent(text)} 
            />
            <Button title='Publish' onPress={() => {
                addPost(title, content)
                navigation.navigate('Home')
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