import React from "react";
import "./Profile.css";

class Profile extends React.Component {
  render() {
    return (
      <div className="profile-page">
        <h2>Коэффициент эффективности: 12.4</h2>
        <h1>Персональные данные:</h1>
        <div className="newOperatorRegistrationForm profile-form">
          <div>
            <label>Фамилия</label>
            <input disabled type="text" value={"Пелеванюк"} />
          </div>
          <div>
            <label>Имя</label>
            <input disabled type="text" value={"Ольга"} />
          </div>
          <div>
            <label>Отчество</label>
            <input disabled type="text" value={"Ивановна"} />
          </div>
          <div>
            <label>Логин</label>
            <input disabled type="text" value={"olga.pelevanyk"} />
          </div>
          <div>
            <label>Категория</label>
            <input disabled type="text" value="III" />
          </div>
          <div>
            <label>Должность</label>
            <input disabled type="text" value="Оператор" />
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
        <table class="applListTable">
          <thead>
            <tr>
              <th class="applId">Номер</th>
              <th class="applDate">Дата</th>
              <th class="applTime">Время</th>
              <th>Заявитель</th>
              <th>Тип ошибки</th>
              <th>Исполнитель</th>
              <th>Статус</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            <tr class="applListItem">
              <td class="applId">1</td>
              <td class="applDate">4/24/2020</td>
              <td class="applTime">1:15:58 AM</td>
              <td>Прахоцкий Максим Геннадьевич</td>
              <td>Техническая</td>
              <td>Пелеванюк Ольга Ивановна</td>
              <td>В работе</td>
              <td>
                <div class="o-button application-control-btn">
                  Полная информация
                </div>
                <div class="o-button application-control-btn">
                  Пометить как исполненную
                </div>
              </td>
            </tr>
            <tr class="applListItem">
              <td class="applId">2</td>
              <td class="applDate">4/24/2020</td>
              <td class="applTime">4:20:05 AM</td>
              <td>Сивец Мария Александровна</td>
              <td>Другое</td>
              <td>Пелеванюк Ольга Ивановна</td>
              <td>В работе</td>
              <td>
                <div class="o-button application-control-btn">
                  Полная информация
                </div>
                <div class="o-button application-control-btn">
                  Пометить как исполненную
                </div>
              </td>
            </tr>
            <tr class="applListItem">
              <td class="applId">3</td>
              <td class="applDate">4/24/2020</td>
              <td class="applTime">4:24:57 AM</td>
              <td>Подгайский Егор Викторович</td>
              <td>Другое</td>
              <td>Пелеванюк Ольга Ивановна</td>
              <td>Исполнена</td>
              <td>
                <div class="o-button application-control-btn">
                  Полная информация
                </div>
              </td>
            </tr>
            <tr class="applListItem">
              <td class="applId">4</td>
              <td class="applDate">4/24/2020</td>
              <td class="applTime">4:27:38 AM</td>
              <td>Петров Петр Петрович</td>
              <td>Другое</td>
              <td>Пелеванюк Ольга Ивановна</td>
              <td>В работе</td>
              <td>
                <div class="o-button application-control-btn">
                  Полная информация
                </div>
                <div class="o-button application-control-btn">
                  Пометить как исполненную
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Profile;
