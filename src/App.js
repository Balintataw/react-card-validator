import React, { Component } from 'react'
import './App.css'
import valid from 'card-validator'

class App extends Component {
	state = {
		cardNumber: '',
		expMonth: '',
		expYear: '',
		cardholderName: '',
		ccvNum: 'ccv',
		cardType: ''
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
		this.setState({
			[target.name]: target.value.replace(/ /g, '')
		})
		var numberValidation = valid.number(target.value);

		if (!numberValidation.isPotentiallyValid) {
			  // renderInvalidCardNumber();
			  console.log('Invalid card number')
		}

		if (numberValidation.card) {
			console.log(numberValidation.card.type);
			this.setState({
				cardType: numberValidation.card.niceType
			})
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
						<p>{this.state.cardType}</p>
						<p>Card No</p>
						<input value={this.state.cardNumber} placeholder="**** **** **** ****"/>
						<div>
							<p>Expiration</p>
							<input value={this.state.expMonth} className="month" placeholder="02"/>/
							<input value={this.state.expYear} className="year" placeholder="19"/>
						</div>
						<p>Cardholders Name</p>
						<input value={this.state.cardholderName}/>
					</div> 
				</div>
				<form id="form-container" action="">
					<label>cardnumber
						<input  type="text" 
								name="cardNumber"
								id="cardnumber"
								onKeyUp={this.handleCardnumberChange}
								onChange={this.handleChange}
								value={this.state.cardNumber}
								placeholder="number"/>
					</label>
					<label>exp date
						<input 	type="text" 
								name="expMonth"
								id="month"
								onKeyUp={this.handleExpMonthChange}
								onChange={this.handleChange}
								value={this.state.expMonth}
								placeholder="02"/>/
						<input  type="text" 
								name="expYear"
								id="year"
								onKeyUp={this.handleExpYearChange}
								onChange={this.handleChange}
								value={this.state.expYear}
								placeholder="18"/>
					</label>
					<label>cardholder name
						<input  type="text" 
								name="cardholderName"
								id="name"
								onChange={this.handleChange}
								value={this.state.cardholderName}
								placeholder="name"/>
					</label>
					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default App;
