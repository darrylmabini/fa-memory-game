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
      flippedCount: 0,
      pair: []
    };

    this.flip = this.flip.bind(this);
  }

  shuffle(faBoxes) {
    return faBoxes.sort(() => Math.random() - 0.5);
  }

  reset() {
    this.setState({
      faBoxes: faBoxes.map(box => {
        box.facing = 'backwards';
        return box;
      }),
      flippedCount: 0
    });
  }

  flip(e) {
    e.preventDefault();
    
    const boxIndex = Number(e.target.dataset.boxIndex);

    if (this.state.faBoxes[boxIndex].facing === 'front') {
      return;
    }

    let newState = [];
    let pair = this.state.pair;

    if (pair.length === 2) {
      pair = [];
    }

    this.state.faBoxes.forEach((box, index) => {
      if (!box.matched) {
        if (boxIndex === index && box.facing === 'backwards') {
          box.facing = 'front';
          pair.push(box.name);
        } else {
          box.facing = 'backwards';
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
        }
        return box;
      });
    }
    
    this.setState({
      faBoxes: newState,
      flippedCount: this.state.flippedCount + 1,
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
      <div className="App">
          {this.state.faBoxes.map((icon, index) => {
            return (
              <div key={index} className={'box ' + icon.facing} onClick={this.flip}>
                <span className={this.faClassList(index, icon.name)} data-box-index={index}></span>
              </div>
            );
          })}
      </div>
    );
  }
}

export default App;
