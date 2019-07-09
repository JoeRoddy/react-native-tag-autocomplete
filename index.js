import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";

export default class AutoTags extends Component {
  state = {
    query: ""
  };

  renderTags = () => {
    if (this.props.renderTags) {
      return this.props.renderTags(this.props.tagsSelected);
    }

    const tagMargins = this.props.tagsOrientedBelow
      ? { marginBottom: 5 }
      : { marginTop: 5 };

    return (
      <View style={this.props.tagStyles || styles.tags}>
        {this.props.tagsSelected.map((t, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[tagMargins, styles.tag]}
              onPress={() => this.props.handleDelete(i)}
            >
              <Text>{t.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  handleInput = text => {
    if (this.submitting) return;
    if (this.props.allowBackspace) {
      //TODO: on ios, delete last tag on backspace event && empty query
      //(impossible on android atm, no listeners for empty backspace)
    }
    if (this.props.onChangeText) return this.props.onChangeText(text);
    if (
      this.props.createTagOnSpace &&
      this.props.onCustomTagCreated &&
      text.length > 1 &&
      text.charAt(text.length - 1) === " "
    ) {
      this.setState({ query: "" });
      return this.props.onCustomTagCreated(text.trim());
    } else if (this.props.createTagOnSpace && !this.props.onCustomTagCreated) {
      console.error(
        "When enabling createTagOnSpace, you must provide an onCustomTagCreated function"
      );
    }

    if (text.charAt(text.length - 1) === "\n") {
      return; // prevent onSubmit bugs
    }

    this.setState({ query: text });
  };

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
    });
    return results;
  };

  onSubmitEditing = () => {
    const { query } = this.state;
    if (!this.props.onCustomTagCreated || query.trim() === "") return;
    this.setState({ query: "" }, () => this.props.onCustomTagCreated(query));

    // prevents an issue where handleInput() will overwrite
    // the query clear in some circumstances
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
    }, 30);
  };

  addTag = tag => {
    this.props.handleAddition(tag);
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
    const data = this.filterData(query);

    return (
      <View style={styles.AutoTags}>
        {!this.props.tagsOrientedBelow &&
          this.props.tagsSelected &&
          this.renderTags()}
        <Autocomplete
          data={data}
          controlled={true}
          placeholder={this.props.placeholder}
          defaultValue={query}
          value={query}
          onChangeText={text => this.handleInput(text)}
          onSubmitEditing={this.onSubmitEditing}
          multiline={true}
          listStyle={styles.listStyle}
          autoFocus={this.props.autoFocus === false ? false : true}
          renderItem={suggestion => (
            <TouchableOpacity onPress={e => this.addTag(suggestion)} style={styles.itemContainer}>
              {this.props.renderSuggestion ? (
                this.props.renderSuggestion(suggestion)
              ) : (
                <Text>{suggestion.name}</Text>
              )}
            </TouchableOpacity>
          )}
          inputContainerStyle={
            this.props.inputContainerStyle || styles.inputContainerStyle
          }
          containerStyle={this.props.containerStyle || styles.containerStyle}
          underlineColorAndroid="transparent"
          style={{ backgroundColor: "#efeaea" }}
          listContainerStyle={{
            backgroundColor: this.props.tagsOrientedBelow
              ? "#EEEFF0"
              : "transparent"
          }}
          {...this.props}
        />
        {this.props.tagsOrientedBelow &&
          this.props.tagsSelected &&
          this.renderTags()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AutoTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: 'center',
    backgroundColor: "#EEEFF0",
    width: '100%'
  },
  tag: {
    backgroundColor: "rgb(244, 244, 244)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 30,
    padding: 8
  },
  inputContainerStyle: {
    borderRadius: 0,
    paddingLeft: 5,
    height: 40,
    width: '100%',
    justifyContent: "center",
    borderColor: "transparent",
    alignItems: "stretch",
    backgroundColor: "#EEEFF0"
  },
  containerStyle: {
    minWidth: 200,
    width: '100%'
  },
  listStyle: {
    flex: 1,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    backgroundColor: "#fff"
  },
  itemContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
    padding: 8,
    position: 'relative',
    backgroundColor: "#ffff",
  },
});
