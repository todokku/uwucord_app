import React from 'react'
import {Link} from 'react-router-dom'

export const DEMO_USER = {
    email: "demo@uwu.com",
    password: "passwod"
}

class SessionForm extends React.Component {
    constructor(){
        super()
        this.state = {
            email: "",
            password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDemoLogin = this.handleDemoLogin.bind(this)
    }

    handleInput(type) {
        return (e) => {
            this.setState({[type]: e.target.value})
        }
    }

    handleDemoLogin(e) {
        e.preventDefault();
        this.setState(DEMO_USER)
        setTimeout(() => this.props.processForm(DEMO_USER)
            .then(() => this.props.history.push('/channels/@me')), 1000)
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state)
        this.props.processForm(user)
            .then(() => this.props.history.push('/channels/@me'))
    }

    componentWillUnmount(){
        this.props.clearErrors()
    }

    render(){
        const link = (this.props.formType === "signup") ? 
        ( <span>Alweady have an account ? <Link to="/login"> uwu !!!</Link></span> ) 
            : ( 
            <span>
                Wanna sign in? <Link to="/register">Wegister !!</Link> or T-twy a <span onClick={this.handleDemoLogin}><a>Demo</a></span> !!</span>)
        const header = (this.props.formType === "signup") ? 
        ( <h1>Sign Uwup!</h1> ) : ( <h1>Welcombe back !! ^ w ^</h1>)
        const button = (this.props.formType === "signup") ? 
        ("ÒwÓ LES GO !!") : ("Wog In")

        return(<div className="session-background">
                <img src={window.pinkWogo} width={"180px"}/>
                <form className="session-form" >
                <header className="session-form-header">
                    {header}
                    {this.props.formType === "login" ? (<h2>it's not like i missed u b-baka!</h2>) : "" }
                </header>
                <span className="session-errors">{!this.props.errors.length ? "" : <>ERROR: <i>{this.props.errors.length > 1 ? this.props.errors.join(" & ") : this.props.errors}</i></>}</span>
                    <label>Emwail
                    <input 
                        type="email"
                        value={this.state.email}
                        onChange={this.handleInput('email')}
                    />
                     </label>
                    {this.props.formType === "signup" ?
                    (<label>Uwusername
                        <input 
                            type="text"
                            value={this.state.username}
                            onChange={this.handleInput('username')}
                        />
                    </label>) : ""
                    }
                    <label>Passwod
                        <input 
                            type="password"
                            value={this.state.password}
                            onChange={this.handleInput('password')}
                        />
                    </label>
                    <button onClick={this.handleSubmit}>{button}</button>
                    {link}
                    </form>
        </div>
        )
    }
} 
export default SessionForm