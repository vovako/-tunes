export const radioPlayerInit = () => {
	const radio = document.querySelector('.radio');
	const radioCoverImg = document.querySelector('.radio-cover__img');
	const radioNavigation = document.querySelector('.radio-navigation');
	const radioHeaderBig = document.querySelector('.radio-header__big');
	const radioItem = document.querySelectorAll('.radio-item');
	const radioStop = document.querySelector('.radio-stop');
	const radioVolume = document.querySelector('#volume-bar');
	const radioVolumeIcon = document.querySelector('#radio-volume-icon');
	
	const audio = new Audio();
	audio.type = 'audio/aac';
	radioStop.disabled = true;



	//функции
	const changeIconPlay = () => {
		if (audio.paused) {
			radio.classList.remove('play');
			radioStop.classList.remove('fa-stop');
			radioStop.classList.add('fa-play');
		} else {
			radio.classList.add('play');
			radioStop.classList.remove('fa-play');
			radioStop.classList.add('fa-stop');
		};
	};

	const changeIconVolume = () => {
		if (radioVolume.value >= 80) {
			radioVolumeIcon.classList.remove('fa-volume-down');
			radioVolumeIcon.classList.remove('fa-volume-off');
			radioVolumeIcon.classList.add('fa-volume-up');
		} else if (radioVolume.value <= 0) {
			radioVolumeIcon.classList.remove('fa-volume-down');
			radioVolumeIcon.classList.remove('fa-volume-up');
			radioVolumeIcon.classList.add('fa-volume-off');
		} else {
			radioVolumeIcon.classList.remove('fa-volume-up');
			radioVolumeIcon.classList.remove('fa-volume-off');
			radioVolumeIcon.classList.add('fa-volume-down');
		};
	};

	const selectItem = elem => {
		radioItem.forEach(item => item.classList.remove('select'));
		elem.classList.add('select');
	};



	//обработчики событий
	radioNavigation.addEventListener('change', event => {
		const target = event.target;
		const parrent = target.closest('.radio-item');
		selectItem(parrent);

		const title = parrent.querySelector('.radio-name').textContent;
		radioHeaderBig.textContent = title;

		const urlImg = parrent.querySelector('.radio-img').src;
		radioCoverImg.src = urlImg;

		audio.src = target.dataset.radioStantion;
		radioStop.disabled = false;

		audio.play();
		changeIconPlay();
	});

	radioStop.addEventListener('click', () => {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
		changeIconPlay();
	});

	radioVolume.addEventListener('input', () => {
		audio.volume = radioVolume.value / 100;
		changeIconVolume();
	});

};