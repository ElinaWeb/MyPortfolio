var myModule=(function(){

		 		var init =function(){
		 			 _setUpListners();
		 		};

		 		var _setUpListners=function(){
		 			$('#add-new-item').on('click',_showModal);
		 		}

		 		var _showModal=function(ev){
					$('#new-project-popup').bPopup({
						speed:100,
						transition:'slideDown',
						onClose: function(){
							this.find('.form')
							.trigger("reset");
						}
					});
					ev.preventDefault();
				}

				return{
					init: init
				};

		 	})();	

myModule.init();	
