import React,{useContext} from "react";
import {Container, Header, Item, Input, Icon, Text, View} from 'native-base';
import List from "../components/List";
import SearchHooks from '../hooks/SearchHooks';
import {MediaContext} from "../contexts/MediaContext";


const Search = (props) => {
    const {navigation} = props;
    const {input,handleSearchChange, handleSearch} =  SearchHooks();
    const {searchMedia} = useContext(MediaContext);

    return (
        <Container style={{paddingTop: '6%'}}>
            <Header searchBar rounded style={{backgroundColor: 'black'}}>
                <Item>
                    <Icon name="ios-search" />
                    <Input
                        autoCapitalize='none'
                        value={input}
                        placeholder="Search"
                        onChangeText={handleSearchChange}
                        onSubmitEditing={( async () => {
                            await handleSearch();
                        })}
                        multiline={false}
                    />
                    <Icon name="musical-note" />
                </Item>
            </Header>
            <Container>
                {input === '' && searchMedia[0] === undefined &&
                <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
                    <Icon style={{fontSize: 100}} name='search'/>
                    <Text>Search Mussy</Text>
                </View>}
                <List navigation={navigation} mode='search' />
            </Container>
        </Container>
    );
};

export default Search;