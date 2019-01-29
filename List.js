import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import Layout from "./components/Layout";
import { FAB } from 'react-native-paper';
import Modal from 'react-native-modal';

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true, 
      bigImage: null, 
      visible: false 
    };
    this.handleAdd = this.handleAdd.bind(this)
    this.handlePress = this.handlePress.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  async handleAdd() {
    this.props.navigation.navigate('NewReceipt', { name: 'Add Receipt' })
  }

  handlePress(img) {
    let imgSrc = `https://utdcometmarketing.com/api/${img}`
    this.setState({ bigImage: imgSrc, visible: true }) 
  }

  hideModal() {
    this.setState({visible: false})
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
      <>
        <Modal isVisible={this.state.visible}>
          <TouchableOpacity onPress={this.hideModal} style={styles.modal}>
            <Image source={{uri: this.state.bigImage}} style={styles.bigImage}/>
          </TouchableOpacity>
        </Modal>
        <Layout title="RCPT" subtitle="Track your receipts using Image Processing and awesome microservices">
          <View style={styles.buttonWrapper}>
            <Button
              raised
              title="Money Tracker"
              style={styles.trackerButton}
              onPress={() => navigate('Stats', { name: 'Stats' })}
            />
          </View> 

          <View style={styles.listWrapper}>
            {this.state.data && this.state.data.map(element => {
              return ( 
                <TouchableOpacity onPress={() => this.handlePress(element.image)} key={element._id} style={styles.listItem}>
                  <View style={styles.listItemHeader}>
                    <Text style={styles.business}>{element.business}</Text>
                    {!!element.date && (
                      <Text style={styles.date}>{element.date.substring(5, 10) + '-' + element.date.substring(0, 4)}</Text>
                    )}
                  </View>
                  <View style={styles.listItemContent}>
                    <Text style={styles.price}>${parseFloat(Math.round(element.totalCost * 100) / 100).toFixed(2)}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        </Layout>
        <View style={styles.footer}>
          <FAB
            style={styles.fab}
            icon="add"
            onPress={this.handleAdd}
          />
        </View>
      </>
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
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  bigImage: {
    width: 200,
    height: 500
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  trackerButton: {
    backgroundColor: '#383F51',
    padding: 10
  }
});