import React, { Component } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';

class Form extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        message: '',
    }

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    submitHandler = e => {
        e.preventDefault();
    }

    render() {
        const { name, email, phone, message } = this.state;

        return <form onSubmit={this.submitHandler}>
            <FormGroup>
                <Input type="text" onChange={this.inputChangeHandler} name="name" value={name} placeholder="Your name *" />
            </FormGroup>

            <FormGroup>
                <Input type="email" onChange={this.inputChangeHandler} name="email" value={email} placeholder="E-mail address *" />
            </FormGroup>
            
            <FormGroup>
                <Input type="tel" onChange={this.inputChangeHandler} name="phone" value={phone} placeholder="Phone number *" />
            </FormGroup>
            
            <FormGroup>
                <Input type="textarea" onChange={this.inputChangeHandler} name="message" value={message} placeholder="Your message *" />
            </FormGroup>

            <Button block color="green">Subscribe now!</Button>
        </form>;
    }
}

export default Form;