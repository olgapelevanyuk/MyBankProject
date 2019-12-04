import React from 'react';
import { connect } from 'react-redux';
import { acApplicationsLoaded, APPLICATIONS_LOADING, acUpdateApplication, acSetCurrentApplication, USERS_LOADING, USERS_LOADED } from '../constants/actionTypes';
import { withRouter } from 'react-router-dom';
import { getData, patchData } from '../utils/utils';
import '../components/ApplicationList.css';
import NewOperatorRegistration from './NewOperatorRegistration';
class ApplicationList extends React.PureComponent {

    async componentDidMount() {
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
        currentApplication: { id: null },
        operatorsListOpen: false,
        newOperatorRegistrationOpen: false,
    }

    state = { ...this.initialState }

    showOperatorRegistration = () => {
        this.setState({
            newOperatorRegistrationOpen: true,
        })
    }

    hideOperatorRegistration = () => {
        this.setState({
            newOperatorRegistrationOpen: false,
        })
    }

    renderOperatorRegistration = () => {
        return (
            <div className={'newOperatorRegistrationContainer'}>
                <div>
                    <NewOperatorRegistration
                        close={this.hideOperatorRegistration}
                    />
                </div>
            </div>
        )
    }

    changeApplStatus = async (appl, status, user) => {
        const changes = {
            status: status,
            operator: user,
        }
        let application = await patchData('applications/' + appl.id, changes);
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
        const { list } = this.props.applications;
        if (!list.length) {
            return (
                <div>Заявок нет</div>
            )
        }
        else {
            return list.map(appl => (
                <tr onDoubleClick={this.showApplicationFullInfo.bind(this, appl.id)} key={appl.id} className="applListItem">
                    <td className={'applId'}>{appl.id}</td>
                    <td className={'applDate'}>{appl.date}</td>
                    <td className={'applTime'}>{appl.time}</td>
                    <td>{`${appl.clientSurname} ${appl.clientFirstName} ${appl.clientLastName}`}</td>
                    <td>{appl.topic}</td>
                    <td>
                        {appl.status === 1 && "Заявка получена банком"}
                        {appl.status === 2 && "Взята в работу"}
                        {appl.status === 3 && "Исполнена"}
                    </td>

                    <td>
                        
                            <button onClick={this.showApplicationFullInfo.bind(this, appl.id)}>Просмотреть полную информацию</button>
                        
                       
                            {appl.status === 1 && (this.props.users.currentUser.userProfile && this.props.users.currentUser.userProfile.type === 'operator') &&
                                <button onClick={this.changeApplStatus.bind(this, appl, 2, this.props.users.currentUser.userProfile)}>Взять в работу</button>
                            }
                            {
                                appl.status === 1 && (this.props.users.currentUser.userProfile && this.props.users.currentUser.userProfile.type === 'admin') &&
                                <button onClick={this.showOperatorsList.bind(this, appl.id)}>Передать в работу</button>
                            }
                       
                        
                            <button onClick={this.changeApplStatus.bind(this, appl.id, 3)}>Пометить как исполненную</button>
                        
                    </td>
                </tr>
            ))
        }
    }

    renderOperatorsList = () => {
        const operatorsList = this.props.users.list.filter(user => user.type === 'operator');
        return operatorsList.map(operator => (
            <div onClick={this.assignOperator.bind(this, operator)} key={operator.id}  className='operator'>
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
            currentApplication: { id: null },
            operatorsListOpen: false,
        })
    }

    showOperatorsList = applId => {
        this.setState({
            currentApplication: { id: applId },
            operatorsListOpen: true,
        })
    }

    render() {



        return (
            (this.props.applications.loading || this.props.users.loading) &&
            (<div>Идет загрузка</div>) ||
            (
                <div className={'applListMainContainer'}>
                    <div className={'applicationsContainer'}>
                        <h2>Заявки клиентов</h2>
                        <table className={'applListTable'}>
                            <thead>
                        <tr>
                            <th className={'applId'}>Номер</th> 
                            <th className={'applDate'}>Дата</th> 
                            <th className={'applTime'}>Время</th> 
                            <th>Содержание</th>  
                            <th>Тема</th>
                            <th>Статус</th> 
                            <th>Действия</th>
                             
                        </tr>
                        </thead>
                        <tbody>
                        {this.renderClientApplications()}
                        </tbody>
                        </table>
                    </div>
                    {this.state.operatorsListOpen &&
                        <div className="operatorsListContainer">
                            <div className='operatorsListContainer-wrap'>
                                <div>
                                    {this.renderOperatorsList()}
                                </div>
                                <div>
                                    <button onClick={this.hideOperatorsList} className='active'>Отменить выбор оператора</button>
                                </div>
                            </div>
                        </div>
                    }

                    {this.props.users.currentUser.userProfile && this.props.users.currentUser.userProfile.type === 'admin' && (
                        (this.state.newOperatorRegistrationOpen && this.renderOperatorRegistration()) ||
                        <div className={'addNewOperButton'}>
                        <button onClick={this.showOperatorRegistration}>
                            Добавить нового оператора
    </button>
    </div>)

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