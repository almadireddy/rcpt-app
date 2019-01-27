import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    return fetch('https://rcpt-visualizer.herokuapp.com/api/piechart')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          data: responseJson,
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <Text>Hello there</Text>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#DDDBF1",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 35,
    shadowOffset: { width: 0, height: 10, },
    shadowColor: '#383F51',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  listItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  listItemContent: {
    marginTop: 20
  },
  price: {
    fontSize: 35,
    color: "#383F51",
    fontWeight: "500",
    textAlign: "left"
  },
  business: {
    fontSize: 20,
    color: "#3C4F76",
    flex: 1
  },
  date: {
    fontSize: 16,
    color: '#383F51'
  },
  wrapper: {
    padding: 35,
    paddingTop: 100
  },
  title: {
    fontSize: 50,
    fontWeight: '700',
    color: "#383F51"
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: 15,
    color: "#383F51"
  },
  listWrapper: {
    marginTop: 50
  }
});
