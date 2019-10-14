import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

const LOADING = ['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.'];

export default class Loader extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = [];
    LOADING.forEach((value, index) => {
      this.animatedValue[index] = new Animated.Value(0);
    });
  }

  componentDidMount() {
    this._animate();
  }

  _animate = () => {
    const anim1 = LOADING.map((item, index) => {
      return Animated.timing(this.animatedValue[index], {
        toValue: 1,
        duration: 25
      });
    });
    const anim2 = LOADING.map((item, index) => {
      return Animated.timing(this.animatedValue[index], {
        toValue: 0,
        duration: 25
      });
    });
    const animations = [...anim1, ...anim2];

    Animated.loop(Animated.sequence(animations), { iterations: 2 }).start();
  };

  render() {
    const animations = LOADING.map((value, i) => {
      return (
        <Animated.Text
          key={i}
          style={{
            opacity: this.animatedValue[i],
            fontSize: 14,
            textAlign: 'center',
            marginTop: 10
          }}
        >
          {value}
        </Animated.Text>
      );
    });

    return <View style={styles.container}>{animations}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
