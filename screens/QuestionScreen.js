import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';

import questionsJSON from '../data/main.json';

export default class QuestionScreen extends Component {
  state = {
    questions: [...questionsJSON],
    currentQuestionIndex: null,
    timerCount: 10,
    disableButtons: true,
    answerButtonColors: {
      b1: '#fff',
      b2: '#fff',
      b3: '#fff',
      b4: '#fff',
    },
    answerButtonOrder: null,
  };

  async componentDidMount() {
    await this.loadQuestions();
    this.newQuestion();
  }

  loadQuestions = async () => {
    await this.setState({
      questions: [...questionsJSON],
    });
  };

  newQuestion = () => {
    if (this.state.questions.length > 0) {
      this.setState(prevState => ({
        answerButtonColors: {
          b1: '#fff',
          b2: '#fff',
          b3: '#fff',
          b4: '#fff',
        },
        background: Math.floor(Math.random() * 21) + 1,
        timerCount: 10,
        disableButtons: false,
        currentQuestionIndex: Math.floor(
          Math.random() * (prevState.questions.length - 1),
        ),
        answerButtonOrder: [1, 2, 3, 4].sort(() => 0.5 - Math.random()),
      }));

      this.timer = setInterval(() => {
        this.setState(prevState => ({
          timerCount: --prevState.timerCount,
        }));
      }, 1000);

      this.timeout = setTimeout(() => {
        clearInterval(this.timer);
        this.props.gameOver();
      }, 10000);
    } else {
      this.props.gameOver(true);
    }
  };

  handlePress = answer => {
    clearInterval(this.timer);
    clearTimeout(this.timeout);

    this.setState({
      disableButtons: true,
    });

    if (this.currentQuestion().answer === answer) {
      this.props.incrementScore();
    } else {
      this.setState(prevState => ({
        answerButtonColors: {
          ...prevState.answerButtonColors,
          [`b${answer}`]: '#ff4c4c',
        },
      }));
    }

    this.setState(prevState => ({
      answerButtonColors: {
        ...prevState.answerButtonColors,
        [`b${this.currentQuestion().answer}`]: '#00a98f',
      },
    }));

    setTimeout(() => {
      if (this.currentQuestion().answer === answer) {
        this.setState(prevState => ({
          questions: prevState.questions.slice(
            this.state.currentQuestionIndex,
            1,
          ),
        }));
        this.newQuestion();
      } else {
        this.props.gameOver();
      }
    }, 1500);
  };

  currentQuestion = () => this.state.questions[this.state.currentQuestionIndex];

  render() {
    const question = this.currentQuestion();
    const {
      disableButtons,
      answerButtonColors,
      answerButtonOrder,
      timerCount,
    } = this.state;

    const {score} = this.props;

    return (
      question && (
        <>
          <View style={styles.centerContainer}>
            <Text style={styles.question}>
              What's the capital of {question.question}?
            </Text>
            {question.answers.map((answer, i) => (
              <TouchableWithoutFeedback
                style={[styles.answerButton, {order: answerButtonOrder[i]}]}
                onPress={() => !disableButtons && this.handlePress(i)}
                key={i}>
                <Text
                  style={[
                    styles.answerButtonText,
                    {color: answerButtonColors[`b${i}`]},
                  ]}>
                  {answer}
                </Text>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <View style={styles.bottomBar}>
            <Text style={styles.bottomBarText}>Score: {score}</Text>
            <Text style={styles.bottomBarText}>{timerCount}</Text>
          </View>
        </>
      )
    );
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  question: {
    fontSize: 28,
    textAlign: 'center',
    color: '#fff',
    paddingBottom: 20,
  },
  answerButton: {
    width: '100%',
  },
  answerButtonText: {
    textAlign: 'center',
    fontSize: 24,
    paddingVertical: 15,
  },
  bottomBar: {
    paddingVertical: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomBarText: {
    color: '#fff',
    fontSize: 20,
  },
});
