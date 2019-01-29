import * as React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

export default class Layout extends React.Component {
  render() {
    return(
      <ScrollView style={styles.wrapper}>
        <Text style={styles.title}>{this.props.title}</Text>
        {!!this.props.subtitle && (
          <Text style={styles.subtitle}>{this.props.subtitle}</Text>
        )}
        <View style={styles.childrens}>
          {this.props.children}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 35,
    paddingBottom: 0
  },
  title: {
    fontSize: 65,
    fontWeight: '700',
    color: "#383F51",
    paddingTop: 50
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: 15,
    marginBottom: 35,
    color: "#383F51"
  },
  childrens: {
    marginBottom: 50
  }
});
