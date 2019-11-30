import React from 'react';
import {connect} from 'react-redux';
import {acApplicationsLoaded, APPLICATIONS_LOADING, acSetCurrentApplication} from '../constants/actionTypes';
import {withRouter} from 'react-router-dom';
import {getData} from '../utils/utils';
class Application extends React.PureComponent{
    async componentDidMount(){
        if(!this.props.applications.currentApplication){
            const applId = this.props.match.params.id;
            let application = await getData('applications/' + applId);
        this.props.dispatch(acSetCurrentApplication(application));   
    }         
    }        



    render () {
        const {applications:{
            currentApplication
        }} = this.props;
        

        return (
            !currentApplication && 
            <div>Идет загрузка</div> || 
            (
            <div>
                <h2>{`Заявка № ${currentApplication.id}`}</h2>
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