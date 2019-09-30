import React from 'react'

function RepoList(props) {
    console.log(props)
    return (
        <div>
            <a href={props.html_url}>{props.name}</a>
        </div>
    )
}

export default RepoList