import React from 'react';
import {Text,CardItem, Card, Content, Container, Body, Icon, Left} from 'native-base';
import {AsyncImage} from '../components/AsynImage.js';

const mediaURL= "http://media.mw.metropolia.fi/wbma/uploads/";

const Single = (props) => {
    const { navigation } = props;
    return (
        <Container>
            <Content>
                <Card>
                    <CardItem>
                        <AsyncImage
                            style={{height: 320, width: 320}}
                            source={{
                                uri: mediaURL + navigation.getParam('file', 'default value')
                            }}
                            placeholderColor='white'
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