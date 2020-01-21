import {View} from "react-native";
import List from "../components/List";
import React from "react";

const Home = (props) => {
    const {navigation} = props;
    return (
        <View style={{marginTop: 19}}>
            <List navigation={navigation}/>
        </View>
    );
};

export default Home
