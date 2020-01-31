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

const TabNavigator = createBottomTabNavigator(
    {
        Home,
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
                }

                // You can return any component that you like here!
                return <Icon
                    name={iconName}
                    size={25}
                />;
            },
        }),
    }
);

const AppStack = createStackNavigator(
    // RouteConfigs
    {
        Home: {
            screen: TabNavigator,
            navigationOptions: {
                headerMode: 'none', // this will hide the header
            },
        },
        Single: {
            screen: Single,
        },
        Logout:{
            screen: Login,
        }
    },
);

const Navigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: AppStack,
        Auth: Login,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export default createAppContainer(Navigator);

