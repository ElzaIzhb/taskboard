    //массив адресов обоев
    let wallpaper = [
        {   "title" : "imagess",
            "image": [
                "https://catherineasquithgallery.com/uploads/posts/2021-02/1612858196_18-p-krasnii-fon-prirodi-46.jpg",
                "https://i.pinimg.com/originals/4c/b6/bc/4cb6bcbb863017f2f702e5fe07becaf1.jpg",
                "https://phonoteka.org/uploads/posts/2022-02/1644449611_47-phonoteka-org-p-fioletovii-fon-profilya-48.jpg",
                "https://images.wallpaperscraft.ru/image/single/gory_les_sumerki_138980_3840x2160.jpg",
                "https://img3.akspic.ru/attachments/crops/6/8/3/5/85386/85386-voda-liniya_gorizonta-gorod-gorodskoj_pejzazh-nebo-3840x2160.jpg",
                "https://mota.ru/upload/resize/1680/1050/upload/wallpapers/2022/03/14/16/00/79733/space-stars-galaxy-dark-background-7be.jpg",
                "https://i.pinimg.com/originals/22/19/90/2219906834db72dfd851a9301fa93730.jpg",
                "https://img2.akspic.ru/attachments/crops/2/7/2/8/88272/88272-voda-most-purpur-gorodskoj_pejzazh-otrazhenie-3840x2160.jpg",
                "https://catherineasquithgallery.com/uploads/posts/2021-12/1639743859_237-catherineasquithgallery-com-p-fon-lesa-rozovogo-431.jpg",
                "https://i.pinimg.com/originals/7b/76/b7/7b76b76d2c3c6b69bcf9c65e8d24210e.jpg",
            ]
        }
    ]

    //адрес юзера в телеграмм
    let chat_id = 1028368132;

    //создаем модель таскборда
    let data = localStorage.getItem('boards');
    console.log(data)

    //если нет сохраненного то выдаем стартовый объект
    if (data == null) {
        //перезаписываем data
        data = {
            "boards":[
                {
                    "title":"Новая доска",
                    "background": "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite11.jpg",
                    "columns":[
                        {
                            "title":"Новая колонка",
                            "cards":[]
                        }
                    ]
                }
            ]
        };
    } else {
        data = JSON.parse(data);
        if (data['boards'].length == 0) {
            //перезаписываем data
            data = {
                "boards":[
                    {
                        "title":"Новая доска",
                        "background": "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite11.jpg",
                        "columns":[
                            {
                                "title":"Новая колонка",
                                "cards":[]
                            }
                        ]
                    }
                ]
            };
        }
    }

    //номер текущий доски
    let currentBoardId = localStorage.getItem('current_board');


    if (currentBoardId == null || currentBoardId == "null")  {
        currentBoardId = 0;
    }
    console.log("currentBoardId " + currentBoardId);
    console.log(data);



    renderBoards();
    renderWallpapers();


    //запускаем рассыльщик через каждые 5 секунд
    setInterval(function(){
        sender();
   }, 5000)
    

    //функция сохранения
    function save() {

        //кодируем data в json
        let dataJson = JSON.stringify(data);

        //сохраняем в localStorage
        localStorage.setItem('boards',dataJson);

        //сохраняем номер текущей доски
        localStorage.setItem('current_board', currentBoardId);
    }

    //функция отрисовки досок
    function renderBoards() {



        //получаем шаблоны
        let tmpl_board = document.getElementById('tmpl-board').innerHTML;
        let tmpl_column = document.getElementById('tmpl-column').innerHTML;
        let tmpl_card = document.getElementById('tmpl-card').innerHTML;

        //находим контейнер под доски
        let container = document.getElementById('boards');

        //очищаем доски
        container.innerHTML = '';

        //в цикле подставляем данные в шаблоны (СОБИРАЕМ ДОСКИ)
        for (let i = 0; i < data['boards'].length; i++ ) {

            //если номер доски в списке не совпадает с номером текущей доски, то не рисуем её
            if (i != currentBoardId){
                continue;
            }

            //собираем html колонок доски  (СОБИРАЕМ КОЛОНКИ ДОСКИ)
            let boardColumns = '';
            for (let j = 0; j < data['boards'][i]['columns'].length; j++) { 

                //собираем html карточек колонки (СОБИРАЕМ КАРТОЧКИ КОЛОНКИ)
                let columnCards = '';
                for (let k = 0; k < data['boards'][i]['columns'][j]['cards'].length; k++) {

                    //html одной карточки
                    let cardHtml = tmpl_card.replace('${card_header}', data['boards'][i]['columns'][j]['cards'][k]['title'])
                                            .replace('${board_number}', i)                        
                                            .replace('${column_number}', j)
                                            .replace('${card_number}', k)
                                            .replace('${card_content}', data['boards'][i]['columns'][j]['cards'][k]['description'])  
                                            .replace('${card_notification}', data['boards'][i]['columns'][j]['cards'][k]['time'])
                                            .replace('${card_notification}', (data['boards'][i]['columns'][j]['cards'][k]['time'] != '') ? '&#x2709;' : '');
                    //добавляем готовый текст карточки к картокам КОЛОНКИ
                    columnCards += cardHtml;
                }

                //html одной колоночки
                let columnHtml = tmpl_column.replace('${column_header}',data['boards'][i]['columns'][j]['title'])
                                            .replace('${board_number}',i)
                                            .replace('${column_number}',j)
                                            .replace('${column_number}',j)
                                            .replace('${column_number}',j)
                                            .replace('${column_content}',columnCards);

                //добавляем готовый текст КОЛОНКИ к колонкам ДОСКИ
                boardColumns += columnHtml;

            }

            //подстваляем данные в шаблон доски и добавляем в контейнер
            container.innerHTML += tmpl_board.replace('${board_header}',data['boards'][i]['title'])
                                             .replace('${board_background}',data['boards'][i]['background']) 
                                             .replace('${board_number}',i) 
                                             .replace('${board_content}',boardColumns)
                                             .replace('${image}', data['boards'][i]['background']);
        }
        renderBoardsList();
    }

    //функция создания новой доски
    function boardAdd(){
        
        //сщздаём объект пустой доски
        let board = {
                        "title":"Новая доска",
                        "background": "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite11.jpg",
                        "columns":[
                            {
                                "title":"Новая колонка",
                                "cards":[]
                            }
                        ]
                    };

        //добавляем объект в модель
        data['boards'].push(board);

        //переключаемся на новую доску
        currentBoardId = data['boards'].length - 1;

        //отрисовка новой доски
        renderBoards();

        //сохранение модели
        save();
    }

    //функция переименования доски
    function boardRename() {

        let name = event.target.value;

        data['boards'][currentBoardId]['title'] = name;

        save();
        renderBoardsList();
    }

