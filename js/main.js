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
                    "background": "https://i.pinimg.com/originals/4c/b6/bc/4cb6bcbb863017f2f702e5fe07becaf1.jpg",
                    "columns":[
                        {
                            "title":"Новая колонка",
                            "cards":[

                            ]
                        }
                    ]
                }
            ]
        };
    } else {
        data = JSON.parse(data);
    }

    console.log(data);

    renderBoards();

    //функция сохранения
    function save() {

        //кодируем data в json
        let dataJson = JSON.stringify(data);

        //сохраняем в localStorage
        localStorage.setItem('boards',dataJson);
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


            //собираем html колонок доски  (СОБИРАЕМ КОЛОНКИ ДОСКИ)
            let boardColumns = '';
            for (let j = 0; j < data['boards'][i]['columns'].length; j++) { 


                //собираем html карточек колонки (СОБИРАЕМ КАРТОЧКИ КОЛОНКИ)
                let columnCards = '';
                for (let k = 0; k < data['boards'][i]['columns'][j]['cards'].length; k++) {

                    //html одной карточки
                    let cardHtml = tmpl_card.replace('${card_header}',data['boards'][i]['columns'][j]['cards'][k]['title'])
                                            .replace('${board_number}',i)                        
                                            .replace('${column_number}',j)
                                            .replace('${card_number}',k)
                                            .replace('${card_content}',data['boards'][i]['columns'][j]['cards'][k]['description']);   

                    //добавляем готовый текст карточки к картокам КОЛОНКИ
                    columnCards += cardHtml;

                }

                //html одной колоночки
                let columnHtml = tmpl_column.replace('${column_header}',data['boards'][i]['columns'][j]['title'])
                                            .replace('${board_number}',i)
                                            .replace('${board_number}',i)
                                            .replace('${board_number}',i)
                                            .replace('${board_number}',i)
                                            .replace('${board_number}',i)
                                            .replace('${board_number}',i)
                                            .replace('${board_number}',i)
                                            .replace('${column_number}',j)
                                            .replace('${column_number}',j)
                                            .replace('${column_number}',j)
                                            .replace('${column_number}',j)
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
                                            .replace('${board_background}',data['boards'][i]['background']) 
                                            .replace('${board_number}',i) 
                                            .replace('${board_number}',i) 
                                            .replace('${board_number}',i)
                                            .replace('${board_number}',i)
                                            .replace('${board_content}',boardColumns);
        }


    }

    //функция переименования доски
    function boardRename(board_number) {

        let name = event.target.value;

        data['boards'][board_number]['title'] = name;

        save();
    }

    //функция создания колонки
    function columnAdd(board_number){

        //создаем пустую колонку
        let column = {
                        "title":"Новая колонка",
                        "cards":[]
                    }; 

        //добавляем колонку на доску
        data['boards'][board_number]['columns'].push(column)  

        //вывести модель в консоль
        console.log(data);  

        //перерисовываем доски
        renderBoards();   

        save();     
        
    }

    //функция переименования колонки
    function columnRename(board_number, column_number) {

        //определяем содержимое инпута
        let name = event.target.value;

        //перезаписываем имя колонки в модели
        data['boards'][board_number]['columns'][column_number]['title'] = name;

        //сохраняем
        save();
    }

    //функция для удаления колонок
    function columnDelete(board_number, column_number) {

        //спросить подтверждение
        let ok = confirm("Вы действительно хотите удалить колонку?");  //true / false

        if (ok) {

            //удаляем колонку из модели
            data['boards'][board_number]['columns'].splice(column_number,1);

            //сохраняем
            save();

            //перерисовываем
            renderBoards();
        } 
    }

    function showAddCardForm(board_number, column_number){
        //форму для заполнения названия и описания задачи

        let id_formCardAdd = "formCardAdd_" + board_number + "_" + column_number;
        
        document.getElementById(id_formCardAdd).style.display="block";

    }

    //функция добавления карточки(задачи)
    function cardAdd(board_number, column_number) {

        //создаем пустую карточку
        let card = {};

        //получить содержимое текстового поля
        let id_title = "card-title_" + board_number + "_" + column_number;
        let id_description = "card-description_" + board_number + "_" + column_number;
        let title = document.getElementById(id_title).value;
        let description = document.getElementById(id_description).value;

        //наполняем карточку полученными данными
        card['title'] = title;
        card['description'] = description;

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

    //отрисовываем картинки для выбора фона доски 
    function showWallpapaers(board_number){
        //находим контейнер для обоев  
        let wallpapersContainer = document.getElementById('wallpapers');
        //находим шаблон для обоев
        let templateWallpapers = document.getElementById('tmpl-wallpapers').innerHTML;
        //показать блок с 
        document.getElementById('changeBackground').style.right = "0";
        //для каждой категории картинок
        for (let i = 0; i<wallpaper.length; i++){
            //выводим картинки этой категории
            for (let j = 0; j<wallpaper[i]['image'].length; j++){
                wallpapersContainer.innerHTML += templateWallpapers .replace('${image}', wallpaper[i]['image'][j])
                                                                    .replace('${image}', wallpaper[i]['image'][j])
                                                                    .replace('${board_number}', board_number)
                                                                    .replace('${wallpaper_number}', i)
                                                                    .replace('${image_number}', j);               
            }
        }
    }

    //закрываем меню с обоями
    function wallpapersDelete(){
        let wallpapersContainer = document.getElementById('wallpapers');
        wallpapersContainer.innerHTML = "";
        document.getElementById('changeBackground').style.right = "-400px";
    }

    //функция для замены обоев
    function boardChangeBackground(board_number, wallpaper_number, image_number) {

        //получаем ссылку на фон
        let background = wallpaper[wallpaper_number]['image'][image_number];
        //обновляем фон в модели
        data['boards'][board_number]['background'] = background;

        //сохраняем
        save();

        //перерисовываем
        renderBoards();

    }