import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			animalsList: ['dog', 'bird', 'cat', 'seal', 'rhino', 'giraffe'],
			words: [],
			inputBoxContents: '',
			currentKeyPressed: ''
		};

		// Bindings
		this.gameStartTimer = this.gameStartTimer.bind(this);
		this.createNewWord = this.createNewWord.bind(this);
		this.inputBoxChange = this.inputBoxChange.bind(this);
		this.checkForSuccess = this.checkForSuccess.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.update = this.update.bind(this);

		// Methods on page-load
		this.gameStartTimer();

		// Every second, call update()
		setInterval(() => {
			this.update();
		}, 1);
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
		document.addEventListener('click', () => {
			document.getElementById('input-box').focus();
		});
	}

	update() {
		let newWords = this.state.words;
		if (newWords.length > 0) {
			for (let i = 0; i < newWords.length; i++) {
				newWords[i].marginTop += 0.1;
				if(newWords[i].marginTop > 400){
					newWords[i].display = "none"
				}
			}
		}
		
		this.setState({
			words: newWords
		});
	}

	handleKeyPress(event) {
		this.setState({
			currentKeyPressed: event.keyCode
		}, () => {
			if (this.state.currentKeyPressed === 27) {
				this.setState({
					inputBoxContents: ''
				})
			}
		});
	}

	gameStartTimer() {
		setTimeout(() => {
			this.createNewWord();
			// this.createNewFallingWord();
			// this.create();
		}, 1000);
	}

	createNewWord() {
		let words = this.state.words;
		let list = this.state.animalsList;

		let rand = Math.floor(Math.random() * (list.length - 1));
		let leftMargin = Math.floor(Math.random() * 750);
		words.push(
			{
				word: list[rand],
				marginTop: -100,
				marginLeft: leftMargin,
				display:""
			}
		);

		this.setState({
			words: words
		}, () => {
			setTimeout(() => {
				this.createNewWord();
			}, 5000);
		});
	}

	inputBoxChange(event) {
		let newInputBoxContents = event.target.value;

		this.setState({
			inputBoxContents: newInputBoxContents
		}, () => {
			this.checkForSuccess();
		});
	}

	checkForSuccess() {
		let words = this.state.words;
		let inputBoxContents = this.state.inputBoxContents;

		for (let i = 0; i < words.length; i++) {
			let wordObj = words[i];
			let word = wordObj.word;

			if (word === inputBoxContents) {
				words.splice(i, 1);
				this.setState({
					words: words,
					inputBoxContents: ''
				});
			}
		}
	}

	render() {
		let words = this.state.words;
		let wordsJSX = words.map((el, i) => {
			return (
				<div key={i} className="falling-word" style={{ marginLeft: el.marginLeft, marginTop: el.marginTop ,display : el.display}}>
					<h3>{el.word}</h3>
				</div>
			)
		});

		return (
			<div className="App">
				<form className="input-form">
					<input autoFocus value={this.state.inputBoxContents} onChange={this.inputBoxChange} id="input-box"></input>
				</form>
				<br />
				<div className="wordContainer">
					{wordsJSX}
				</div>
			</div>
		);
	}
}

export default App;