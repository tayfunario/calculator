import './App.css';
import React from 'react'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      full : '0',
      current : '0',
      operator: false,
      dotUsed: false,
      numberUsed: false,
      lengthReached: false
    }
    this.clear = this.clear.bind(this)
    this.updateCurr = this.updateCurr.bind(this)
  }

  updateCurr(num){
    if(this.lengthCheck()){
      this.setState({
        current: 'length limit reached'
      })
      return
    }
    if(/^0/g.test(this.state.current)){
      this.setState({
        full: '',
        current: '',
        operator: true
      })
    } 
    else if(this.state.operator){
      this.setState({
        current: ''
      })
    }

    this.setState(state => ({
      full: state.full+num,
      current: state.current+num,
      operator: false,
      numberUsed: true
    }))
  }
  
  evaluate(){
    this.setState({
      current: eval(this.state.full)
    })
  }

  decimal(){
    if(/[+-/*]/.test(this.state.current)){
      return
    }
    if(!this.state.dotUsed && this.state.numberUsed){
      this.setState(state => ({
        full: state.full+'.',
        current: state.current+'.',
        dotUsed: true
      }))
    }
  }

  lengthCheck(){
    if(this.state.full.length >= 30){
      return true
    }
  }

  operator(str){
    if(this.state.operator){
      return
    }
    else if(/^0/.test(this.state.current)){
      return
    }

    let operation = ''
    switch(str){
      case 'add':
        operation = '+'
        break
      case 'subtract':
        operation = '-'
        break
      case 'multiply':
        operation = '*'
        break
      case 'divide':
        operation = '/'
        break
    }
    this.setState(state => ({
      full: state.full+operation,
      current: operation,
      operator: true,
      dotUsed: false
    }))
  }

  clear(){
    this.setState({
      full: '0',
      current: '0',
      numberUsed: false,
      dotUsed: false
    })
  }

  render(){
    return (
      <div className='container-fluid d-flex justify-content-center align-items-center'>
        <div id='calculator'>
          <div id='displayContainer'>
            <div id='display'>{this.state.full}</div>
            <div id='displayCurrent'>{this.state.current}</div>
          </div>
          <div className='row height90 top'>
            <button className='col-6 center-text special' id='clear' onClick={() => {this.clear()}}>Clear</button>
            <button className='col-6 center-text special' id='equals' onClick={() => {this.evaluate()}}>=</button>
          </div>
          <div className='row height90'>
            <button className='col-3 center-text' id='seven' onClick={() => this.updateCurr('7')}>7</button>
            <button className='col-3 center-text' id='eight' onClick={() => this.updateCurr('8')}>8</button>
            <button className='col-3 center-text' id='nine' onClick={() => this.updateCurr('9')}>9</button>
            <button className='col-3 center-text special' id='add' onClick={() => this.operator('add')}>+</button>
          </div>
          <div className='row height90'>
            <button className='col-3 center-text' id='four' onClick={() => this.updateCurr('4')}>4</button>
            <button className='col-3 center-text' id='five' onClick={() => this.updateCurr('5')}>5</button>
            <button className='col-3 center-text' id='six' onClick={() => this.updateCurr('6')}>6</button>
            <button className='col-3 center-text special' id='subtract' onClick={() => this.operator('subtract')}>-</button>
          </div>
          <div className='row height90'>
            <button className='col-3 center-text' id='one' onClick={() => this.updateCurr('1')}>1</button>
            <button className='col-3 center-text' id='two' onClick={() => this.updateCurr('2')}>2</button>
            <button className='col-3 center-text' id='three' onClick={() => this.updateCurr('3')}>3</button>
            <button className='col-3 center-text special' id='multiply' onClick={() => this.operator('multiply')}>x</button>
          </div>
          <div className='row height90'>
            <button className='col-6 center-text' id='zero' onClick={() => this.updateCurr('0')}>0</button>
            <button className='col-3 center-text' id='decimal' onClick={() => this.decimal()}>.</button>
            <button className='col-3 center-text special' id='divide' onClick={() => this.operator('divide')}>/</button>
          </div>
        </div>
      </div>
    )
  }
}


export default App;
