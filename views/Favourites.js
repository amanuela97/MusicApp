import React from "react";
import {
    Container,
} from "native-base";
import List from "../components/List";


const Favourites = (props) => {
    const {navigation} = props;
    return (
        <Container>
            <List navigation={navigation} mode='fav'/>
        </Container>
    );
};


export default Favourites;