import data from './data.js';

$(document).ready(function() {
    $('.navbar-nav .nav-item').click(function() {
        $.each($('.navbar-nav .nav-item'), function(i, e) {
            $(e).removeClass('active');
        });
        $(this).addClass('active');
    });
    $('.nav-pills .nav-item').click(function() {
        $.each($('.nav-pills .nav-item'), function(i, e) {
            $(e).removeClass('active');
        });
        $(this).addClass('active');
    });

    function goTo(element) {
        $('html, body').animate({
                scrollTop: $(element).offset().top,
            },
            'slow'
        );
    }

    function gotoTop() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    }

    function switchPage(currPage, pages) {
        $.each(pages, function(index, page) {
            $(page).hide();
        });
        $(currPage).show();
    }

    let listPage = ['#members', '#home-content', '#detail-page', '#introduce', '#payment'];
    $('.home-btn').click(function() {
        switchPage('#home-content', listPage);
        gotoTop();
        changeHeader();
    });
    $('.member-btn').click(function() {
        switchPage('#members', listPage);
        gotoTop();
        changeHeader();
    });
    $('.introduce-btn').click(function() {
        switchPage('#introduce', listPage);
        gotoTop();
        changeHeader();
    });
    $('.products-btn').click(function() {
        switchPage('#home-content', listPage);
        goTo('#products');
        changeHeader();
    });

    // SEARCH
    $('.search-btn').click(function(event) {
        $('#search-modal').modal('show');
    });

    // FORM
    $('#regist-form, .sigin-up-submit').hide();

    $('.tabLogin-btn').click(function() {
        $('#regist-form, .sigin-up-submit').hide();

        $('.login-submit, #login-form').show();
    });

    $('.tabRegist-btn').click(function() {
        $('#login-form, .login-submit').hide();

        $('#regist-form, .sigin-up-submit').show();
    });

    // CHECK VALIDATE FORM
    function checkLoginName() {
        let name = $('#regist-name').val();
        let checkNameText = $('#text-regist-name');

        if (!name) {
            checkNameText.html('Vui lòng chọn tên đăng nhập!');
            return false;
        }
        let regexName = /^(?![0-9])[a-zA-Z0-9]{3,}$/;
        if (!regexName.test(name)) {
            checkNameText.html('Tên đăng nhập không hợp lệ, vui lòng nhập lại');
            return false;
        } else {
            checkNameText.html('');
            return true;
        }
    }

    function checkPassword() {
        let password = $('#regist-password').val();
        let checkPassText = $('#text-regist-pass');
        let strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
        if (strongPass.test(password)) {
            checkPassText
                .html('Mật khẩu mạnh')
                .addClass('text-success')
                .removeClass('text-danger');
            return true;
        } else {
            checkPassText
                .html(
                    'Mật khẩu yếu, ít nhất 1 chữ thường, 1 chữ hoa, 1 chữ sốt và 8 kí tự trở lên'
                )
                .addClass('text-danger')
                .removeClass('text-success');
        }
    }

    function checkReliable() {
        let reliablePass = $('#password-reliable').val();
        let password = $('#regist-password').val();
        if (reliablePass != password) {
            $('#text-regist-reliable').html(
                'Mật khẩu không trùng khớp, vui lòng nhập lại'
            );
            return false;
        } else {
            $('#text-regist-reliable').html('');
            return true;
        }
    }

    function checkName() {
        let name = $('#name').val();
        let regexName = /^([A-Z][a-z]*)(\s[A-Z][a-z]*)+$/;
        if (!regexName.test(name)) {
            $('#checkName').html('Họ tên không phù hợp!');
            return false;
        } else {
            $('#checkName').html('');
            return true;
        }
    }

    function checkAge() {
        let birthdate = new Date($('#birthdate').val());
        if (birthdate.getDate() == NaN) {
            $('#checkBirthdate').html('vui lòng chọn ngày tháng năm sinh!');
            return false;
        } else {
            $('#checkBirthdate').html('');
            return true;
        }
    }

    function checkEmail() {
        let email = $('#email').val();
        let regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexMail.test(email)) {
            $('#checkEmail').html('Email không hợp lệ');
            return false;
        } else {
            $('#checkEmail').html('');
            return true;
        }
    }

    function checkPhone() {
        let phone = $('#phone').val();
        let regexPhone = /^[0-9]{10}$/;
        if (!regexPhone.test(phone)) {
            $('#checkPhone').html('Số điện thoại không hợp lệ');
            return false;
        } else {
            $('#checkPhone').html('');
            return true;
        }
    }

    function checkAdrress() {
        let address = $('#address').val();
        let regexAdres = /^[a-zA-Z0-9\s,'-]*$/;
        if (!regexAdres.test(address)) {
            $('#checkAddress').html('Địa chỉ không hợp lệ');
            return false;
        } else {
            $('#checkAddress').html('');
            return true;
        }
    }

    function checkAgree() {
        let isAgree = $('#agree:checked').val();
        if (isAgree) {
            return true;
        } else return false;
    }

    //KIỂM TRA VÀ IN THÔNG TIN NGƯỜI ĐĂNG KÍ

    $('.login-btn').click(function() {
        $('#loginModal').modal();
        setInterval(() => {
            const signUpBtn = $('.sigin-up-submit');

            if (
                checkLoginName() &&
                checkPassword() &&
                checkReliable() &&
                checkName() &&
                checkAge() &&
                checkEmail() &&
                checkPhone() &&
                checkAdrress() &&
                checkAgree()
            ) {
                signUpBtn.prop('disabled', false);
                signUpBtn.css('pointer-events', 'auto');
            } else {
                signUpBtn.prop('disabled', true);
                signUpBtn.css('pointer-events', 'none');
            }
        }, 1000);
    });

    let stt = 3;
    $('.sigin-up-submit').click(function() {
        $('#loginModal').modal('hide');
        let username = $('#regist-name').val();
        let password = $('#regist-password').val();
        let name = $('#name').val();
        let email = $('#email').val();
        let phone = $('#phone').val();
        let address = $('#address').val();

        let user = {
            username: username,
            password: password,
            name: name
        }

        localStorage.setItem('user', JSON.stringify(user));

        let html = `
            <tr>
            <th scope="row">${stt}</th>
            <td>${name}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${address}</td>
            </tr>
        `;

        $('#print-info').append(html);
        ++stt;

        switchPage('#members', listPage);
        gotoTop();
        changeHeader();
    });



    // THAY ĐỔI HEADER
    function changeHeader() {
        if (window.scrollY >= 200) {
            $('.navbar').css('height', '50px');
            $('.navbar').css('background-color', 'rgba(63,114,175,0.9)');
            $('.navbar-brand').css({
                opacity: '0',
                display: 'none',
            });
            $('.navbar-nav').removeClass('ml-auto');
            $('.navbar-nav').css('margin', '0 auto');
        } else {
            $('.navbar').css('height', '96');
            $('.navbar').css('background-color', 'rgb(63, 114, 175)');
            $('.navbar-brand').css({
                opacity: '1',
                display: 'block',
            });
            $('.navbar-nav').css('margin-right', '0');
        }
    }
    window.addEventListener('scroll', changeHeader);

    // XỬ LÝ TRANG SẢN PHẨM
    let productsPerPage = 20;
    var totalPage = Math.ceil(data.length / productsPerPage);
    var currentPage = 1;

    // HÀM TÍNH SỐ TRANG
    function calcTotalPage(currenData) {
        return Math.ceil(currenData.length / productsPerPage);
    }
    // HÀM RENDER SẢN PHẨM
    function renderProductsHTML(data) {
        let res = data.map(
            (product) =>
            `
         <div class="m-3 product-item" id="${product.id}" value="${
                    product.type
                }">
            <div class="card product-card">
               <div class="discount-tag" style="display: ${
                   product.display
               };">-${product.intDiscount()}%</div>
               <div class="img-product-zoom">
                  <img src="${
                      product.img
                  }" alt="" class="card-img-top product-img">
               </div>
               <div class="card-body">
                  <div class="card-title">${product.title}</div>
                  <div class="text-center no-wrap"> 
                     <span class="pre-discount line-through mr-5" style="display: ${
                         product.display
                     };">${product.preDiscountInner}</span>
                     <span class="after-discount text-main">${product.afterDiscountInner()}</span>
                  </div>
               </div>
            </div>
         </div>
        `
        );

        $('#all-product-list').html(res);
    }

    //HÀM LỌC SẢN PHẨM
    function filterProductByType(products, type) {
        if (type == 'all') return products;
        return products.filter((product) => product.type == type);
    }

    function filterProductByPrice(data, min, max) {
        if (isNaN(min)) min = 0;
        if (isNaN(max)) max = 40000000;
        return data.filter(
            (product) =>
            product.afterDiscount() >= min && product.afterDiscount() <= max
        );
    }

    // HÀM SẮP XẾP SẢN PHẨM
    function sortProductsByPrice(products, ascending = true) {
        function quicksort(arr, left, right) {
            if (left >= right) {
                return;
            }

            let pivot = arr[Math.floor((left + right) / 2)].afterDiscount();
            let i = left;
            let j = right;

            while (i <= j) {
                while (arr[i].afterDiscount() < pivot) {
                    i++;
                }
                while (arr[j].afterDiscount() > pivot) {
                    j--;
                }
                if (i <= j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    i++;
                    j--;
                }
            }

            quicksort(arr, left, j);
            quicksort(arr, i, right);
        }

        let arr = [...products];
        quicksort(arr, 0, arr.length - 1);

        if (!ascending) {
            arr.reverse();
        }

        return arr;
    }

    // HÀM RENDER SẢN PHẨM CHO TRANG HIỆN TẠI
    function renderProductsPage(products, page) {
        let startIndex = (page - 1) * productsPerPage;
        let endIndex = startIndex + productsPerPage;

        let productsToRender = products.slice(startIndex, endIndex);

        renderProductsHTML(productsToRender);
        addEventChooseItem(productsToRender);
    }
    // THÊM SỰ KIỆN CLICK CHO PAGINATION MỚI
    function addEventChoosePage() {
        $('.page-item').click(function() {
            let currentPageItem = $(this);
            let value = parseInt(currentPageItem.prop('value'));
            if (!isNaN(value)) {
                currentPage = value;
                $('.page-item').removeClass('active');
                currentPageItem.addClass('active');
                renderProductsPage(currenData, currentPage);
            }
        });
    }
    // HÀM TẠO PAGINATION THEO TỔNG SỐ SẢN PHẨM HIỆN TẠI
    function renderListPage(totalPage) {
        let listPage = [];
        listPage.push(
            '<li class="page-item active" value="1"><a href="#products" class="page-link bg-primary text-txtcolor text-md">1</a></li>'
        );
        for (let i = 2; i <= totalPage; i++) {
            let newBtn = `
                <li class="page-item" value="${i}"><a href="#products" class="page-link bg-primary text-txtcolor text-md">${i}</a></li>
                `;
            listPage.push(newBtn);
        }

        $('.pagination').html(listPage);
        addEventChoosePage();
    }

    //THỰC HIỆN LOAD LẦN ĐẦU
    renderListPage(totalPage);
    renderProductsPage(data, currentPage);

    let currenData = data;
    $('.fillter').click(function() {
        currenData = filterProductByType(data, this.id);
        totalPage = calcTotalPage(currenData);
        renderListPage(totalPage);
        renderProductsPage(currenData, 1);
        sortProduct(currenData);
    });

    $('#fillByPriceBtn').click(function() {
        let temp = currenData;
        let minPrice = parseInt($('#minPrice').val());
        let maxPrice = parseInt($('#maxPrice').val());
        currenData = filterProductByPrice(currenData, minPrice, maxPrice);
        totalPage = calcTotalPage(currenData);
        renderListPage(totalPage);
        renderProductsPage(currenData, 1);
        sortProduct(currenData);
        currenData = temp;
    });

    function sortProduct(currenData) {

        $('#sortPrdBtn').click(function() {
            let optionSort = parseInt($('#sort-product').val());

            switch (optionSort) {
                case 0:
                    currenData = sortProductsByPrice(currenData);
                    renderListPage(totalPage);
                    currentPage = 1;
                    renderProductsPage(currenData, currentPage);
                    sortProduct(currenData);
                    break;
                case 1:
                    currenData = sortProductsByPrice(currenData, false);
                    renderListPage(totalPage);
                    currentPage = 1;
                    renderProductsPage(currenData, currentPage);
                    sortProduct(currenData);
                    break;
            }
        });
    }


    // RENDER CHI TIẾT SẢN PHẨM
    let listItemPay = [];

    function renderDetailItem(item) {

        let pageItem = `
        <div class="btn d-flex align-items-center ml-5 back-btn">
            <i class="ti-arrow-left text-md"></i>
            <span class="text-md ml-3">Trở lại</span>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-5 col-sm-12 px-4">
                    <img src="${
                        item.img
                    }" class="img-fluid detail-img"  style="object-fit: cover; width: 100%;" alt="">
              
                </div>
           <div class="col-lg-6 col-md-7 col-sm-12 pl-4">
  
              <h1 class="detail-title">${item.title}</h1>
              <div class="detail-price">${item.afterDiscountInner()}</div>
  
              <div class="detail-discount mt-3">
                 <div class="text-md">Khuyến mãi áp dụng: </div>
                 <div class="text-md ml-5 text-main">${item.intDiscount()}%</div>
              </div>
  
              <div class="detail-cart mt-5">
                 <button class="btn desc-quantity"><i class="ti-minus"></i></button>
                 <input value="1" type="text" name="" id="" class="text-md ml-0 detail-quantity">
                 <button class="btn ml-0 asc-quantity"><i class="ti-plus"></i></button>
                 <button class="btn text-uppercase ml-5 add-to-cart">Thêm vào giỏ hàng</button>
              </div>   
  
              <div class="detail-buy mt-5">
                 <button class="btn buy-btn">
                    <span class="text-big">Mua ngay</span>
                    <span class="text-sm">Gọi điện và xác nhận giao hàng tận nơi</span>
                 </button>
              </div>
  
              <div class="detail-share mt-5">
                 <span class="text-md text-txtcolor text-uppercase">Chia sẻ: </span>
                 <a href="#"><img class="ml-3" height="30" src="./Images/social/facebook-icon.png" alt=""></a>
                 <a href="#"><img class="ml-3" height="34" src="./Images/social/logo-instagram-5.jpg" alt=""></a>
              </div>
  
              <div class="detail-support mt-3">
                 <span class="text-big">Bạn cần hỗ trợ</span>
                 <a href="#" class="sp-mess ml-5 mt-4">
                    <img src="./Images/social/877514_media_512x512.png" height="33" alt="">
                    <span class="text-md ml-3">Liên hệ qua facebook</span>
                 </a>
                 <a href="#" class="sp-zalo ml-5 mt-4">
                    <img src="./Images/social/download.png"height="33" alt="">
                    <span class="text-md ml-3">Liên hệ qua Zalo</span>
                 </a>
              </div>
  
           </div>
        </div>
     </div>
        `;

        $('#detail-page').html(pageItem);



        $('.desc-quantity').click(function() {
            changQuantity(false);
        })
        $('.asc-quantity').click(function() {
            changQuantity(true);
        })

        $('.back-btn').click(function() {
            switchPage('#home-content', listPage);
            goTo('#products');
        });

        $('button.add-to-cart').click(function() {

            let quantity = parseInt($('.detail-quantity').val());
            addtoCart(item, quantity);
            item.hasInCart = true;

        })

        $('.buy-btn').click(function() {
            let quantity = parseInt($('.detail-quantity').val());
            $('#list-pay').html(`
                <tr>
                    <td>${item.title}</td>
                    <td>${item.afterDiscountInner()}</td>
                    <td>${quantity}</td>
                </tr>
            `);
            let sumToPay = (item.afterDiscount() * quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            $('.sumToPay').html(sumToPay + " đ");
            switchPage('#payment', listPage);
            gotoTop();
        })

    }

    function addtoCart(productItem, quantity) {
        if (!productItem.hasInCart) {
            let html = `
            <div class="dropdown-item cart-item item-${productItem.id} rounded">
                <img height="65" class="rounded" src="${productItem.img}" alt="">
    
                <div class="cart-item-title">
                    <h4 class="float-left mb-1">${productItem.title}</h4><br>
                    <span class="d-block float-left">Phân loại: ${productItem.typeVN}</span>
                </div>
    
                <div class="cart-item-pay ml-auto">
                    <span class="text-main">${productItem.afterDiscountInner()}</span>
                    <span>x</span>
                    <span class="item-quantity-${productItem.id}">${quantity}</span>
                    <br>
                    <button class="btn border-0 text-main delete-item-${productItem.id}">Xoá</button>
                </div>
            </div>
            `
            $('.inner-cart').append(html);
            $('.dropdown-item.figure').hide();
            let numitemInCart = parseInt($('.num-item-in-cart').text());
            ++numitemInCart;
            $('.num-item-in-cart').html(numitemInCart);
            listItemPay.push([productItem, quantity]);
            deleteItemCartHandle(productItem);

        } else {

            let currQuantity = parseInt($(`.item-quantity-${productItem.id}`).text());
            currQuantity += quantity;
            $(`.item-quantity-${productItem.id}`).html(currQuantity);

            let pointer = listItemPay.filter(item => {

                return item[0].id == productItem.id;
            });
            console.log(pointer);
            let index = listItemPay.indexOf(pointer[0]);
            listItemPay[index][1] = currQuantity;
        }

    }

    function deleteItemCartHandle(productItem) {
        $(`.delete-item-${productItem.id}`).click(function(e) {
            e.preventDefault();
            $(`.item-${productItem.id}`).remove();
            let numitemInCart = parseInt($('.num-item-in-cart').text());
            --numitemInCart;
            if (numitemInCart === 0) {
                $('.dropdown-item.figure').show();
            }
            $(`.num-item-in-cart`).html(numitemInCart);
            productItem.hasInCart = false;
            listItemPay = listItemPay.filter(item => item[0].id !== productItem.id);
        })
    }

    function createListPay(listItemPay) {
        let html = [];
        for (let i = 0; i < listItemPay.length; ++i) {

            html.push(
                `
                    <tr>
                        <td>${listItemPay[i][0].title}</td>
                        <td>${listItemPay[i][0].afterDiscountInner()}</td>
                        <td>${listItemPay[i][1]}</td>
                     </tr>
                `
            )
        }
        $('#list-pay').html(html.join(''));
    }
    $('.pay-btn').click(function(e) {
        e.preventDefault();
        let sum = 0;
        createListPay(listItemPay);
        switchPage('#payment', listPage);
        for (let i = 0; i < listItemPay.length; ++i) {
            sum += listItemPay[i][0].afterDiscount() * listItemPay[i][1];
            console.log(sum);
        }

        let sumToPay = sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        $('.sumToPay').html(sumToPay + " đ");

        gotoTop();

    })


    function changQuantity(asc = true) {
        let quantity = parseInt($('.detail-quantity').val());
        if (asc == false) {
            if (quantity == 1) {
                return;
            } else {
                --quantity;
                $('.detail-quantity').val(quantity);
            }
        } else {
            ++quantity;
            $('.detail-quantity').val(quantity);
        }
    }

    function addEventChooseItem(Items) {
        $('.product-item').click(function() {
            let itemIdTargeting = parseInt($(this).prop('id'));
            let itemTargeting = Items.filter(
                (item) => item.id == itemIdTargeting
            );
            switchPage('#detail-page', listPage);
            renderDetailItem(itemTargeting[0]);
            gotoTop();
        });
    }

    // XỬ LÝ ĐĂNG NHẬP
    $('.log-out-btn').click(function() {
        $('.dropdown.avt').hide();
        $('.nav-item.login').show();
    })

    $('.login-submit').click(function() {
        let user = JSON.parse(localStorage.getItem('user'));
        let usernameLogin = $('#login-input').val();
        let passwordLogin = $('#login-input-password').val();

        if (usernameLogin == user.username && passwordLogin == user.password) {

            $('#loginModal').modal('hide');
            $('.user-name').html(user.name);
            $('.nav-item.login').hide();
            $('.nav-item.avt').show();

        } else if (usernameLogin == user.username && passwordLogin != user.password) {

            $('.info-login-password').html('Mật khẩu không chính xác');
            $('.info-login-input').html('');

        } else if (usernameLogin != user.username || !user.username) {

            $('.info-login-input').html('Tài khoản không tồn tại');

        }
    })

});