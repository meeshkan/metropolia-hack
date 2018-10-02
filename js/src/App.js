import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs';

class App extends Component {

  constructor() {
    super();

    const model = tf.sequential();
    
    // Generate some synthetic data for training.
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);
    this.state = {
      loss: 100000,
      xs,
      ys,
      model
    }
  }

  async componentDidMount() {
    this.state.model.add(tf.layers.dense({units: 1, inputShape: [1]}));

    // Prepare the model for training: Specify the loss and the optimizer.
    this.state.model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

    for (let i = 1; i < 100 ; ++i) {
      const history = await this.state.model.fit(this.state.xs, this.state.ys, {
        epochs: 1,
      });
      this.setState({loss: history.history.loss[0]})
   }
    const output = this.state.model.predict(tf.tensor2d([1], [1,1]));
    this.setState({
      myStateVar: output.dataSync()[0]
    });
  }

  render() {
    // Train the model using the data.
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Meeshkan's AI Class</h1>
        </header>
        <p>{this.state.loss}</p>
      </div>
    );
  }
}

export default App;
