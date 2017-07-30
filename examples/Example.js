import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import AutoTags from 'react-native-tag-autocomplete';

export default class Example extends React.Component {
  state = {
    tagsSelected: [],
    suggestions: [{ name: "mrjoeroddy@gmail.com" }, { name: "janedoe@aol.com" },
    { name: "john@doe.gov" }, { name: "hungrybox@teamliquid.com" }]
    //If you don't provide renderTags && filterData props,
    //suggestions must have a 'name' attribute to be displayed && searched for.
  }

  handleDelete = index => {
    //tag deleted, remove from our tags array
    let tagsSelected = this.state.tagsSelected;
    tagsSelected.splice(index, 1);
    this.setState({ tagsSelected });
  }

  handleAddition = contact => {
    //suggestion clicked, push it to our tags array
    this.setState({ tagsSelected: this.state.tagsSelected.concat([contact]) });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ color: 'white', fontSize: 30 }}>
            New Message
          </Text>
        </View>
        <View style={styles.autocompleteContainer}>
          <Text style={styles.label}>
            Recipients
          </Text>
          <AutoTags
            suggestions={this.state.suggestions}
            tagsSelected={this.state.tagsSelected}
            placeholder="Add a contact.."
            handleAddition={this.handleAddition}
            handleDelete={this.handleDelete}
          />
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.label}>Message</Text>
          <TextInput style={styles.message}
            underlineColorAndroid='rgba(0,0,0,0)' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#9d30a5',
    height: 80,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    marginBottom: 10,
  },
  autocompleteContainer: {
    flex: 1,
    left: 20,
    position: 'absolute',
    right: 20,
    top: 100,
    zIndex: 1
  },
  label: {
    color: "#614b63", fontWeight: 'bold', marginBottom: 10
  },
  messageContainer: {
    marginTop: 160,
    height: 200,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20
  },
  message: {
    backgroundColor: '#efeaea',
    height: 200,
    textAlignVertical: 'top',
  }
});
