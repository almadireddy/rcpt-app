import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Icon } from 'react-native';
import Layout from "./components/Layout";
import { FAB } from 'react-native-paper';
import { Camera, Permissions, FileSystem } from 'expo';

export default class CameraPost extends React.Component {
  constructor(props){
    super(props);
    this.handlePhoto = this.handlePhoto.bind(this)
    this.takePicture = this.takePicture.bind(this)
  }

  static defaultProps = {
    cameraType: Camera.Constants.Type.rear, //front vs rear facing camera
  }

  state = {
    hasCameraPermission: null,
    pictureTaken: false, //true when photo has been taken
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  static navigationOptions = {
    title: 'Scan Receipt',
  };

  handlePhoto() {
    console.log('gonna take a photo')
    this.takePicture()
  }

  takePicture() {
    this.setState({
      pictureTaken: true,
    });
    if (this.camera) {
      this.camera.takePictureAsync({
        onPictureSaved: this.onPictureSaved,
      });
    }
  }

  onPictureSaved = async (e) => {
    const filename = new Date().getTime() + '.jpg';
    const image = FileSystem.documentDirectory + filename;

    let x = await FileSystem.copyAsync({
      from: e.uri,
      to: image
    });

    let photo = {
      uri: image,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    let body = new FormData();
    body.append('image', photo)

    let hmmm = await fetch('https://utdcometmarketing.com/api/receipts', {
      method: 'POST',
      body: body,
      headers: {
        "Content-Type": "multipart/form-data; boundary=----freddy"
      }
    })

    let fred = hmmm.text()

    console.log(fred)
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Camera
            style={{ flex: 1 }}
            type={this.props.cameraType}
            ref={ref => {
              this.camera = ref;
            }}>
            <FAB
              style={styles.fab}
              icon="camera"
              onPress={this.handlePhoto}
            />
            {/* <Button style={styles.photoButton} title='yuh' onPress={this.handlePhoto}></Button> */}
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textStandard: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white'
  },
  countdown: {
    fontSize: 40,
    color: 'white'
  },
  photoButton: {
    backgroundColor: "#DDDBF1",
    padding: 20,
    fontSize: 20
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: "50%",
    bottom: 0,
  },
});