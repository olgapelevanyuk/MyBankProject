import React from "react";
import "./Profile.css";

class UserProfile extends React.Component {
  render() {
    return (
      <div className="profile-page">
        <h1>Персональные данные:</h1>
        <div className="newOperatorRegistrationForm profile-form">
          <div>
            <label>Фамилия</label>
            <input type="text" value={"Сивец"} />
          </div>
          <div>
            <label>Имя</label>
            <input type="text" value={"Мария"} />
          </div>
          <div>
            <label>Отчество</label>
            <input type="text" value={"Александровна"} />
          </div>
          <div>
            <label>Логин</label>
            <input type="text" value={"maria.sivec"} />
          </div>
          <div>
            <label>Пароль</label>
            <input type="password" value={"123123"} />
          </div>
          <div>
            <label>Подтверждение пароля</label>
            <input type="password" />
          </div>
          <div>
            <button className={"active"}>Сохранить</button>
          </div>
        </div>
        <h1>Заявки:</h1>
        <table class="applListTable profile-table">
          <thead>
            <tr>
              <th class="applId">Номер</th>
              <th class="applDate">Дата</th>
              <th class="applTime">Время</th>
              <th>Заявитель</th>
              <th>Тип ошибки</th>
              <th>Исполнитель</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr class="applListItem">
              <td class="applId">2</td>
              <td class="applDate">4/24/2020</td>
              <td class="applTime">4:20:05 AM</td>
              <td>Сивец Мария Александровна</td>
              <td>Другое</td>
              <td>Пелеванюк Ольга Ивановна</td>
              <td>В работе</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserProfile;
