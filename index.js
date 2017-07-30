import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

export default class AutoTags extends Component {
    state = {
        query: ""
    }

    renderTags = () => {
        if (this.props.renderTags) {
            return this.props.renderTags(this.props.tagsSelected);
        }

        return (
            <View style={styles.tags}>
                {this.props.tagsSelected.map((t, i) => {
                    return (
                        <TouchableHighlight key={i} style={styles.tag}
                            onPress={() => this.props.handleDelete(i)}>
                            <Text>{t.name}</Text>
                        </TouchableHighlight>
                    )
                })}
            </View>
        );

    }

    handleInput = (text) => {
        if (this.props.allowBackspace) {
            //TODO: on ios, delete last tag on backspace event && empty query
            //(impossible on android atm, no listeners for empty backspace)
        }

        this.props.onChangeText ?
            this.props.onChangeText(text)
            : this.setState({ query: text });
    }

    filterData = query => {
        if (!query || query.trim() == "" || !this.props.suggestions) {
            return;
        }
        if (this.props.filterData) {
            return this.props.filterData(query);
        }
        let suggestions = this.props.suggestions;
        let results = [];
        query = query.toUpperCase();
        suggestions.forEach(i => {
            if (i.name.toUpperCase().includes(query)) {
                results.push(i);
            }
        })
        return results;
    }

    addTag = tag => {
        this.props.handleAddition(tag);
        this.setState({ query: "" });
    }

    render() {
        const { query } = this.state;
        const data = this.filterData(query);

        return (
            <View style={styles.AutoTags}>
                {this.props.tagsSelected &&
                    this.renderTags()}
                <Autocomplete
                    data={data}
                    placeholder={this.props.placeholder}
                    defaultValue={query}
                    onChangeText={text => this.handleInput(text)}
                    multiline={true}
                    autoFocus={this.props.autoFocus === false ?
                        false : true}
                    renderItem={suggestion => (
                        <TouchableOpacity onPress={e => this.addTag(suggestion)}>
                            {this.props.renderSuggestion ? this.props.renderSuggestion(suggestion)
                                : <Text>{suggestion.name}</Text>}
                        </TouchableOpacity>
                    )}
                    inputContainerStyle={this.props.inputContainerStyle ||
                        styles.inputContainerStyle}
                    containerStyle={this.props.containerStyle ||
                        styles.containerStyle}
                    underlineColorAndroid='transparent'
                    style={{ backgroundColor: '#efeaea' }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    AutoTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        backgroundColor: '#efeaea',
        width: 300,
    },
    tag: {
        backgroundColor: 'rgb(244, 244, 244)',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        marginLeft: 5,
        marginTop: 5,
        borderRadius: 30,
        padding: 8
    },
    inputContainerStyle: {
        borderRadius: 0,
        paddingLeft: 5,
        height: 40,
        justifyContent: 'center',
        borderColor: 'transparent',
        alignItems: 'stretch',
        backgroundColor: '#efeaea'
    },
    containerStyle: {
        minWidth: 200,
        maxWidth: 300,
    }
})