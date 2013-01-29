var widgetVacancyButton = document.getElementById('widgetVacancyButton');
var widgetVacancyEmployment = document.getElementById('widgetVacancyEmployment');
var widgetVacancySchedule = document.getElementById('widgetVacancySchedule');
var widgetVacancyExperience = document.getElementById('widgetVacancyExperience');
var widgetVacancyText = document.getElementById('widgetVacancyText');
var widgetVacancyRequestScript = document.getElementById('widgetVacancyRequestScript');		
var widgetVacancyResponseDiv = document.getElementById('widgetVacancyResponseDiv');
var widgetVacancyCurrentPage = 0;

function widgetVacancy() { // запускаем виджет 			
			
	widgetVacancyButton.onclick = function() {
		widgetVacancyCurrentPage = 0;

		widgetVacancyRequest();
		return false;
	}
	widgetVacancyEmploymentRequest();
		
}		
widgetVacancy();		

function widgetVacancyEmploymentRequest(data) { // Выводим тип занятости в select#widgetVacancyEmployment 			
	
	var widgetVacancyHtml = '';
	
	if( !data ) {
		
		if(widgetVacancyRequestScript){						
			widgetVacancyRequestScript.parentNode.removeChild(widgetVacancyRequestScript);
		}
								
		widgetVacancyRequestScript = document.createElement('script');
		widgetVacancyRequestScript.id = 'widgetVacancyRequestScript';
		widgetVacancyRequestScript.src = 'http://api.hh.ru/1/json/employment/?callback=widgetVacancyEmploymentRequest';
		document.body.appendChild(widgetVacancyRequestScript);				
	} else {				
		var l = data.length;
		if (data.length ) {
			widgetVacancyHtml += '<option selected="selected">не учитывать</option>';
			for ( var i = 0; i < l; i++ ) {
				widgetVacancyHtml += '<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>';
			}
		}
		widgetVacancyEmployment.innerHTML = widgetVacancyHtml;
		widgetVacancyScheduleRequest(); 	
	}
}

function widgetVacancyScheduleRequest(data) { // Выводим график работ в select#widgetVacancyEmployment 			
	
	var widgetVacancyHtml = '';
	
	if( !data ) {
		
						
		if(widgetVacancyRequestScript){						
			widgetVacancyRequestScript.parentNode.removeChild(widgetVacancyRequestScript);
		}
								
		widgetVacancyRequestScript = document.createElement('script');
		widgetVacancyRequestScript.id = 'widgetVacancyRequestScript';
		widgetVacancyRequestScript.src = 'http://api.hh.ru/1/json/schedule/?callback=widgetVacancyScheduleRequest';
		document.body.appendChild(widgetVacancyRequestScript);				
	} else {				
		var l = data.length;
		if (data.length ) {
			widgetVacancyHtml += '<option selected="selected">не учитывать</option>';
			for ( var i = 0; i < l; i++ ) {
				widgetVacancyHtml += '<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>';
			}
		}
		widgetVacancySchedule.innerHTML = widgetVacancyHtml;
		widgetVacancyExperienceRequest();				
	}
}

function widgetVacancyExperienceRequest(data) { // Выводим опыт работы в select#widgetVacancyExperience 			
	
	var widgetVacancyHtml = '';
	
	if( !data ) {
							
		if(widgetVacancyRequestScript){						
			widgetVacancyRequestScript.parentNode.removeChild(widgetVacancyRequestScript);
		}
								
		widgetVacancyRequestScript = document.createElement('script');
		widgetVacancyRequestScript.id = 'widgetVacancyRequestScript';
		widgetVacancyRequestScript.src = 'http://api.hh.ru/1/json/experience/?callback=widgetVacancyExperienceRequest';
		document.body.appendChild(widgetVacancyRequestScript);				
	} else {				
		var l = data.length;
		if (data.length ) {
			widgetVacancyHtml += '<option selected="selected">не учитывать</option>';
			for ( var i = 0; i < l; i++ ) {
				widgetVacancyHtml += '<option value="'+data[i]['id']+'">'+data[i]['name']+'</option>';
			}
		}
		widgetVacancyExperience.innerHTML = widgetVacancyHtml;			
	}
}	
	
function widgetVacancyRequest() { // Запрос вакансий по данным пользователя	

	widgetVacancyResponseDiv.innerHTML = '';
			
	var widgetVacancyRequestData = '';
				
	if ( widgetVacancyText.value!='' ) {
		widgetVacancyRequestData += '&text='+widgetVacancyText.value;
	}
	
	if ( widgetVacancyEmployment.value!='' ) {				
		widgetVacancyRequestData += '&employment='+widgetVacancyEmployment.value;					
	}
	
	if ( widgetVacancySchedule.value!='' ) {				
		widgetVacancyRequestData += '&schedule='+widgetVacancySchedule.value;								
	}
	
	if ( widgetVacancyExperience.value!='' ) {
		widgetVacancyRequestData += '&experience='+widgetVacancyExperience.value;
	}		
				
	if(widgetVacancyRequestScript){						
		widgetVacancyRequestScript.parentNode.removeChild(widgetVacancyRequestScript);
	}		
				
	widgetVacancyRequestScript = document.createElement('script');
	widgetVacancyRequestScript.id = 'widgetVacancyRequestScript';
	widgetVacancyRequestScript.src = 'http://api.hh.ru/1/json/vacancy/search/?callback=widgetVacancyParseResponse&region=1'+widgetVacancyRequestData+'&page='+widgetVacancyCurrentPage;
	
	
	document.body.appendChild(widgetVacancyRequestScript);
	
}
	
