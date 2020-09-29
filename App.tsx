import React from 'react'
import { TouchableOpacity } from 'react-native'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { EvilIcons, Feather } from '@expo/vector-icons'

import { PostTitle } from './src/components/PostTitle'
import { BlogProvider } from './src/context/BlogContext'
import { HomeScreen } from './src/screens/HomeScreen'
import { PostScreen } from './src/screens/PostScreen'
import { CreateScreen } from './src/screens/CreateScreen'
import { EditScreen } from './src/screens/EditScreen'
import { RootStackParamList } from './src/types/Navigation'

const Stack = createStackNavigator<RootStackParamList>()

const App = () => (
  <BlogProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({ navigation }: { navigation: StackNavigationProp<RootStackParamList> }) => ({ 
            title: 'Blog',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('CreatePost')} style={{ paddingRight: 5 }}>
                <Feather name="plus" size={24} />
              </TouchableOpacity>
            ), 
          })} 
        />
        <Stack.Screen
          name="BlogPost"
          component={PostScreen}
          options={({
            navigation, 
            route 
          }: { 
            navigation: StackNavigationProp<RootStackParamList>, 
            route: RouteProp<RootStackParamList, 'BlogPost'> 
          }) => ({
            headerTitle: () => <PostTitle id={route.params.id} />,
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('EditPost', { id: route.params.id })} style={{ paddingRight: 5 }}>
                <EvilIcons name="pencil" size={30} />
              </TouchableOpacity>
            ), 
          })}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreateScreen}
          options={{ 
            title: 'New Post' 
          }}
        />
        <Stack.Screen
          name="EditPost"
          component={EditScreen}
          options={{ 
            title: 'Edit Post' 
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </BlogProvider>
)

export default App