import React from 'react';
import {connect} from 'react-redux';
import {acApplicationsLoaded, APPLICATIONS_LOADING, acSetCurrentApplication, acUpdateApplication} from '../constants/actionTypes';
import {withRouter} from 'react-router-dom';
import {getData, patchData} from '../utils/utils';

class Application extends React.PureComponent{
    async componentDidMount(){
        if(!this.props.applications.currentApplication){
            const applId = this.props.match.params.id;
            let application = await getData('applications/' + applId);
        this.props.dispatch(acSetCurrentApplication(application));   
    }         
    }   
    
    initialState = {
        currentApplication: {id: null},
        operatorsListOpen: false,
    }

    state = {...this.initialState}

    renderOperatorsList = () => {
        const operatorsList = this.props.users.list.filter(user => user.type === 'operator');
        return operatorsList.map(operator => (
            <div onClick={this.assignOperator.bind(this, operator)} key={operator.id}>
                <div>
                    {`${operator.surname} ${operator.firstName} ${operator.LastName}`}
                </div>
            </div>
        ))
    }

    assignOperator = async (operator) => {
        const changes = {
            status: 2,
            operator: operator,
        };
        let application = await patchData('applications/' + this.state.currentApplication.id, changes);
        this.props.dispatch(acUpdateApplication(application));
        this.props.dispatch(acSetCurrentApplication(application));
        this.hideOperatorsList();
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
    changeApplicationStatus = async (appl, status, user) => {
        const changes = {
            status: status,
            operator: user,
        };
        let application = await patchData('applications/' + appl.id, changes);
        this.props.dispatch(acUpdateApplication(application));
        this.props.dispatch(acSetCurrentApplication(application));
    }

    render () {
        const {applications:{
            currentApplication
        },
        users: {
            currentUser: {
                userProfile,
            }
        }
    } = this.props;
        
    
        return (
            (!currentApplication ||  !userProfile) && 
            <div>Идет загрузка</div> || 
            (
            <div>
                <h2>{`Заявка № ${currentApplication.id}`}</h2>
                <div>
                    <div>
                        <div>
                           Дата и время заявки 
                        </div>
                        <div>
                            <input disabled type="text" defaultValue={`${currentApplication.date} ${currentApplication.time}`}/>
                        </div>
                    </div>
                    <div>
                        <div>
                           Фамилия клиента 
                        </div>
                        <div>
                            <input disabled type="text" defaultValue={`${currentApplication.clientSurname}`}/>
                        </div>
                    </div>
                    <div>
                        <div>
                           Имя клиента 
                        </div>
                        <div>
                            <input disabled type="text" defaultValue={`${currentApplication.clientFirstName}`}/>
                        </div>
                    </div>
                    <div>
                        <div>
                           Отчество клиента 
                        </div>
                        <div>
                            <input disabled type="text" defaultValue={`${currentApplication.clientLastName}`}/>
                        </div>
                    </div>
                    <div>
                        <div>
                           Телефон клиента 
                        </div>
                        <div>
                            <input disabled type="text" defaultValue={`${currentApplication.clientPhone}`}/>
                        </div>
                    </div>
                    <div>
                        <div>
                           e-mail клиента 
                        </div>
                        <div>
                            <input disabled type="text" defaultValue={`${currentApplication.clientEMail}`}/>
                        </div>
                    </div>
                    <div>
                        <div>
                           Комментарий клиента 
                        </div>
                        <div>
                            <input disabled type="text" defaultValue={`${currentApplication.clientComment}`}/>
                        </div>
                    </div>
                    <div>
                        <div>
                           Тип заявки
                        </div>
                        <div>
                            <input disabled type="text" defaultValue={`${currentApplication.type}`}/>
                        </div>
                    </div>
                    <div>
                        <div>
                           Статус заявки
                        </div>
                        <div>
                            <input disabled type="text" defaultValue={`${currentApplication.status}`}/>
                        </div>
                    </div>
                   {currentApplication.operator && 
                    <div>
                        <div>
                           Оператор
                        </div>
                        <div>
                            <input disabled type="text" defaultValue={`${currentApplication.operator.surname} ${currentApplication.operator.firstName} ${currentApplication.operator.lastName}`}/>
                        </div>
                    </div>}
                </div>
                {currentApplication.status === 1 && userProfile.type === 'operator' &&
                <div>
                    <button onClick={this.changeApplicationStatus.bind(this, currentApplication, 2, userProfile)}>
                        Взять в работу
                    </button>
                </div>
    }
    {currentApplication.status === 1 && userProfile.type === 'admin' &&
                <div>
<button onClick={this.showOperatorsList.bind(this, currentApplication.id)}>
                        Передать в работу
                    </button>
                </div>
    }
    {
                <div>

                </div>
    }   
    { this.state.operatorsListOpen && 
            <div className="operatorsListContainer">
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
)(Application));