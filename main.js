// interactive JS: modal fake payment + meetup calculator + plan buttons
document.addEventListener('DOMContentLoaded', function(){
  // Plan subscribe buttons
  document.querySelectorAll('.plan-btn').forEach(function(b){
    b.addEventListener('click', function(){
      var plan = b.getAttribute('data-plan');
      var price = b.getAttribute('data-price');
      showFakeModal('You selected '+plan+' plan. Amount: ₹'+price+' (Demo)');
    });
  });

  var fakeModal = document.getElementById('fakeModal');
  var modalText = document.getElementById('modalText');
  var confirmPay = document.getElementById('confirmPay');
  var cancelPay = document.getElementById('cancelPay');
  var subscribeBtn = document.getElementById('subscribeBtn');

  function showFakeModal(text){
    modalText.textContent = text;
    fakeModal.style.display = 'flex';
  }
  subscribeBtn && subscribeBtn.addEventListener('click', function(){
    showFakeModal('Subscribe button clicked — choose a plan below or go to Plans page.');
  });

  confirmPay && confirmPay.addEventListener('click', function(){
    alert('Demo payment confirmed (fake). Thank you!');
    fakeModal.style.display='none';
  });
  cancelPay && cancelPay.addEventListener('click', function(){ fakeModal.style.display='none'; });

  // meetup page calc
  var locSelect = document.getElementById('locationSelect');
  var otherInput = document.getElementById('otherCityInput');
  var travelCost = document.getElementById('travelCost');
  var totalCost = document.getElementById('totalCost');
  var payable = document.getElementById('payable');
  var bookBtn = document.getElementById('bookBtn');

  function calc(){
    if(!locSelect) return;
    var loc = locSelect.value;
    var total=0;
    if(loc==='london'){
      total = 380;
      totalCost.textContent = '£' + total.toFixed(2);
      payable.textContent = '£' + (total*0.7).toFixed(2);
    } else {
      var v = parseFloat(travelCost.value || 0);
      total = v;
      totalCost.textContent = v ? v.toFixed(2) : '-';
      payable.textContent = v ? (v*0.7).toFixed(2) : '-';
    }
  }
  if(locSelect){
    locSelect.addEventListener('change', function(e){
      if(e.target.value==='other') otherInput.style.display='block';
      else otherInput.style.display='none';
      calc();
    });
  }
  if(travelCost) travelCost.addEventListener('input', calc);
  if(bookBtn){
    bookBtn.addEventListener('click', function(){
      var name = document.getElementById('fname').value || '';
      var contact = document.getElementById('contact').value || '';
      if(!name || !contact){ alert('Please enter name and contact'); return; }
      alert('Demo booking received for ' + name + '. Amount payable: ' + (document.getElementById('payable').textContent || '-') + '. (Demo)');
    });
  }
});