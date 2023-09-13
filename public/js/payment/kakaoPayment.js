const paymentReady = {
  cid: 'TC0ONETIME',
  partner_order_id: 'partner_order_id',
  partner_user_id: 'partner_user_id',
  item_name: '초코파이',
  quantity: 1,
  total_amount: 2200,
  vat_amount: 200,
  tax_free_amount: 0,
  approval_url: 'https://developers.kakao.com/success',
  fail_url: 'https://developers.kakao.com/fail',
  cancel_url: 'https://developers.kakao.com/cancel',
};

document.getElementById('payment').addEventListener('click', function () {
  axios
    .post('https://kapi.kakao.com/v1/payment/ready', {
      headers: {
        Authorization: 'KakaoAK d9487d7ced79e4a06d870ac842acba1c',
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: paymentReady,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});
