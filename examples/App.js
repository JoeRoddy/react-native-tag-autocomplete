import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Example from './Example';
import CustomExample from './CustomExample';

export default class App extends React.Component {
  render() {
    return (
      <Example />
      // <CustomExample/>
    );
  }
}

