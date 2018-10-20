(() => {

	var socket = io('http://192.168.43.91:3000/');

	let rooms = [1,2,3,4,5];

	if (localStorage.getItem('name') != '') {
		$('input[name="name"]').val(localStorage.getItem('name'))
	}

	if (localStorage.getItem('room') != '') {
		$.each($('select[name="room"] option'), function(index, val) {
			if ($(val).attr('value') == localStorage.getItem('room')) {
				$(val).prop('selected', 'true');
			}
		});
	}

	let drawMessage = (data) => {
		let message = `
			<div class="message">
				<div class="user">${data.user}:</div>
				<div class="body">${data.message}</div>
			</div>`;

		$('.messages').append(message);

	}

	let scroll = () => {
		$(".messages").animate({
	  	scrollTop: $('.messages').height()
	  }, 1500);
	}


	$('#room-modal').modal();


	$('.login').on('submit', function(event) {
		event.preventDefault();

		localStorage.setItem('name', $('input[name="name"]').val());
		localStorage.setItem('room', $('select[name="room"]').val());

		let data = {
			room: $('select[name="room"]').val()
		};

		socket.emit('room', data);

		$('#room-modal').modal('hide');

		return false;
	});

	$('.send-message').on('submit', function(event) {
		event.preventDefault();
		
		socket.emit('send-message', {
			message:$('input[name="message"]').val(),
			room: localStorage.getItem('room'),
			user: localStorage.getItem('name')
		});

		$('input[name="message"]').val('');

		return false;
	});

	socket.on('message', function(data) {
	  drawMessage(data)
	  scroll();
	});

	


})()