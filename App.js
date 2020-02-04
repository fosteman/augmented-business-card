import React, { Component } from 'react';

import {
  ViroARSceneNavigator
} from 'react-viro';

import BusinessCard from './js/BusinessCard';

export default class ViroSample extends Component {

  render() {
    return (
      <ViroARSceneNavigator
        apiKey="1839C275-6929-45AF-B638-EF2DEE44C1D9"
        numberOfTrackedImages={2  }
        initialScene={{scene: BusinessCard}}
      />
    )
  }
}
