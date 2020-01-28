import React from 'react';
import {Text,CardItem, Card, Content, Container, Body, Icon, Left, Right} from 'native-base';
import {Image} from 'react-native';

const mediaURL= "http://media.mw.metropolia.fi/wbma/uploads/";

const Single = (props) => {
    const { navigation } = props;
    return (
        <Container>
            <Content>
                <Card style={{flex: 0}}>
                    <CardItem>
                        <Image square source={{uri: mediaURL + navigation.getParam('file', 'default value') }}
                                   style={{height: 320, width: 320, flex: 1}}
                        />
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Icon name='image' />
                            <Body>
                                <Text>{navigation.getParam('title', 'default value')}</Text>
                                <Text>
                                    {navigation.getParam('description', 'default value')}
                                </Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
};


export default Single;