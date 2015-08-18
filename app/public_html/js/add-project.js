var myModule=(function(){

		 		var init =function(){
		 			 _setUpListners();
		 			},

		 			
		 		_setUpListners=function(){
		 			$('#add-new-item').on('click',_showModal);
		 			$('#new-project-button').on('click',function(){
		 				_validateForm($('#new-project-popup'))		 						
		 			});

		 			$('form').on('keydown', '.has-error', _removeError); 
	    			$('form').on('reset', _clearForm);
	    			$('#fileupload').on('change', _changefileUpload); 
		 		},
		 		_showModal=function(ev){
					$('#new-project-popup').bPopup({
						speed:100,
						positionStyle: 'fixed',
						transition:'slideDown',
						onClose: function(){
							this.find('.form')
							.trigger("reset");
						}
					});
					ev.preventDefault();
				},

				_validateForm = function (form) { // Проверяет, чтобы все поля формы были не пустыми. Если пустые - вызывает тултипы
	     				console.log('Проверяем форму');
	     				var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
	          			valid = true;
	          			console.log(elements)
				      	$.each(elements, function(index, val) {
					        var element = $(val),
					            val = element.val(),
					            pos = element.attr('qtip-position');
					        if(val.length === 0){
					          	element.addClass('has-error');
					          	console.log('Есть ошибка')
					          	_createQtip(element, pos);
					          	valid = false;
					        }

				      	}); 
	      				return valid;
     				 },


		    	_removeError = function() { 
			     	$(this).removeClass('has-error');
			    },
			    _clearForm = function(form) {
			    	console.log('Очищаем форму');
				    var form = $(this);
				    form.find('.input, .textarea').trigger('hideTooltip'); // удаляем тултипы
				    form.find('.has-error').removeClass('has-error'); // удаляем красную подсветку
				    form.find('.error-mes, success-mes').text('').hide(); // очищаем и прячем сообщения с сервера
			    },
				_changefileUpload = function (){
						var input = $(this), // инпут type="file"
								name = input[0].files[0].name; // имя загруженного файла
						$('#filename')
							.val(name) // 
							.trigger('hideTooltip')
							.removeClass('has-error'); 
					};

				_createQtip = function (element, position) { // Создаёт тултипы
					// позиция тултипа
					console.log('создаем тултипы')
					if (position === 'right') {
 						position = {
					        my: 'left center',
					        at: 'right center'
					        }
					    }else{
					        position = {
					          	my: 'right center',
					          	at: 'left center',
					          	adjust: {
					            method: 'shift none'
					        }
					    }
					}

					// инициализация тултипа
					element.qtip({
					    content: {
					       	text: function() {
					        	return $(this).attr('qtip-content');
					        }
					    },
					    show: {
					        event: 'show'
					    },
					   	hide: {
					        event: 'keydown hideTooltip'
					    },
					   	position: position,
					    style: {
					        classes: 'qtip-mystyle qtip-rounded',
					        tip: {
					        	height: 10,
					            width: 16
					        }
					    }
					}).trigger('show');
				};					       

				return{
					init: init
							
				};

		 	})();	

myModule.init();	