function widgetVacancyParseResponse(data) { // Выводим ответ в div#widgetVacancyResponseDiv			
	
	var widgetVacancyResponseData = data;
	
	var widgetVacancyResponseHtml = '';
	var vacancies = data['vacancies'];
	var l = vacancies.length;
	
	var widgetVacancyCountPages = Math.floor(data['found'] / 20);
	
	if( l > 0) {
		widgetVacancyResponseHtml += '<p class="widgetVacancy__row"><b>Найдено</b>: '+data['found']+'</p>';
	
	
	
		widgetVacancyResponseHtml += '<table class="widgetVacancy__result">';
		
		widgetVacancyResponseHtml += '<tr><th>Логотип</th><th>Название компании</th><th>Название ваканси</th></tr>';
	
		for ( var i = 0; i < l; i++ ) {
			
			widgetVacancyResponseHtml += '<tr class="widgetVacancy__result__item">';
			widgetVacancyResponseHtml += '<td class="widgetVacancy__result__item__logo">';
			
			if(vacancies[i]['employer']['logos'] && vacancies[i]['employer']['logos']['links']){
				widgetVacancyResponseHtml += '<img class="widgetVacancy__result__item__company_img" src="'+vacancies[i]['employer']['logos']['links']['small']['href']+'" alt="" />';
			}
			
			widgetVacancyResponseHtml += '</td>'; 
			
			widgetVacancyResponseHtml += '<td>'+vacancies[i]['employer']['name']+'</td>';
			widgetVacancyResponseHtml += '<td><a onclick="widgetVacancyRequestMoreInfo(this.href);return false;" href="'+vacancies[i]['links']['self']['href']+'">'+vacancies[i]['name']+'</a></td>';
			widgetVacancyResponseHtml += '</tr>';
		}
	
		widgetVacancyResponseHtml += '</table>';
		if ( data['found'] > 20 ) {
			widgetVacancyResponseHtml += '<p class="widgetVacancy__row">'+(widgetVacancyCurrentPage+1)+' <b>стр. из</b> '+widgetVacancyCountPages+'</p>';
		}
		
		if ( data['found'] > 20 && widgetVacancyCurrentPage > 0 ){
			widgetVacancyResponseHtml += '<p class="widgetVacancy__row"><a href="#" style="margin-right:20px;" onclick="widgetVacancyCurrentPage--;widgetVacancyRequest();return false">Предыдущие</a>';
		}
		
		if ( data['found'] > 20 && widgetVacancyCurrentPage < widgetVacancyCountPages ){
			widgetVacancyResponseHtml += '<a href="#" onclick="widgetVacancyCurrentPage++;widgetVacancyRequest();return false">Следующие</a></p>';
		}
		
	}
	
	widgetVacancyResponseDiv.innerHTML = widgetVacancyResponseHtml;			
	
}

function widgetVacancyRequestMoreInfo(data_link) {
	if(widgetVacancyRequestScript){						
		widgetVacancyRequestScript.parentNode.removeChild(widgetVacancyRequestScript);
	}		
				
	widgetVacancyRequestScript = document.createElement('script');
	widgetVacancyRequestScript.id = 'widgetVacancyRequestScript';
	widgetVacancyRequestScript.src = data_link + '?callback=widgetVacancyRequestMoreInfoParseResponse';
	
	
	document.body.appendChild(widgetVacancyRequestScript);
}

function widgetVacancyRequestMoreInfoParseResponse(data) {  // выводим подробное описание вакансии в див div#widgetVacancyResponseDiv
	var widgetVacancyResponseData = data;
	
	var widgetVacancyResponseHtml = '';
	widgetVacancyResponseHtml += '<p class="widgetVacancy__row"><b>Компания</b>: '+data['employer']['name']+'</p>';
	
	widgetVacancyResponseHtml += '<p class="widgetVacancy__row"><b>Вакансия</b>: '+data['name']+'</p>';
	
	
	if ( data['employer']['logos'] ) {
		widgetVacancyResponseHtml += '<div class="widgetVacancy__companyLogo"><img src="'+data['employer']['logos']['links']['medium']['href']+'" alt="" /></div>';
	}
	
	
	if ( data['salary'] ) {
		widgetVacancyResponseHtml += '<p class="widgetVacancy__row"><b>Зарплата от</b>: '+data['salary']['from']+' <b>до</b> '+data['salary']['to']+' '+data['salary']['currency']['name']+'</p>';
	}
	
	widgetVacancyResponseHtml += '<p class="widgetVacancy__row"><b>График работы</b>: '+data['schedule']['name']+'</p>';
	
	widgetVacancyResponseHtml += '<p class="widgetVacancy__row"><b>Тип занятости</b>: '+data['employment']['name']+'</p>';
	
	widgetVacancyResponseHtml += '<p class="widgetVacancy__row"><b>Опыт работы</b>: '+data['experience']['name']+'</p>';
	
	widgetVacancyResponseHtml += '<p class="widgetVacancy__row"><b>Описание</b>:</p>';
	
	 widgetVacancyResponseHtml += '<div class="widgetVacancy__row">'+data['description']+'</div>';
	
	
	widgetVacancyResponseHtml += '<p class="widgetVacancy__row"><a onclick="widgetVacancyRequest(); return false" href="#">Посмотреть другие вакансии</a></p>';
	
	
	
	widgetVacancyResponseDiv.innerHTML = widgetVacancyResponseHtml;	
}
