import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import signIn from '../actions/user/sign-in'
import Title from '../components/UI/Title'

import Webcam from 'react-webcam';

const dialogStyle = {
  width: '400px',
  margin: '50px auto',
  padding: '2rem',
}

const buttonStyle = {
  float: 'right',
  marginLeft: '2rem',
}

export class SignIn extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    signedIn: PropTypes.bool,
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc)
  }

  componentWillMount() {
    const { replace, signedIn } = this.props
    if (signedIn) replace('/')
  }

  submitForm(event) {
    event.preventDefault()
    const user = {
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
    }
    this.props.signIn(user)
  }

  signUp() {
    this.props.push('/sign-up')
  }

  render() {
    return (
    <div>
      <Webcam
        className="newPhoto"
        audio={false}
        height={350}
        ref={this.setRef}
        screenshotFormat="image/jpeg"
        width={350}
        />
      <button onClick={this.capture}>Capture photo</button>

      <Paper style={ dialogStyle }>
        <Title content="Sign In" level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField ref="email" type="email" hintText="Email address" />
          </div>
          <div className="input">
            <TextField ref="password" type="password" hintText="Password"  />
          </div>
        </form>
        <FlatButton
          onClick={ this.signUp.bind(this) }
          label="Sign up" />
        <RaisedButton
          style={ buttonStyle }
          onClick={ this.submitForm.bind(this) }
          label="Sign in"
          primary={true} />
      </Paper>
    </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { signIn, replace, push })(SignIn)
