import React from "react"
import {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'


class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  _onClick = () => {
    console.log('_onClick ：', )
    this.props.onClick(this.props.data);
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._onClick} >
          <View style={styles.row}>
            <Text style={styles.text}>
              {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
class RefreshControlExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(20)).map(
        (val, i) => ({text: 'Initial row ' + i, clicks: 0})),
    }
  }
  myClaimBar = (row) => {
    console.log('myClaimBar ：', row)
    row.clicks++;
    this.setState({
      rowData: this.state.rowData,
    });
  }
  _onRefresh = () => {
    console.log('_onRefresh ：', )
    this.setState({isRefreshing: true});
    setTimeout(() => {
      // prepend 10 items
      const rowData = Array.from(new Array(10))
      .map((val, i) => ({
        text: 'Loaded row ' + (+this.state.loaded + i),
        clicks: 0,
      }))
      .concat(this.state.rowData);

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 5000);
  }
  
  render() {
    const rows = this.state.rowData.map((row, ii) => {
      return <Row key={ii} data={row} onClick={this._onClick}/>;
    });
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollview}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              tintColor="#ff0000"
              title="Loading..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffff00"
            />
          }>
          {rows}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  row: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    backgroundColor: '#3a5795',
    margin: 5,
  },
  text: {
    alignSelf: 'center',
    color: '#fff',
  },
  scrollview: {
    flex: 1,
  },
});

export default RefreshControls;