import React, { useContext, useEffect } from 'react'
import { 
    FlatList, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Feather } from '@expo/vector-icons'

import BlogContext from '../context/BlogContext'
import { RootStackParamList } from '../types/Navigation'

export const HomeScreen = ({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => {
    const { state, getPosts, deletePost } = useContext(BlogContext)

    useEffect(() => {
        getPosts()
    }, [])
    
    const { posts } = state

    return posts.length ? (
        <View>
            <FlatList
                data={posts}
                keyExtractor={(post) => post.title}
                renderItem={( { item }) => (
                    <TouchableOpacity 
                        style={styles.blogPostStyles} 
                        onPress={() => navigation.navigate('BlogPost', { id: item.id, title: item.title })}
                    >
                        <Text style={styles.titleStyles}>{item.title} - #{item.id}</Text>
                        <TouchableOpacity onPress={() => deletePost(item.id)}>
                            <Feather style={styles.iconStyles} name='trash' />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        </View>
    ): (
        <View style={{ height: "100%", justifyContent: 'center' }}>
            <Text style={styles.noPostsStyles}>No blog posts to show. Start writing.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    blogPostStyles: {
        alignItems: 'center',
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    titleStyles: {
        fontSize: 18,
    },
    iconStyles: {
        fontSize: 18,
    },
    buttonStyles: {
        alignSelf: 'center',
        marginTop: 10,
        width: 200,
    },
    noPostsStyles: {
        fontSize: 18,
        textAlign: "center",
    }
})