//----------------------------------------------------------------------------------------------------------
    //функция для удаления доски
    function boardDelete() {

        //спросить подтверждение
        let ok = confirm("Вы действительно хотите удалить доску " + data['boards'][currentBoardId]['title'] + "?");  //true / false

        if (ok) {

        //удаляем доску
        
        data['boards'].splice(currentBoardId, 1);
            
        //если была удалена последняя доска, то значение currentBoardId будет 
        //больше допустимого (индекс элемента за пределами массива),
        //в этом случае устанавливаем стартовое значение  currentBoardId = 0
        if (currentBoardId >=  data['boards'].length) {
            currentBoardId = 0;
        }    

        //сохраняем
        save();

        //если все доски удалены, то перезагружаем страницу. 
        //а при этом будет отрисована стартовая новая доска
        if (data['boards'].length == 0) {
            window.location.reload();
        } 

        //перерисовываем
        renderBoards();
        } 

    }
    //------------------------------------------------------------------------------------------------------
    //функция проверки какую функцию вызвать при нажатии на side-menu-item в меню boardList
    function whatFunction() {

        let num = event.target.closest('.side-menu-item').getAttribute('data-num');
        //если нажат крестик, то вызываем функцию удаления доски
        if(event.target == event.target.closest('.side-menu-item').querySelector('div:last-of-type')){
            boardListDelete(num);
        }else {
            //если нажат НЕ крестик, то вызываем функцию переключения досок
            changeBoard();
        }
    }
    //---------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------
    //функция для удаления доски из boarderList
    function boardListDelete(num) {

        //если номер удаляемой доски СОВПАДАЕТ с номером текущей доски, то вызываем функцию boardDelete()
        if (num == currentBoardId) { 
            boardDelete();
            renderBoardsList();
        }else {
            //спросить подтверждение
            let ok = confirm("Вы действительно хотите удалить доску " + data['boards'][num]['title'] + "?");  //true / false
                    
            if (ok) {
                //удаляем доску
                data['boards'].splice(num, 1);
               
                //если текущий номер МEНЬШЕ номера удалённой доски, то достаточно сохранить в localStorage и перерисовать boarderList
                if (currentBoardId < num) {
                    save();
                    renderBoardsList();
                }

                //если текущий номер БОЛЬШЕ номера удалённой доски, то 
                if (currentBoardId > num) {
                    //1. уменьшаем currentBoardId на единицу
                    currentBoardId--;

                    //2. сохраняем в localStorage
                    save();

                    //3. перерисовываем borderList и border
                    renderBoardsList();
                    renderBoards();
                }
            }
           
        }

    }
