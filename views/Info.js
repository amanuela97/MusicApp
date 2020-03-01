import React from 'react';
import {AsyncStorage} from 'react-native';
import {Text, CardItem, Card, Content, Container, Body, Button} from 'native-base';




const Info = (props) => {

    const user = props.userInfo;

    const signOutAsync = async () => {
        await AsyncStorage.clear();
        props.navigation.navigate('Auth');
    };

    return (
        <Container>
          <Content>
            <Card>
                <CardItem>
                    <Body>
                        <Text>FullName: {user.userData.full_name}</Text>
                        <Text>email: {user.userData.email}</Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Button
                        style={{width: '100%'}}
                        title="Logout!"
                        onPress={signOutAsync}>
                        <Body>
                            <Text style={{color: 'white'}}>Logout</Text>
                        </Body>
                    </Button>
                </CardItem>
            </Card>
          </Content>
        </Container>
    );
};


export default Info;