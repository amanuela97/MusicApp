import React from 'react';
import Home from "../views/Home";
import Profile from "../views/Profile";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'native-base';
import Single from "../views/Singel";
import AuthLoading from '../views/AuthLoading.js';
import Login from '../views/Login';
import Upload from '../views/Upload'
import MyFiles from '../views/MyFiles.js';
import Modify from "../views/Modify";
import Launch from "../views/Launch";
import Info from "../views/Info";
import Favourites from "../views/Favourites";
import Search from "../views/Search";
import Update from "../views/Update";

const TabNavigator = createBottomTabNavigator(
    {
        Home,
        Favourites,
        Search,
        Profile,
    },

    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: () => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = 'home';
                } else if (routeName === 'Profile') {
                    iconName = 'person';

                }else if(routeName === 'Favourites'){
                    iconName = 'heart';
                }else {
                    iconName = 'search';
                }
                // You can return any component that you like here!
                return <Icon
                    name={iconName}
                    size={25}
                />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#000',
        },
    },
);

TabNavigator.navigationOptions = ({navigation}) => {
    const {routeName} = navigation.state.routes[navigation.state.index];
    let header = true;
    if(routeName === 'Profile' || routeName === 'Search'){
        header = false;
    }
    // You can do whatever you like here to pick the title based on the route name
    return {
        headerTitle: routeName,
        headerShown: header,
    };
};


const AppStack = createStackNavigator(
    {
        Home: {
            screen: TabNavigator,
            navigationOptions: {
                headerMode: 'none',
                headerLeft: ()=>{},
            },
        },
        Single: {
            screen: Single,
        },
        Logout: {
            screen: Login,
        },
        MyFiles: {
            screen: MyFiles,
        },
        Info: {
            screen: Info,
        },
        Modify: {
            screen: Modify,
        },
        Upload:{
            screen: Upload,
        },
        Update:{
            screen:Update,
        },
        Profile:{
            screen: Profile,
            navigationOptions:{
                headerLeft: ()=>{},
                headerShown: false,
            },
        },
    },
);

const AuthStack = createStackNavigator(
    {
        Launch: {
            screen: Launch,
            navigationOptions: {
                headerShown: false,
            },
        },
        Mussy: {
            screen: Login,
        },
    },
);

const Navigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    },
);

const AppContainer = createAppContainer(Navigator);

export default AppContainer;