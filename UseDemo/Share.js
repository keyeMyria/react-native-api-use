import React from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Share,
} from 'react-native'

class ShareMessageExample extends React.Component {
  constructor(props) {
    super(props);
    this._shareMessage = this._shareMessage.bind(this);
    this._shareText = this._shareText.bind(this);
    this._showResult = this._showResult.bind(this);
    this.state = {
      result: ''
    };
  }
  _shareMessage = () => {
    console.log('_shareMessage ：', )
    Share.share({
      message: 'React Native | A framework for building native apps using React'
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }

  _shareText = () => {
    console.log('_shareText ：', )
    Share.share({
      message: 'A framework for building native apps using React',
      url: 'http://facebook.github.io/react-native/',
      title: 'React Native'
    }, {
      dialogTitle: 'Share React Native website',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
      tintColor: 'green'
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }

  _showResult(result) {
    console.log('_showResult ：', result, this.state)
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({result: 'shared with an activityType: ' + result.activityType});
      } else {
        this.setState({result: 'shared'});
      }
    } else if (result.action === Share.dismissedAction) {
      this.setState({result: 'dismissed'});
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.wrapper}
          onPress={this._shareMessage}>
          <View style={styles.button}>
            <Text>Click to share message</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={this._shareText}>
          <View style={styles.button}>
            <Text>Click to share message, URL and title</Text>
          </View>
        </TouchableHighlight>
        <Text>{this.state.result}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
});
export default Shares;