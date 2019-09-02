import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ComponentDrawer from './ComponentDrawer'
import AddNote from '../screens/AddNote'
import Home from '../screens/Home'
import EditNote from '../screens/EditNote'
import axios from 'axios';

const leaderStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
                headerLeft: (
                    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 20 }}>
                        <Image style={{width:40, height: 40, borderRadius: 50}} source={{uri : 'https://res.cloudinary.com/abdi-library-storage/image/upload/v1567409295/DSC_0148-01_nxtfi0.jpg'}} />
                    </TouchableOpacity>
                ),
                headerRight: (
                    <TouchableOpacity style={{marginRight: 20}} onPress={() => alert('Hello sort')}>
                         <Ionicons name="md-funnel" size={30} />
                    </TouchableOpacity >
                )
            })
        },
        AddNote: {
            screen: AddNote,
            navigationOptions: {
                header: null
            }
        },
       EditNote: {
            screen: EditNote,
            navigationOptions: {
                header: null
            }
        },
    }
);

const DrawerNavigator = createDrawerNavigator(

    {
        Home: { screen: leaderStack },

    },
    {
        // hideStatusBar: true,
        contentComponent: ComponentDrawer,
        useNativeAnimations: true,
        drawerWidth: 250,
        overlayColor: 'rgba(0,0,0,.7)',
        contentOptions: {
            activeTintColor: '#fff',
            activeBackgroundColor: '#6b52ae',
        },
    },
    {
        initialRouteName: 'Home',
    }
);

export default createAppContainer(DrawerNavigator);