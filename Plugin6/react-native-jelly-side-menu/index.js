import React, { PureComponent, Component } from "react"
import {
  Slider,
  Text,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'

import JellySideMenu from 'react-native-jelly-side-menu'

export default class JellySideMenuPage extends Component {
  constructor(props) {
    super(props);
    this.itemStyle = {padding: 16, backgroundColor: 'transparent'};
    this.itemTextStyle = {color: '#000000', fontWeight: 'bold', fontSize: 20};
    this.renderMenu = this.renderMenu.bind(this);
  }

  renderItem(text, onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={this.itemStyle}>
          <Text style={this.itemTextStyle}>{text}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderMenu() {
    return (
      <View>
        {this.renderItem("Jelly Side Menu by Vanport", () => {})}
        {this.renderItem("Toggle Side Menu", () => {this.jsm.toggleSideMenu();})}
        {this.renderItem("Close Side Menu", () => {this.jsm.toggleSideMenu(false);})}
      </View>
    )
  }

  render() {
    console.log('JellySideMenuPage 组件 this.state, this.props ：', this.state, this.props, )
    return (
      <View style={{flex: 1, backgroundColor: '#FF6644'}}>
        <JellySideMenu 
        ref={(view) => {this.jsm = view}}
        fill={"#FFF"} fillOpacity={1.0}
        renderMenu={this.renderMenu}>

          <TouchableOpacity onPress={() => {this.jsm.toggleSideMenu(true)}}>
            <View style={[this.itemStyle, {backgroundColor: '#FF7788'}]}>
              <Text style={this.itemTextStyle}>Open Jelly Menu</Text>
            </View>
          </TouchableOpacity>

        </JellySideMenu>
      </View>
    )
  }
}