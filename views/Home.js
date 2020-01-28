import List from "../components/List";
import React from "react";
import {Content, Container, Header} from "native-base";

const Home = (props) => {
    const {navigation} = props;
    return (
        <Container>
            <Content>
                <List navigation={navigation}/>
            </Content>
        </Container>
    );
};

export default Home