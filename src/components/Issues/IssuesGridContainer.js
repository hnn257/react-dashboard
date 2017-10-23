import React, { Component } from 'react';
import IssuesGrid from './IssuesGrid.js';

import { connect } from 'react-redux';
import { issuesFetched, issuesReceived } from './../../actions';

const baseUrl = 'https://api.github.com/repos/telerik/kendo-ui-core/issues';

class IssuesGridContainer extends Component {
    componentDidMount() {
        let headers = {
            // Generate your own token through
            // https://github.com/settings/tokens

            'Authorization': "token b95116792cba5a8169a1ec10640d8c16535c6419"
        };

        let url = baseUrl + '?state=all&page=2&per_page=100';

        this.props.dispatch(issuesFetched());

        return fetch(url, { method: 'GET', accept: 'application/json', headers: headers })
            .then(response => response.json())
            .then(json => this.props.dispatch(issuesReceived(json)));
    }

    render() {
        console.log('renders');
        console.log(this.props.issues);
        return(
            <IssuesGrid issues={this.props.issues}/>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        issues: state.issues
    }
}

IssuesGridContainer = connect(mapStateToProps)(IssuesGridContainer);
export default IssuesGridContainer;
