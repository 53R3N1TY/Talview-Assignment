import React, {Component} from 'react'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import {API_URL} from './config'
import RepoList from './RepoList';

export default class OAuth extends Component {

    state = {
        user: {},
        disabled: ''
    }

    componentDidMount() {
        const { socket, provider } = this.props

        socket.on(provider, user => {
            // this.props.close()
            this.setState({user})
        })
    }


    checkPopup() {
        const check = setInterval(() => {
            const { popup } = this
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check)
                this.setState({disabled: ''})
            }
        }, 1000)
    }

    openPopup() {
        const { provider, socket } = this.props
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `${API_URL}/${provider}?socketId=${socket.id}`

        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
        )
    }

    startAuth(e) {
        if(!this.state.disabled) {
            e.preventDefault()
            this.popup = this.openPopup()
            this.checkPopup()
            this.setState({disabled: 'disabled'})
        }
    }

    closeCard() {
        this.setState({user: {}})
    }           

    render() {
        const { name, photo, repos} = this.state.user
        const { provider } = this.props
        const { disabled } = this.state
        console.log(name,photo,repos)

        console.log("props",this.props);

        return (
            <div>
                { name
                    ? <div>
                        <div className={'card'}>
                            <img src={photo} alt={name}/>
                            <FontAwesome
                                name={'times-circle'}
                                className={'close'}
                                onClick={this.closeCard.bind(this)}
                            />
                        </div>
                        <h4>{name}</h4>
                        <h4>Repositories</h4>
                        {
                            repos.map((repo)=><RepoList
                            key={repo.id}
                            html_url = {repo.html_url}
                            name={repo.name}/>
                            )
                        }
                    </div>
                    : <div className={'button-wrapper fadein-fast'}>
                        <button
                            onClick={this.startAuth.bind(this)}
                            className={`${provider} ${disabled} button`}
                        >
                            <FontAwesome
                                name={provider}
                            />
                        </button>
                    </div>
                }
            </div>
        )
    }
}

OAuth.propTypes = {
    provider: PropTypes.string.isRequired,
    socket: PropTypes.object.isRequired
}