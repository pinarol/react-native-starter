import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

export class InnerView extends React.Component {

  constructor( props ) {
    super(props);
    this.onLayout = this.onLayout.bind( this );
    this.onPress = this.onPress.bind( this );

    this.state = {
			frameWidth: 0,
      frameheight: 0,
      hasFocus:false,
		};

  }

  onLayout( { nativeEvent } ) {
    const { width, height } = nativeEvent.layout;
    this.setState( { frameWidth: width, frameheight: height } );
  }

  onPress( ) {
    const { hasFocus } = this.state;

    this.setState( { hasFocus: !hasFocus } );
  } 

  render() {
    const { frameWidth, frameheight, hasFocus } = this.state;

    const width = frameWidth + 18;
    const height = frameheight + 6;

    return (
      <View style={styles.containerFrameAndContent
      }>
        {hasFocus && <View style={ [styles.frame, { width, height }]}> 
        </View>}
        <TouchableOpacity style={styles.content} onPress={ this.onPress } onLayout={ this.onLayout }> 
            <View style={styles.realContent}>
            </View>
        </TouchableOpacity>
      </View>
    );

  }

}

export default class Home extends React.Component {
  //stacking verticially(Group block):
  //only top most blocks should have horizontal margins from the edge
  //only leaf views should have vertical margins(or paddings not sure yet)

  //stacking horizontaly(Buttons block):
  //only top most blocks should have vertical margins from the edge
  //only leaf views should have horizontal margins(or paddings not sure yet)

  //general rule:
  //Frame views are positioned absolutely behind the block content
  //Frame views are only for being able to display the borders

   render() {

      return (
        <View style={styles.container1}>
    
              <View style={styles.content}>
                 <InnerView />
                 <InnerView />
                 <InnerView />
              </View>
              <InnerView />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth:0,
    borderColor: 'blue',
    margin: 16, //only top most block will have this margin
    padding: 0,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth:0,
    borderColor: 'black',
    margin: 0,
    marginVertical:0,
    padding: 0,
    opacity:0.8,
  },
  realContent: {
    flex: 1,
    backgroundColor: 'cyan',
    opacity:0.2,
    marginVertical:8,
  },
  containerFrameAndContent: {
    flex: 1,
    alignContent: 'center',
    padding:0,
  },
  frame:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: -3,
    borderWidth:1,
    borderColor: 'magenta',
    backgroundColor: 'transparent',
    top:0,
    opacity:0.5,
  },
});
