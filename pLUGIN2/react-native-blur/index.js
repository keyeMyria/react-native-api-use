import React, { Component } from 'react';
import { View, Image, Text, findNodeHandle, StyleSheet,  } from 'react-native';
import { BlurView, VibrancyView,   } from 'react-native-blur';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { viewRef: null };
  }

  imageLoaded() {
    console.log('imageLoaded ：', )
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          ref={(img) => { this.backgroundImage = img; }}
          source={{uri}}
          style={styles.absolute}
          onLoadEnd={this.imageLoaded.bind(this)}
        />
        <BlurView
          style={styles.absolute}
          viewRef={this.state.viewRef}
          blurType="light"
          blurAmount={10}
        />
        <Text>Hi, I am some unblurred text</Text>


        <Image source={{uri}} style={styles.absolute}>
          <VibrancyView blurType="light" style={styles.flex}>
            <Text>Hi, I am some vibrant text.</Text>
          </VibrancyView>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  },
});