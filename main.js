$(document).ready(function(){

	$('input[name="phone"]').mask('+ 7 (999) 999 99 99');

	$('input, textarea').placeholder();

	function clear_form() {
		$("input[type='text']").val("");
	};

	var emailCount = 0;

	function email_validate(x) {
		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		if(pattern.test(x.val())){
			x.removeClass('error');
			emailCount=0;
		} 
		else if (x.val() == 0) {
			x.removeClass('error');
			emailCount=0;
		}
		else {
			x.addClass('error');
			emailCount=1;
		}
		console.log(emailCount);
	};

	$('input[name="email"]').blur(function() {
		email_validate($(this));
	});

	$('input[name="email"]').keypress(function(e){
		if(e.keyCode==13){
			email_validate($(this));
		}
	});

	$('input[name="phone"]').blur(function() {
		var phone =  $(this).val();
		var index =  phone.indexOf('_');
		if(phone.length >= 6 && index == -1) {
			$(this).removeClass('error');
		}
		else if (phone == 0) {
			$(this).removeClass('error');
		}
		else {
			$(this).addClass('error');
		}
	});

	$('.formSubmit').submit(function(){
		var name = $(this).find('input[name="name"]').val(); 
		var phone =  $(this).find('input[name="phone"]').val();
		var index =  phone.indexOf('_');
		var indexstring =  phone.indexOf('е');
		var email = $(this).find('input[name="email"]').val();
		var companyName = $(this).find('input[name="companyName"]').val();
		var formDate = $(this).find('input[name="date"]').val();
		var formType = $(this).find('select[name="type"]').val();
		var quantity = $(this).find('input[name="quantity"]').val();
		var location = $(this).find('input[name="location"]:checked').val();
		var distance = $(this).find('input[name="distance"]').val();
		var formName = $(this).find('input[name="hidden"]').val();
		if(phone.length >= 6 && index == -1 && emailCount == 0 && indexstring == -1) {
			$.ajax({
				type: "POST",
				url: "mail.php",
				data:{
					"name":name,
					"phone":phone,
					"email":email,
					"companyName":companyName,
					"formDate":formDate,
					"formType":formType,
					"quantity":quantity,
					"formName":formName
				},
				success: function() {
					clear_form();
					$('.modal').fadeOut();
					$('.modalThanks').fadeIn();
					$('input[name="name"], input[name="phone"]').removeClass('error');
				}
			});
		}
		else {
			$(this).find('input[name="phone"]').addClass('error');
		}
		return false;
	});

});

