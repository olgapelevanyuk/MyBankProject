import React from 'react';
import {connect} from 'react-redux';
import {acApplicationsLoaded, APPLICATIONS_LOADING, acUpdateApplication, acSetCurrentApplication} from '../constants/actionTypes';
import {withRouter} from 'react-router-dom';
import { getData, patchData } from '../utils/utils';
import '../components/ApplicationList.css'; 
class ApplicationList extends React.PureComponent{

    async componentDidMount(){
        this.props.dispatch({
            type: APPLICATIONS_LOADING,
        });
            let data = await getData('applications');
        this.props.dispatch(acApplicationsLoaded(data));           
    }        

    changeApplStatus = async (applId, value) => {
        let application = await patchData('applications/' + applId, {status: value});
        this.props.dispatch(acUpdateApplication(application));
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
                <div onDoubleClick={this.showApplicationFullInfo.bind(this, appl.id)} key={appl.id} className="applListItem">
                    <div>{appl.id}</div>
                    <div>{appl.date}</div>
                    <div>{appl.time}</div>
            <div>{`${appl.clientSurname} ${appl.clientFirstName} ${appl.clientLastName}`}</div>
                    <div>{appl.topic}</div>
            <div>
                {appl.status === 1 && "Заявка получена банком"}
                {appl.status === 2 && "Взята в работу"}
                {appl.status === 3 && "Исполнена"}
            </div>
            <div>
                <button onClick={this.showApplicationFullInfo.bind(this, appl.id)}>Просмотреть полную информацию</button>
            </div>
            <div>
                <button onClick={this.changeApplStatus.bind(this, appl.id, 2)}>Взять в работу</button>
            </div>
            <div>
                <button onClick={this.changeApplStatus.bind(this, appl.id, 3)}>Пометить как исполненную</button>
            </div>
                </div>
            ))
        }
    }

    showApplicationFullInfo = async id => {
        let application = await getData('applications/' + id);
        this.props.dispatch(acUpdateApplication(application));
        this.props.dispatch(acSetCurrentApplication(application));
        this.props.history.push(`applications/${id}`);
    }

    render () {
        
        

        return (
            this.props.applications.loading && 
            (<div>Идет загрузка</div>) || 
            (
            <div>
                <h2>Заявки клиентов</h2>
                {this.renderClientApplications()}
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
)(ApplicationList));