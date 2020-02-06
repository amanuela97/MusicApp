import List from "../components/List";
import React from "react";
import {Container, View} from "native-base";
import PropTypes from 'prop-types';

const Home = (props) => {
    const {navigation} = props;
    return (
        <Container>
            <View>
                <List navigation={navigation}/>
            </View>
        </Container>
    );
};

Home.propTypes = {
    navigation: PropTypes.object,
};

export default Home