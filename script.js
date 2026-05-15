const gallerySwiper = new Swiper('.gallery-swiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: false,
    speed: 400,
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    breakpoints: {
        325:  { slidesPerView: 1, spaceBetween: 16 },
        680:  { slidesPerView: 3, spaceBetween: 16 },
    }
});

$(document).ready(function() {
    $('.faq-item:first .faq-answer').show();

    $('.faq-question').on('click', function() {
        const $item = $(this).closest('.faq-item');
        const $answer = $item.find('.faq-answer');
        const $icon = $item.find('.faq-icon');



        // Переключаем текущий
        $item.toggleClass('active');
        $answer.slideToggle(200);

        // Меняем иконку
        $icon.text($item.hasClass('active') ? '−' : '+');
    });
});

$(document).ready(function() {
    // Маска для телефона
    $('#phone').on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = value.substring(1);
            }
            let formattedValue = '+7';
            if (value.length > 0) {
                formattedValue += ' (' + value.substring(0, 3);
            }
            if (value.length >= 3) {
                formattedValue += ') ' + value.substring(3, 6);
            }
            if (value.length >= 6) {
                formattedValue += '-' + value.substring(6, 8);
            }
            if (value.length >= 8) {
                formattedValue += '-' + value.substring(8, 10);
            }
            $(this).val(formattedValue);
        }
    });

    // Валидация и отправка формы
    $('#bookingForm').on('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        // Проверка имени
        const $firstName = $('#firstName');
        if ($firstName.val().trim().length < 2) {
            $firstName.addClass('error');
            isValid = false;
        } else {
            $firstName.removeClass('error');
        }

        // Проверка фамилии
        const $lastName = $('#lastName');
        if ($lastName.val().trim().length < 2) {
            $lastName.addClass('error');
            isValid = false;
        } else {
            $lastName.removeClass('error');
        }

        // Проверка email
        const $email = $('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test($email.val())) {
            $email.addClass('error');
            isValid = false;
        } else {
            $email.removeClass('error');
        }

        // Проверка телефона
        const $phone = $('#phone');
        const phoneDigits = $phone.val().replace(/\D/g, '');
        if (phoneDigits.length !== 11) {
            $phone.addClass('error');
            isValid = false;
        } else {
            $phone.removeClass('error');
        }

        // Если всё валидно - показываем попап
        if (isValid) {
            $('#successModal').addClass('active');
            $('body').css('overflow', 'hidden'); // Блокируем скролл
            $('#bookingForm')[0].reset(); // Очищаем форму
        }
    });

    // Убираем ошибку при вводе
    $('.form-input').on('input', function() {
        $(this).removeClass('error');
    });

    // Закрытие попапа
    $('#modalCloseBtn, .modal-overlay').on('click', function() {
        $('#successModal').removeClass('active');
        $('body').css('overflow', ''); // Возвращаем скролл
    });

    // Закрытие по Escape
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#successModal').hasClass('active')) {
            $('#successModal').removeClass('active');
            $('body').css('overflow', '');
        }
    });
});