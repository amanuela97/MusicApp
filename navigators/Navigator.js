import Home from "../views/Home";
import Profile from "../views/Profile";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Single from "../views/Singel";
import AuthLoading from '../views/AuthLoading.js';
import Login from '../views/Login';

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                title: 'Home',
            },
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: 'Profile',
            },
        },
        Login: {
            screen: Login,
        },
    },
    {
        initialRouteName: 'Home',
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

