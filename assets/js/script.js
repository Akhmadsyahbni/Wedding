// AOS
AOS.init()

lightbox.option({
	'alwaysShowNavOnTouchDevices': true,
	'wrapAround': true
})


// music
var music = ''
audio = document.querySelector('.audio')
if (music) {
	audio.src = music
}

// door mulai
function mulai()
{
	// back to top
	window.scrollTo(0, 0)

	 // Hilangkan tombol setelah pintu dibuka
	//  const button = document.getElementById("open-door-btn");
	//  if (button) {
	// 	 button.style.display = "none";
	//  }

	var audioDoor = document.getElementById('doorSound')
	audioDoor.play()

	var doorSection = $('#door-section')
	var doors = document.querySelectorAll('.door')
	doors.forEach(function (door, index) {
		var direction = (index === 0) ? -1 : 1
		door.style.transform = 'rotateY(' + (70 * direction) + 'deg)'
	})

	setTimeout(function() {
		// music
		audio.play()
		doorSection.css('transform', 'scale(6)')
	}, 600)

	setTimeout(function() {
		doorSection.css('opacity', 0)
		$('body').removeClass('overflow-hidden')
		$('body').addClass('transition')
		doorSection.css('display', 'none')
	}, 2000)
}

// button music
var isPlaying = true

function toggleMusic(event)
{
	event.preventDefault()

	const musicButton = document.getElementById('musicButton')
	const audioElement = document.querySelector('.audio')

	if (isPlaying) {
		musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>'
		musicButton.classList.remove('rotate')
		musicButton.style.transform = 'translateY(0)'
		audioElement.pause()
	} else {
		musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>'
		musicButton.classList.add('rotate')
		audioElement.play()
	}

	isPlaying = !isPlaying
}

// date counter
var countDownDate = new Date("Februari 9, 2025 09:00:00").getTime()

var x = setInterval(function() {
	var now = new Date().getTime()

	var distance = countDownDate - now

	var days = Math.floor(distance / (1000 * 60 * 60 * 24))
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
	var seconds = Math.floor((distance % (1000 * 60)) / 1000)

	document.getElementById('countdown-wedding').innerHTML = `
		<div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${days}</h5> Hari</div></div>
      	<div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${hours}</h5> Jam</div></div>
      	<div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${minutes}</h5> Menit</div></div>
      	<div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${seconds}</h5> Detik</div></div>
	`

	if (distance < 0) {
		clearInterval(x)
		document.getElementById('countdown-wedding').innerHTML = "<span class='text-center p-3 rounded text-light m-2'><h2>Sudah dimulai!</h2></span>"
	}
}, 1000)

// get url to pronoun and name
const urlParams = new URLSearchParams(window.location.search)
const pronoun = urlParams.get('p')
const name = urlParams.get('n')
const namaSambutan = document.querySelector('#namaSambutan')
namaSambutan.innerText = `${pronoun} ${name},`

// copy text
function copyText(el)
{
	var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim()

	var temp = document.createElement("textarea")
	document.body.appendChild(temp)
	temp.value = content.replace(/\s+/g, '')
	temp.select()
	document.execCommand("copy")
	document.body.removeChild(temp)

	jQuery(el).text('berhasil di copy')

	setTimeout(function() {
		jQuery(el).html(`<i class="fas fa-regular fa-copy"></i> Copy`)
	}, 1000)
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbwdDo47rBpCvTU8_O-Z9y-aP-G0LSPWIv6kYLQbSldriKxR6aAUabI6TBJ3p6G8Ac8soA/exec';
// const form = document.getElementById('Rsvp_Wedding');
const form = document.forms['Rsvp_Wedding'];

form.addEventListener('submit', e => {
  e.preventDefault();

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(() => {
      // Jika request berhasil
      Swal.fire({
        icon: "success",
        text: "Konfirmasi kehadiran Anda berhasil terkirim!"
      }).then(() => {
        // Reset form setelah alert ditutup
        form.reset();
      });
      console.log('Success!');
    })
    .catch(error => {
      // Jika request gagal
      Swal.fire({
        title: "Error!",
        text: `Terjadi kesalahan: ${error.message}`,
        icon: "error",
        button: "OK"
      });
      console.error('Error!', error.message);
    });
});




  
// const scriptURL = 'https://script.google.com/macros/s/AKfycbwdDo47rBpCvTU8_O-Z9y-aP-G0LSPWIv6kYLQbSldriKxR6aAUabI6TBJ3p6G8Ac8soA/exec';
// // const form = document.getElementById('Rsvp_Wedding');

// const form = document.forms['Rsvp_Wedding']

// form.addEventListener('submit', e => {
//   e.preventDefault()
//   fetch(scriptURL, { method: 'POST', body: new FormData(form)})
// 	.then(response => console.log('Success!', response))
// 	.catch(error => console.error('Error!', error.message))
// })