import React from 'react';

import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/brands.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';
import './App.scss';

const faBoxes = [{
  name: 'react',
  facing: 'backwards',
  matched: false
}, {
  name: 'php',
  facing: 'backwards',
  matched: false
}, {
  name: 'drupal',
  facing: 'backwards',
  matched: false
}, {
  name: 'docker',
  facing: 'backwards',
  matched: false
}, {
  name: 'sass',
  facing: 'backwards',
  matched: false
}, {
  name: 'gitlab',
  facing: 'backwards',
  matched: false
}, {
  name: 'docker',
  facing: 'backwards',
  matched: false
}, {
  name: 'react',
  facing: 'backwards',
  matched: false
}, {
  name: 'php',
  facing: 'backwards',
  matched: false
}, {
  name: 'drupal',
  facing: 'backwards',
  matched: false
}, {
  name: 'sass',
  facing: 'backwards',
  matched: false
}, {
  name: 'gitlab',
  facing: 'backwards',
  matched: false
}];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      faBoxes: this.shuffle(faBoxes),
      completed: false,
      flippedCount: 0,
      prev: null,
      pair: []
    };

    this.flip = this.flip.bind(this);
    this.reset = this.reset.bind(this);
  }

  shuffle(faBoxes) {
    return faBoxes.sort(() => Math.random() - 0.5);
  }

  reset() {
    this.setState({
      faBoxes: this.shuffle(faBoxes.map(box => {
        box.facing = 'backwards';
        box.matched = false;
        return box;
      })),
      completed: false,
      flippedCount: 0,
      prev: null,
      pair: []
    });
  }

  flip(e) {
    e.preventDefault();
    
    const boxIndex = Number(e.target.dataset.boxIndex);

    if (this.state.faBoxes[boxIndex].facing === 'front' || e.target.classList.contains('box')) {
      return;
    }

    let newState = [];
    let matched = [];
    let completed = false;
    let flippedCount = this.state.flippedCount;
    let prev = this.state.prev;
    let pair = this.state.pair;

    if (pair.length === 2) {
      pair = [];
    }
    if ((flippedCount % 2) === 0) {
      prev = null;
    }

    this.state.faBoxes.forEach((box, index) => {
      if (!box.matched) {
        if (boxIndex === index && box.facing === 'backwards') {
          box.facing = 'front';
          pair.push(box.name);
          prev = prev || index;
        } else {
          box.facing = 'backwards';
        }
        if (index === prev) {
          box.facing = 'front';
        }
      }
      newState.push(box);
    });

    if (pair[0] === pair[1]) {
      newState.map(box => {
        if (pair[0] === box.name) {
          box.matched = true;
        }
        if (box.matched) {
          box.facing = 'front';
          matched.push(box.name);
        }
        return box;
      });
    }

    if (newState.length === matched.length) {
      completed = true;
    }
    
    this.setState({
      faBoxes: newState,
      completed: completed,
      flippedCount: this.state.flippedCount + 1,
      prev: prev,
      pair: pair
    });
  }

  faClassList(index, icon) {
    if (this.state.faBoxes[index].facing === 'backwards') {
      return 'fa fa-question-circle';
    } else {
      return 'fab fa-' + icon;
    }
  }

  render() {
    return (
      <div className={'App ' + (this.state.completed ? 'completed' : '')}>
          {this.state.faBoxes.map((icon, index) => {
            return (
              <div key={index} className={'box ' + icon.facing} onClick={this.flip}>
                <span className={this.faClassList(index, icon.name)} data-box-index={index}></span>
              </div>
            );
          })}
          <div className="congrats">
            <p>Congratulations!</p>
            <button onClick={this.reset}>Play again</button>
          </div>
      </div>
    );
  }
}

export default App;
