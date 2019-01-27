import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Layout from "./components/Layout";

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

  static navigationOptions = {
    title: 'Track your Spending',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Layout title="Spending Tracker" subtitle='Track your periodic spending by categories using our time spending microservice'></Layout>
    )
  }
}
