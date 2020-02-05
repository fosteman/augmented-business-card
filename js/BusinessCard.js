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
  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      isTracking: true
    } else if (state == ViroConstants.TRACKING_NONE) {
      isTracking: false
    }
  }
  state = {
    isTracking: false,
    initialized: false,
    runAnimation: false,
  }

  getNoTrackingUI = () => <ViroText text={this.state.initialized ? 'Initializing AR...' : 'No Tracking'}/>

  getARScene() {
    return (
      <ViroNode>
        <ViroARImageMarker target={'In a heartbeat'}
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
                height={0.25}
                width={0.40}
                style={styles.card}
              >
                <ViroFlexView
                  style={styles.cardWrapper}
                >

                  <ViroText
                    textClipMode="None"
                    text="In a heartbeat"
                    scale={[.015, .015, .015]}
                    style={styles.textStyle}
                  />
                </ViroFlexView>
                <ViroFlexView
                  onTouch={() => alert('twitter')}
                  style={styles.subText}
                >
                  <ViroAnimatedImage
                    height={0.20}
                    width={0.20}
                    loop={true}
                    source={require('./res/tweet.gif')}
                  />
                  <ViroText
                    width={0.10}
                    height={0.40}
                    textAlign="left"
                    textClipMode="None"
                    text={"Timofei Shchepkin"}
                    scale={[.01, .01, .01]}
                    style={styles.textStyle}
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
              <ViroText
                width={0.30}
                height={0.60}
                textAlign="left"
                textClipMode="None"
                text={"Love Peace & Harmony"}
                scale={[.01, .01, .01]}
                style={styles.textStyle}
              />
            </ViroNode>
          </ViroNode>
        </ViroARImageMarker>
        <ViroARImageMarker target={'Fire'}
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
                height={0.25}
                width={0.40}
                style={styles.card}
              >
                <ViroFlexView
                  style={styles.cardWrapper}
                >
                  <ViroImage
                    height={0.15}
                    width={0.15}
                    style={styles.image}
                    source={require('./res/Fire.png')}
                  />
                  <ViroText
                    textClipMode="None"
                    text="Fire"
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
                    text={'Saeideh B.T.'}
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
              <ViroText text="She can appreciate fire once she felt ice"
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
}

var styles = StyleSheet.create({
                                 textStyle: {
                                   flex: .5,
                                   fontFamily: 'Roboto',
                                   fontSize: 256,
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
                                      'In a heartbeat': {
                                        source: require('./res/heart.png'),
                                        orientation: 'Up',
                                        physicalWidth: 0.5588,
                                      },
                                      'Fire': {
                                        source: require('./res/Fire.png'),
                                        orientation: 'Up',
                                        physicalWidth: 0.4572,
                                      },
                                      'extouring': {
                                        source: require('./res/extouring-target.JPG'),
                                        orientation: 'Up',
                                        physicalWidth: 0.005,
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
                                        positionX: 0.3,
                                        opacity: 1.0,
                                      },
                                      easing: 'Bounce',
                                      duration: 800,
                                    },
                                    animateWeb: {
                                      properties: {
                                        positionZ: 0.02,
                                        opacity: 1.0,
                                      },
                                      easing: 'Bounce',
                                      duration: 800,
                                    },
                                  })

