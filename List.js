import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Layout from "./components/Layout";

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    return fetch('https://utdcometmarketing.com/api/receipts')
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
    title: 'RCPT',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Layout title="RCPT" subtitle="Track your receipts using Image Processing and awesome microservices">
        <View style={styles.buttonWrapper}>
          <Button
            title="Track Spending"
            onPress={() => navigate('Stats', { name: 'Stats' })}
          />
        </View>

        <View style={styles.listWrapper}>
          {this.state.data && this.state.data.map(element => {
            return (
              <View key={element._id} style={styles.listItem}>
                <View style={styles.listItemHeader}>
                  <Text style={styles.business}>{element.business}</Text>
                  {!!element.date && (
                    <Text style={styles.date}>{element.date.substring(5, 10) + '-' + element.date.substring(0, 4)}</Text>
                  )}
                </View>
                <View style={styles.listItemContent}>
                  <Text style={styles.price}>${parseFloat(Math.round(element.totalCost * 100) / 100).toFixed(2)}</Text>
                </View>
              </View>
            )
          })}
        </View>
      </Layout>
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
  listWrapper: {
    marginTop: 50
  }
});
