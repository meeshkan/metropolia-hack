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
    /*
    self.D = Sequential()
depth = 64
dropout = 0.4
# In: 28 x 28 x 1, depth = 1
# Out: 14 x 14 x 1, depth=64
input_shape = (self.img_rows, self.img_cols, self.channel)
self.D.add(Conv2D(depth*1, 5, strides=2, input_shape=input_shape,\
padding='same', activation=LeakyReLU(alpha=0.2)))
self.D.add(Dropout(dropout))
self.D.add(Conv2D(depth*2, 5, strides=2, padding='same',\
activation=LeakyReLU(alpha=0.2)))
self.D.add(Dropout(dropout))
self.D.add(Conv2D(depth*4, 5, strides=2, padding='same',\
activation=LeakyReLU(alpha=0.2)))
self.D.add(Dropout(dropout))
self.D.add(Conv2D(depth*8, 5, strides=1, padding='same',\
activation=LeakyReLU(alpha=0.2)))
self.D.add(Dropout(dropout))
# Out: 1-dim probability
self.D.add(Flatten())
self.D.add(Dense(1))
self.D.add(Activation('sigmoid'))
self.D.summary()
    */
   this.state.model.add(tf.layers.conv2d({
    filters: 64,
    kernelSize: [5,5],
    strides: 2,
    inputShape: [10, 128, 128, 3]
   })); // 2dconv
   this.state.model.add(tf.layers.leakyReLU({
     alpha: 0.2
   })); // leaky relu

    /*this.state.model.add(tf.layers.dense({units: 1, inputShape: [1]}));

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
    });*/
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
