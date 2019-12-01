import React from 'react';
import {connect} from 'react-redux';
import {acApplicationsLoaded, APPLICATIONS_LOADING, acUpdateApplication, acSetCurrentApplication, USERS_LOADING, USERS_LOADED} from '../constants/actionTypes';
import {withRouter} from 'react-router-dom';
import { getData, patchData } from '../utils/utils';
import '../components/ApplicationList.css'; 
class ApplicationList extends React.PureComponent{

    async componentDidMount(){
        this.props.dispatch({
            type: USERS_LOADING,
        });
            let usersList = await getData('users');
        this.props.dispatch({
            type: USERS_LOADED,
            data: usersList,
        });
        this.props.dispatch({
            type: APPLICATIONS_LOADING,
        });
            let data = await getData('applications');
        this.props.dispatch(acApplicationsLoaded(data));           
    }     
    
    initialState = {
        currentApplication: {id: null},
        operatorsListOpen: false,
    }

    state = {...this.initialState}

    

    changeApplStatus = async (applId, value) => {
        let application = await patchData('applications/' + applId, {status: value});
        this.props.dispatch(acUpdateApplication(application));
    }

    assignOperator = async (operator) => {
        const changes = {
            status: 2,
            operator: operator,
        };
        let application = await patchData('applications/' + this.state.currentApplication.id, changes);
        this.props.dispatch(acUpdateApplication(application));
        this.hideOperatorsList();
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
            <div>
                <button onClick={this.showApplicationFullInfo.bind(this, appl.id)}>Просмотреть полную информацию</button>
            </div>
            <div>
                {appl.status === 1 && (this.props.users.currentUser && this.props.users.currentUser.userProfile.type === 'operator') &&
                <button onClick={this.changeApplStatus.bind(this, appl.id, 2)}>Взять в работу</button>
        }
        {
        appl.status === 1 && (this.props.users.currentUser && this.props.users.currentUser.userProfile.type === 'admin') &&
                <button onClick={this.showOperatorsList.bind(this, appl.id)}>Передать в работу</button>
        }
            </div>
            <div>
                <button onClick={this.changeApplStatus.bind(this, appl.id, 3)}>Пометить как исполненную</button>
            </div>
            </div>
                </div>
            ))
        }
    }

    renderOperatorsList = () => {
        const operatorsList = this.props.users.list.filter(user => user.type === 'operator');
        return operatorsList.map(operator => (
            <div onClick={this.assignOperator.bind(this, operator)}>
                <div>
                    {`${operator.surname} ${operator.firstName} ${operator.LastName}`}
                </div>
            </div>
        ))
    }

    showApplicationFullInfo = async id => {
        let application = await getData('applications/' + id);
        this.props.dispatch(acUpdateApplication(application));
        this.props.dispatch(acSetCurrentApplication(application));
        this.props.history.push(`applications/${id}`);
    }

    hideOperatorsList = () => {
        this.setState({
            currentApplication: {id: null},
        operatorsListOpen: false,
        })
    }

    showOperatorsList = applId => {
        this.setState({
            currentApplication: {id: applId},
        operatorsListOpen: true,
        })
    }

    render () {
        
        

        return (
            (this.props.applications.loading || this.props.users.loading) && 
            (<div>Идет загрузка</div>) || 
            (
                <div>
            <div>
                <h2>Заявки клиентов</h2>
                {this.renderClientApplications()}
            </div>
            { this.state.operatorsListOpen && 
            <div class="operatorsListContainer">
                <div>
                    {this.renderOperatorsList()}
                </div>
                <div>
                    <button onClick={this.hideOperatorsList}>Отменить выбор оператора</button>
                </div>
            </div>
    }
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