# react-native-tag-autocomplete
Tag autocomplete component for contacts, groups, etc.

![Example](https://raw.githubusercontent.com/JoeRoddy/react-native-tag-autocomplete/master/tag.gif)

### Up and Running

```shell
$ npm install --save react-native-tag-autocomplete
```

### Example

```javascript
//...
import AutoTags from 'react-native-tag-autocomplete';
// ...
state = {
    suggestions : [ {name:'Mickey Mouse'}, ],
    tagsSelected : []
}

handleDelete = index => {
   let tagsSelected = this.state.tagsSelected;
   tagsSelected.splice(index, 1);
   this.setState({ tagsSelected });
}

handleAddition = suggestion => {
   this.setState({ tagsSelected: this.state.tagsSelected.concat([suggestion]) });
}

render() {
  return (          
      <AutoTags
            suggestions={this.state.suggestions}
            tagsSelected={this.state.tagsSelected}
            handleAddition={this.handleAddition}
            handleDelete={this.handleDelete} 
            placeholder="Add a contact.." />              
    );
}
// ...
```

### Android
This repository wraps [react-native-autocomplete-input](https://github.com/l-urence/react-native-autocomplete-input), so their limitations will also apply here. 

As such:

"Android does not support overflows ([#20](https://github.com/l-urence/react-native-autocomplete-input/issues/20)), for that reason it is necessary to wrap the autocomplete into a *absolute* positioned view on Android. This will  allow the suggestion list to overlap other views inside your component."

```javascript
//...

render() {
  return(
    <View>
      <View style={styles.autocompleteContainer}>
        <AutoTags {/* your props */} />
      </View>
      <View>
        <Text>Some content</Text>
      <View />
    <View>
  );
}

//...

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});

```

### Props
| Prop | Type | Required | Description |
| :------------ |:---------------:|:------:| :-----|
| suggestions | array |yes| Array of suggestion objects. They must have a 'name' prop if not overriding filter && renderTags |
| tagsSelected | array |yes| List of tags that have already been selected
| handleAddition | function|yes | Handler for when suggestion is selected (normally just push to tagsSelected) |
| handleDelete | function |yes| Handler called with index when tag is clicked |
| placeholder | string |no| Input placeholder  |
| renderTags | function |no| Override the render tags and it's styles|
| renderSuggestion | function |no| Override the suggestions dropdown items |
| filterData | function |no| Override the search function, allows you to filter by props other than name  | 
| tagStyles | object | no | Override the default tag styling | 
| tagsOrientedBelow | boolean | no | Move tags below the input instead of above (default). | 

## Pull Requests
I'm a dummy, so any PR's are wholly appreciated <3.