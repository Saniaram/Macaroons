document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})
let loader = $(".loader-block");
$('#submit').click( function () {
    let order = $('#clientOrder');
    let name = $('#name');
    let number = $('#number');
    let flagError = false;
    $('.error__input').hide();
    $('.order__input').css('border-color', '#933043');
    if(!order.val()){
        order.next().show();
        order.css('border-color', 'red');
        flagError = true;
    }
    if(!name.val()){
        name.next().show();
        name.css('border-color', 'red');
        flagError = true;
    }
    if(!number.val()){
        number.next().show();
        number.css('border-color', 'red');
        flagError = true;
    }
    if(!flagError) {
        loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {product: order.val(), name: name.val(), phone: number.val() }
        })
            .done( function (message){
                loader.hide();
                if(message.success){
                $('.order__info').html('<div class="order__strawberry-bigger"><img src="images/strawberry_bigger.png" alt="strawberry_bigger"></div>' +
                    '<div class="order__thanks__text">Спасибо за Ваш заказ. Мы скоро свяжемся с Вами!</div>')
                }
                else
                {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
                // try {
                //     result = JSON.parse(http.responseText);
                // }catch (e) {}

            });
    }

})