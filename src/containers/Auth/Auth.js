import React, {Component} from 'react'
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                placeholder: 'example@mail.com',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter correct email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                placeholder: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter correct password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        },
        // text: [
        //     {
        //         id: 1,
        //         val: 'Hello',
        //         count: 5
        //     },
        //     {
        //         id: 2,
        //         val: 'Hello 2',
        //         count: 125
        //     }
        // ],
    };

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );
    };

    registrationHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );
    };

    submitHandler = event => {
        event.preventDefault()
    };

    validateControl(value, validation){
        if (!validation){
            return true;
        }

        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email){
            isValid = is.email(value) && isValid;
        }
        if (validation.minLength){
            isValid = value.length >= validation.minLength && isValid;
        }
        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({
            formControls, isFormValid
        })
    };


    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    placeholder={control.placeholder}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    testHandler = (i) => {
        // const text = {...this.state.text};
        // text.count = 10;
        // this.setState({text});

        // this.setState({
        //     text: {...this.state.text, count: 10}
        // })

        // this.setState(prevState=>({text: {...prevState.text, count: 123}}));

        // let text = [...this.state.text];
        // text[i] = { ...text[i], val: "Gdaf zdf"};
        // // text[i] = Object.assign({}, text[i], {val: 'Start start'});
        // this.setState({
        //     text
        // })
    };

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Auth</h1>

                    <form className={classes.AuthForm} onSubmit={this.submitHandler}>

                        {this.renderInputs()}

                        <Button
                            type={'success'}
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >Sign in</Button>

                        <Button
                            type={'primary'}
                            onClick={this.registrationHandler}
                            disabled={!this.state.isFormValid}
                        >Registration</Button>

                        {/*<Button*/}
                        {/*    type={'primary'}*/}
                        {/*    onClick={() => this.testHandler(0)}*/}
                        {/*>Test</Button>*/}

                    </form>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)
