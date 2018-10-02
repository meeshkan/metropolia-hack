import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs';

class App extends Component {

  constructor() {
    super();

    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

    // Generate some synthetic data for training.
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);
    this.state = {
      foo:1,
      xs,
      ys,
      model
    }
  }

  render() {
    // Train the model using the data.
    this.state.model.fit(this.state.xs, this.state.ys, {epochs: 10}).then(() => {
      // Use the model to do inference on a data point the model hasn't seen before:
      // Open the browser devtools to see the output
      //console.log(model.predict(tf.tensor2d([5], [1, 1])));
      this.setState({foo: ''+this.state.model.predict(tf.tensor2d([5], [1, 1])) });
    });
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Meeshkan's AI Class</h1>
        </header>
        <p>{this.state.foo}</p>
      </div>
    );
  }
}

export default App;
