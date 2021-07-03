import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Sound from 'react-native-sound';

import CommonScreen from './screens/CommonScreen';
import QuestionScreen from './screens/QuestionScreen';

import Images from './images';

export default class App extends Component {
  state = {
    score: 0,
    background: 22,
    started: false,
    gameOver: false,
    noMoreQuestion: false,
  };

  componentDidMount() {
    const bgm = new Sound('./bgm.mp3', Sound.MAIN_BUNDLE, () => {
      bgm.setNumberOfLoops(-1);
      bgm.play();
    });
  }

  play = () => {
    this.setState({
      started: true,
    });
  };

  incrementScore = () => {
    this.setState(prevState => ({
      score: prevState.score + 10,
    }));
  };

  gameOver = (noMoreQuestion = false) => {
    this.setState({
      gameOver: true,
      noMoreQuestion,
    });
  };

  playAgain() {
    this.setState({
      score: 0,
      gameOver: false,
    });
  }

  render() {
    const {noMoreQuestion, gameOver, started, score, background} = this.state;

    return (
      <>
        <StatusBar barStyle="light-content" />
        {background && (
          <ImageBackground
            source={Images[`i${background}`]}
            blurRadius={20}
            style={styles.background}>
            <View style={styles.overlayConainer}>
              <SafeAreaView>
                <View style={styles.mainContainer}>
                  {!started ? (
                    <CommonScreen
                      title="QuizCaps"
                      buttonText="Play"
                      onPress={this.play}
                    />
                  ) : (
                    <>
                      {!noMoreQuestion ? (
                        <>
                          {!gameOver ? (
                            <QuestionScreen
                              incrementScore={this.incrementScore}
                              gameOver={this.gameOver}
                              youWin={this.youWin}
                            />
                          ) : (
                            <CommonScreen
                              title="Game Over"
                              subtitle={`Score: ${score}`}
                              buttonText="Play Again"
                              onPress={this.playAgain}
                            />
                          )}
                        </>
                      ) : (
                        <CommonScreen
                          title="You Win!"
                          subtitle="You answered all questions correctly."
                          buttonText="Play Again"
                          onPress={this.playAgain}
                        />
                      )}
                    </>
                  )}
                </View>
              </SafeAreaView>
            </View>
          </ImageBackground>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  overlayConainer: {
    flex: 1,
    backgroundColor: '#00000060',
  },
  mainContainer: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
  },
  background: {
    height: '100%',
    width: '100%',
  },
});
