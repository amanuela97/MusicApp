import React,{useContext} from "react";
import {
    Container, Icon, Text, View,
} from "native-base";
import List from "../components/List";
import {MediaContext} from "../contexts/MediaContext";


const Favourites = (props) => {
    const {fav} = useContext(MediaContext);
    const {navigation} = props;
    return (
        <Container>
            {fav[0] === undefined &&
            <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
                <Icon style={{fontSize: 100}} name='heart'/>
                <Text>Add Favourites</Text>
            </View>}
            <List navigation={navigation} mode='fav'/>
        </Container>
    );
};


export default Favourites;