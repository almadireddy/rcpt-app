import * as React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';

export default class Layout extends React.Component {
  render() {
    return(
      <ScrollView style={styles.wrapper}>
        <Text style={styles.title}>{this.props.title}</Text>
        {!!this.props.subtitle && (
          <Text style={styles.subtitle}>{this.props.subtitle}</Text>
        )}
        {this.props.children}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 35,
    paddingTop: 100
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    color: "#383F51"
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: 15,
    marginBottom: 35,
    color: "#383F51"
  }
});
