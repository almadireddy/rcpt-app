import * as React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Layout from "./components/Layout";
import PieChart from 'react-native-pie-chart';

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, data: [100] }
  }

  componentDidMount() {
    return fetch('https://rcpt-visualizer.herokuapp.com/api/piechart')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          data: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  static navigationOptions = {
    title: 'RCPT',
  };

  render() {
    const { navigate } = this.props.navigation;
    const chart_wh = 250
    let numbers = [];
    Object.values(this.state.data).forEach(e => {
      if (!(e === 0 || e === '<null>')) numbers.push(e)
    })
    const sliceColor = ['#383F51', '#DDDBF1', '#3C4F76', '#D1BEB0', '#FF9800']

    return (
      <Layout title="Spending Tracker" subtitle='Track your periodic spending by categories using our time spending microservice'>
        <View style={styles.statType}>
          <Text style={styles.subhead}>Spending by Category</Text>
          <View style={styles.pieContainer}>
            <PieChart
              chart_wh={chart_wh}
              series={numbers}
              sliceColor={sliceColor}
            />
          </View>
        </View>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  pieContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  subhead: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
  },
  statType: {
    marginBottom: 50
  }
});
