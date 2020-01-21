import Home from "../views/Home";
import Profile from "../views/Profile";
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Single from "../views/Singel";

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
    },
    {
        initialRouteName: 'Home',
    }
);

const Navigator = createStackNavigator(
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

export default createAppContainer(Navigator);

