<? header('Content-Type: text/html; charset=utf-8');  ?>
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Поиск вакансии по городу Москва</title>
<link href="css/widgetVacancy.css" rel="stylesheet" />
</head>

<body>
<div class="widgetVacancy">
	<form method="post" action="">
		<p class="widgetVacancy__row">
			<label class="widgetVacancy__label" for="widgetVacancyText">Ключевые слова</label>
			<input id="widgetVacancyText" class="widgetVacancy__field" type="text" value="" />
		</p>
		<p class="widgetVacancy__row">
			<label class="widgetVacancy__label" for="widgetVacancyEmployment">Тип занятости</label>
			<select id="widgetVacancyEmployment" class="widgetVacancy__field">
				<option selected="selected">загрузка...</option>
			</select>
		</p>
		<p class="widgetVacancy__row">
			<label class="widgetVacancy__label" for="widgetVacancySchedule">График работы</label>
			<select id="widgetVacancySchedule" class="widgetVacancy__field">
				<option selected="selected">загрузка...</option>
			</select>
		</p>
		<p class="widgetVacancy__row">
			<label class="widgetVacancy__label" for="widgetVacancyExperience">Опыт работы</label>
			<select id="widgetVacancyExperience" class="widgetVacancy__field">
				<option selected="selected">загрузка...</option>
			</select>
		</p>
		<p class="widgetVacancy__row">
			<button id="widgetVacancyButton" class="widgetVacancy__button" type="submit">поиск</button>
		</p>
	</form>
	<div id="widgetVacancyResponseDiv"> </div>
</div>
<script src="js/widgetVacancy.js"></script>
</body>
</html>
