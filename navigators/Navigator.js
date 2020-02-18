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

const TabNavigator = createBottomTabNavigator(
    {
        Home,
        Upload,
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
                } else if (routeName === 'Upload') {
                    iconName = 'cloud-upload';
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

    // You can do whatever you like here to pick the title based on the route name
    return {
        headerTitle: routeName,
    };
};


const StackNavigator = createStackNavigator(
    {
        Home: {
            screen: TabNavigator,
            navigationOptions: {
                headerMode: 'none',
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
        Modify: {
          screen: Modify,
        },
    },
);

const Navigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: StackNavigator,
        Auth: Login,
    },
    {
        initialRouteName: 'AuthLoading',
    },
);

const AppContainer = createAppContainer(Navigator);

export default AppContainer;