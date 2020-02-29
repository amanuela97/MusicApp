import React from 'react';
import {Container,Tabs,Tab,TabHeading, Header, Text} from "native-base";
import MyFiles from '../views/MyFiles.js';
import Info from '../views/Info.js';

const Profile = (props) => {


    return (
        <Container>
            <Header hasTabs/>
                <Tabs>
                    <Tab heading={ <TabHeading><Text>Sounds</Text></TabHeading>}>
                        <MyFiles navigation={props.navigation}/>
                    </Tab>
                    <Tab heading={ <TabHeading><Text>Info</Text></TabHeading>}>
                        <Info navigation={props.navigation}/>
                    </Tab>
                </Tabs>
        </Container>
    );
};


export default Profile;