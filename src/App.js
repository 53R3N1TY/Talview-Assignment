import React, {Component} from 'react'
import io from 'socket.io-client'
import OAuth from './OAuth'
import { API_URL } from './config'
import './App.css'

const socket = io(API_URL)
const providers = ['github']

export default class App extends Component {
  
  render() {
    return (
      <div className={'wrapper'}>
        <h2>Talview-Assignment</h2>
        <div className={'container'}>
          <h4>Login with GitHub</h4>
          {providers.map(provider =>
            <OAuth
              provider={provider}
              key={provider}
              socket={socket}
            />
          )}
        </div>
      </div>
    )
  }
}