//--------------------------------------------------------------------------------------------------    

    //функция создания колонки
    function columnAdd(){

        //создаем пустую колонку
        let column = {
                        "title":"Новая колонка",
                        "cards":[]
                     }; 

        //добавляем колонку на доску
        data['boards'][currentBoardId]['columns'].push(column)  

        //вывести модель в консоль
        console.log(data);  

        //перерисовываем доски
        renderBoards();   

        save();     
        
    }

    //функция переименования колонки
    function columnRename(column_number) {

        //определяем содержимое инпута
        let name = event.target.value;

        //перезаписываем имя колонки в модели
        data['boards'][currentBoardId]['columns'][column_number]['title'] = name;

        //сохраняем
        save();
    }

    //функция для удаления колонок
    function columnDelete(column_number) {

        //спросить подтверждение
        let ok = confirm("Вы действительно хотите удалить колонку?");  //true / false

        if (ok) {

            //удаляем колонку из модели
            data['boards'][currentBoardId]['columns'].splice(column_number,1);

            //сохраняем
            save();

            //перерисовываем
            renderBoards();
        } 
        
    }

    //показать форму для заполнения названия и описания задачи
    function showAddCardForm(){
       
        let id_formCardAdd = event.target.closest('.column').querySelector('.formCardAdd');
     
        id_formCardAdd.style.display="block";
    }

    //функция добавления карточки(задачи)
    function cardAdd(board_number, column_number) {

        //создаем пустую карточку
        let card = {};

        //получить содержимое текстового поля
        let title = event.target.closest('.formCardAdd').querySelector('input').value;
        let description = event.target.closest('.formCardAdd').querySelector('textarea').value;
        let time = event.target.closest('.formCardAdd').querySelector('.card-time').value;

        //наполняем карточку полученными данными
        card['title'] = title;
        card['description'] = description;
        card['time'] = time;

        //добавить карточку в модель
        data['boards'][board_number]['columns'][column_number]['cards'].push(card);

        //вывести модель в консоль
        console.log(data);

        //перерисовываем доски
        renderBoards(); 

        save();
    }

    //функция удаления карточки
    function cardDelete(board_number, column_number, card_number) {

        //спросить подтверждение
        let ok = confirm("Вы действительно хотите удалить задачу?");  //true / false

        if (ok) {

            //удаляем колонку из модели
            data['boards'][board_number]['columns'][column_number]['cards'].splice(card_number,1);

            //сохраняем
            save();

            //перерисовываем
            renderBoards();
        } 

    }

    //отрисовка названий досок
    function renderBoardsList(){

         //находим контейнер для обоев  
         let container = document.getElementById('board-list');

         //находим шаблон для обоев
         let tmpl_board = document.getElementById('tmpl-board-line').innerHTML;

         //очистим контейнер
         container.innerHTML = "";

          //для каждой категории картинок
         for (let i = 0; i < data['boards'].length; i++){

            container.innerHTML += tmpl_board   .replace('${board_title}', data['boards'][i]['title'])
                                                .replace('${board_num}', i)
                                                .replace('${image}', data['boards'][i]['background']);
                                                                                  
             }
    }

    //отрисовываем картинки для выбора фона доски
    function renderWallpapers(){
        //находим контейнер для обоев  
            let wallpapersContainer = document.getElementById('wallpapers');

            //находим шаблон для обоев
            let templateWallpapers = document.getElementById('tmpl-wallpapers').innerHTML;

            //для каждой категории картинок
            for (let i = 0; i<wallpaper['image'].length; i++){

                //выводим картинки этой категории


                    wallpapersContainer.innerHTML += templateWallpapers .replace('${image}', wallpaper['image'][i])
                                                                        .replace('${image}', wallpaper['image'][i]);
                                                                                    

            }
            for (let j = 0; i<wallpaper['color'].length; j++){

                //выводим картинки этой категории


                    wallpapersContainer.innerHTML += templateWallpapers .replace('${color}', wallpaper['color'][j])
                                                                        .replace('${color}', wallpaper['color'][j]);
                                                                                    

            } 
    }

    //показываем/скрываем меню с обоями 
    function toggleWallpapaers(){

        //показать блок с обоями
        document.getElementById('changeBackground').classList.toggle('wallpapers-activ');
   
    }

    //показываем/скрываем меню с досками 
    function toggleBoardsList(){

        //показать блок с обоями
        document.getElementById('side-menu').classList.toggle('side-menu-activ');
    
    }

    //функция для замены обоев
    function boardChangeBackground() {

        //получаем ссылку на фон
        let background = event.target.getAttribute('attr-image');
    
        //обновляем фон в модели
        data['boards'][currentBoardId]['background'] = background;

        //сохраняем
        save();

        //перерисовываем
        renderBoards();

    }

    //функция переключения досок
    function changeBoard(){

        //определяем номер доски на котоую кликнули
        let num = event.target.closest('.side-menu-item').getAttribute('data-num');

        //меняем текущий номер доски
        currentBoardId = num;

        //перерисовываем доски с учётом номера текущей доски
        renderBoards();

        //закрываем меню с досками
        toggleBoardsList();

        save();
    } 
    

    //функция рассыльщика
    function sender(){

        //бежим по всем доскам в модели
        for (let i = 0; i < data['boards'].length; i++) {
            //бежим по всем колонкам доски
            for (let j = 0; j < data['boards'][i]['columns'].length; j++) {
                //бежим по всем задачам
                for (let k = 0; k < data['boards'][i]['columns'][j]['cards'].length; k++) {

                    //делаем рассылку задачи, если текущее время совпадает со временем задачи
                    if (data['boards'][i]['columns'][j]['cards'][k]['time'] != '') {
                
                        //получаем текущее время 
                        let now = new Date();
                        let dateNow = now.toLocaleDateString(); //получаем 07.12.2022
                        let timeNow = now.toLocaleTimeString().slice(0, -3); //получаем 20:15 (без секунд)

                        //и приводим его к такому же формату, как и time задачи (2022-12-07T20:15)
                        let dateNowFormatted = dateNow.substring(6) + "-" + dateNow.substring(3, 5) + "-" + dateNow.substring(0, 2) + "T" + timeNow;
                       
                        //далее сравниваем текущее время и время задачи
                        if (data['boards'][i]['columns'][j]['cards'][k]['time'] == dateNowFormatted){
                       
                            //если время совпало, то делаем отправку этой задачи в телеграмм
                            sendMessage(data['boards'][i]['columns'][j]['cards'][k]['title'], chat_id);

                            //ставим отметку, что уже отправялось, затирая время
                            data['boards'][i]['columns'][j]['cards'][k]['time'] = '';
                        } else {
                            console.log(data['boards'][i]['columns'][j]['cards'][k]['time'] + "------------" + dateNowFormatted);
                        }

 
                    }
                }
            }

        save();
        }
    }

    //функция для отправки сообщения
    function sendMessage(text, chat_id){

        //формируем адрес запроса
        let url = "https://api.telegram.org/bot5559440799:AAGmPpwU4j6JnaGWh-1YZFwV4r2fx-ar1EY/sendMessage?chat_id=" + chat_id + "&text=" + text;
        
        //отправляем запрос на этот адрес
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
    }