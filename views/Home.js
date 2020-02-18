import List from "../components/List";
import React from "react";
import PropTypes from 'prop-types';
import { Container} from 'native-base';

const Home = (props) => {

    const {navigation} = props;
    return (

        <Container>
            <List navigation={navigation} mode='all'/>
        </Container>

    );
};

Home.propTypes = {
    style: PropTypes.object,
};

export default Home;