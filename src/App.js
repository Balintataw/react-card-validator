import React, { Component } from 'react'
import './App.css'
import valid from 'card-validator'
import visa from './images/visa.png'
import disc from './images/discover.png'
import mc from './images/mc.png'
import amex from './images/amex.png'

class App extends Component {
	state = {
		cardNumber: '',
		expMonth: '',
		expYear: '',
		cardholderName: '',
		cvcNum: 'cvc',
		cardType: '',
		cardImage: ''
	}
	componentDidMount() {
		document.title ="Card"
	}
	handleChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		})
	}
	handleCardnumberChange = ({target}) => {
		if (this.state.cardType === "Visa") {	
			this.setState({
				[target.name]: target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
			})
		} else if (this.state.cardType === "American Express") {
			this.setState({
				[target.name]: target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})(.{6})/g, '$1 $2 ').trim()
			})
		}
		var numberValidation = valid.number(target.value);

		if (!numberValidation.isPotentiallyValid) {
			  // renderInvalidCardNumber();
			  console.log('Invalid card number')
			  this.setState({
				  cardType: '',
				  cardImage: ''
			  })
		} 
		 if (numberValidation.card) {
			console.log(numberValidation.card.niceType);
			this.setState({
				cardType: numberValidation.card.niceType
			})
			if (this.state.cardType === 'Visa') {
				this.setState({
					cardImage: visa
				})
			} else if (this.state.cardType === 'Discover') {
				this.setState({
					cardImage: disc
				})
			} else if (this.state.cardType === 'American Express') {
				this.setState({
					cardImage: amex
				})
			} else if (this.state.cardType === 'Mastercard') {
				this.setState({
					cardImage: mc
				})
			}
		}
	}
	handleExpMonthChange = ({target}) => {
		this.setState({
			[target.name]: target.value.replace(/ |\//g, ''),
		 });
		var monthValidation = valid.expirationMonth(target.value);

		if (!monthValidation.isPotentiallyValid) {
			console.log('Invalid month')
		}

		if (monthValidation.card) {
			console.log('valid month')
			this.setState({
				expMonth: target.value
			})
		}
	}
	handleExpYearChange = ({target}) => {
		this.setState({
			[target.name]: target.value.replace(/ |\//g, ''),
		 });
		var yearValidation = valid.expirationDate(target.value);

		if (!yearValidation.isPotentiallyValid) {
			console.log('Invalid year')
		}

		if (yearValidation.card) {
			console.log('valid year')
			this.setState({
				expYear: target.value
			})
		}
	}
	handleChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		})
	}
	render() {
		return (
			<div className="app">
				<div className="card-container">
					<div className="card">
						<input value={this.state.cardNumber} className="number" placeholder="**** **** **** ****" x-autocomplete="cc-number"/>
						<div>
							<input value={this.state.expMonth} className="month" placeholder="02"/>
							<p className="slash">/</p>
							<input value={this.state.expYear} className="year" placeholder="19"/>
							<img src={this.state.cardImage} id="card-logo" alt ='' />
						</div>
						<input value={this.state.cardholderName} className="name"/>
					</div> 
				</div>
				<form id="form-container" action="">
					<input  type="text" 
							name="cardNumber"
							id="cardnumber"
							onKeyUp={this.handleCardnumberChange}
							onChange={this.handleChange}
							value={this.state.cardNumber}
							placeholder="card number"/>
					<input 	type="text" 
							name="expMonth"
							id="month"
							onKeyUp={this.handleExpMonthChange}
							onChange={this.handleChange}
							value={this.state.expMonth}
							placeholder="month"/>/
					<input  type="text" 
							name="expYear"
							id="year"
							onKeyUp={this.handleExpYearChange}
							onChange={this.handleChange}
							value={this.state.expYear}
							placeholder="year"/>
					<input  type="text" 
							name="cardholderName"
							id="name"
							onChange={this.handleChange}
							value={this.state.cardholderName}
							placeholder="name"/>
					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default App;
