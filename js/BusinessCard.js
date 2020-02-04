'use strict'

import React, {Component} from 'react'

import {StyleSheet} from 'react-native'

import {
  ViroAnimatedImage,
  ViroAnimations,
  ViroARImageMarker,
  ViroARScene,
  ViroARTrackingTargets,
  ViroConstants,
  ViroFlexView,
  ViroImage,
  ViroMaterials,
  ViroNode,
  ViroText,
} from 'react-viro'

export default class BusinessCard extends Component {

  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false,
  }

  getNoTrackingUI() {
    const {isTracking, initialized} = this.state
    return (
      <ViroText text={
        initialized ? 'Initializing AR...'
          : 'No Tracking'
      }/>
    )
  }


  getARScene() {
    return (
      <ViroNode>
        <ViroARImageMarker target={'businessCard'}
                           onAnchorFound={() => this.setState({runAnimation: true})}
        >
          <ViroNode key="card">
            <ViroNode
              opacity={0} position={[0, -0.02, 0]}
              animation={{
                name: 'animateImage',
                run: this.state.runAnimation,
              }}
            >
              <ViroFlexView
                rotation={[-90, 0, 0]}
                height={0.03}
                width={0.05}
                style={styles.card}
              >
                <ViroFlexView
                  style={styles.cardWrapper}
                >
                  <ViroImage
                    height={0.015}
                    width={0.015}
                    style={styles.image}
                    source={require('./res/Maverick.png')}
                  />
                  <ViroText
                    textClipMode="None"
                    text="Bradley Heath"
                    scale={[.015, .015, .015]}
                    style={styles.textStyle}
                  />
                </ViroFlexView>
                <ViroFlexView
                  onTouch={() => alert('twitter')}
                  style={styles.subText}
                >
                  <ViroText
                    width={0.01}
                    height={0.01}
                    textAlign="left"
                    textClipMode="None"
                    text="@extouring"
                    scale={[.01, .01, .01]}
                    style={styles.textStyle}
                  />
                  <ViroAnimatedImage
                    height={0.01}
                    width={0.01}
                    loop={true}
                    source={require('./res/tweet.gif')}
                  />
                </ViroFlexView>
              </ViroFlexView>
            </ViroNode>
            <ViroNode opacity={0} position={[0, 0, 0]}
                      animation={{
                        name: 'animateWeb',
                        run: this.state.runAnimation,
                      }}
            >
              <ViroText text="extouring.travel"
                        rotation={[-90, 0, 0]}
                        scale={[.01, .01, .01]}
                        style={styles.textStyle}
              />
            </ViroNode>
          </ViroNode>
        </ViroARImageMarker>
      </ViroNode>
    )
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {this.state.isTracking ? this.getNoTrackingUI() : this.getARScene()}
      </ViroARScene>
    )
  }

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == ViroConstants.TRACKING_NONE) {
      isTracking: false
    }
  }
}

var styles = StyleSheet.create({
                                 textStyle: {
                                   flex: .5,
                                   fontFamily: 'Roboto',
                                   fontSize: 30,
                                   color: '#ffffff',
                                   textAlignVertical: 'top',
                                   textAlign: 'left',
                                   fontWeight: 'bold',
                                 },
                                 card: {
                                   flexDirection: 'column',
                                 },
                                 cardWrapper: {
                                   flexDirection: 'row',
                                   alignItems: 'flex-start',
                                   padding: 0.001,
                                   flex: .5,
                                 },
                                 subText: {
                                   flexDirection: 'column',
                                   alignItems: 'flex-start',
                                   justifyContent: 'flex-start',
                                   flex: .5,
                                 },
                               })

ViroARTrackingTargets.createTargets({
                                      'businessCard': {
                                        source: require('./res/extouring-target.JPG'),
                                        orientation: 'Up',
                                        physicalWidth: 0.05,
                                      },
                                    })

ViroMaterials.createMaterials({
                                imagePlaceholder: {
                                  diffuseColor: 'rgba(255,255,255,1)',
                                },
                                quad: {
                                  diffuseColor: 'rgba(0,0,0,0.5)',
                                },
                              })

ViroAnimations.registerAnimations({
                                    animateImage: {
                                      properties: {
                                        positionX: 0.05,
                                        opacity: 1.0,
                                      },
                                      easing: 'Bounce',
                                      duration: 500,
                                    },
                                    animateWeb: {
                                      properties: {
                                        positionZ: 0.02,
                                        opacity: 1.0,
                                      },
                                      easing: 'Bounce',
                                      duration: 500,
                                    },
                                  })

