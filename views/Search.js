import React from "react";
import {Container,Header, Item, Input, Icon} from 'native-base';
import List from "../components/List";
import SearchHooks from '../hooks/SearchHooks';


const Search = (props) => {
    const {navigation} = props;
    const {input,handleSearchChange, handleSearch} =  SearchHooks();

    return (
        <Container style={{paddingTop: '6%'}}>
            <Header searchBar rounded>
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
                <List navigation={navigation} mode='search' />
            </Container>
        </Container>
    );
};

export default Search;