var myModule=(function(){

		 		var init =function(){
		 			 _setUpListners();
		 			},

		 			
		 		_setUpListners=function(){
		 			$('form').on('keydown', '.has-error', _removeError); 
	    			$('form').on('reset', _clearForm);
	    			$('#Enter').on('click',function(){
		 				return _validateForm($('#loginForm'))
		 			});
		 		},

				_validateForm = function (form) { // Проверяет, чтобы все поля формы были не пустыми. Если пустые - вызывает тултипы	     				
	     				var elements = form.find('input, textarea').not('input[type="file"], input[type="hidden"]'),
	          			valid = true;
				      	$.each(elements, function(index, val) {
					        var element = $(val),
					            val = element.val(),
					            pos = element.attr('qtip-position');
					        if(val.length === 0){
					          	element.addClass('has-error');
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
				    form.find('input, textarea').trigger('hideTooltip'); // удаляем тултипы
				    form.find('.has-error').removeClass('has-error'); // удаляем красную подсветку
				    form.find('.error-mes, .success-mes').text('').hide(); // очищаем и прячем сообщения с сервера
			    },


				_createQtip = function (element, position) { // Создаёт тултипы
					// позиция тултипа
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
