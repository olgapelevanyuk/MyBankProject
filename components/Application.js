import React from 'react';
import {connect} from 'react-redux';
import {acApplicationsLoaded, APPLICATIONS_LOADING} from '../constants/actionTypes';
import {withRouter} from 'react-router-dom';
class Application extends React.PureComponent{

    async componentDidMount(){
        this.props.dispatch({
            type: APPLICATIONS_LOADING,
        });
            let data = await getData('applications');
        this.props.dispatch(acApplicationsLoaded(data));           
    }        

    renderClientApplications = () => {
        const {list} = this.props.applications;
        if(!list.length){
            return (
                <div>Заявок нет</div>
            )
        }
        else {
            return list.map(appl => (
                <div onDoubleClick={this.showApplicationFullInfo.bind(this, appl.id)} key={appl.id}>
                    <div>{appl.id}</div>
                    <div>{appl.clientName}</div>
                    <div>{appl.info}</div>
                </div>
            ))
        }
    }

    showApplicationFullInfo = id => {
        this.history.push(`applications/${id}`);
    }

    render () {
        
        

        return (
            this.props.applications.loading && 
            (<div>Идет загрузка</div>) || 
            (
            <div>
                <h2>Заявки клиентов</h2>
                {this.renderClientApplications}
            </div>
            )
        )
    }
}

export default withRouter(connect(
    state => ({
        users: state.users,
        applications: state.applications,
    })
)(Application));