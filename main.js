// Main interactions: fake payment modal + meetup calc + plan buttons
document.addEventListener('DOMContentLoaded', function(){
  // Plan buttons open modal
  document.querySelectorAll('.plan-btn').forEach(function(b){
    b.addEventListener('click', function(){
      var plan = b.getAttribute('data-plan');
      var price = b.getAttribute('data-price');
      openPaymentModal(plan, price);
    });
  });

  // open modal helper
  function openPaymentModal(plan, price){
    var modal = document.getElementById('paymentModal');
    if(!modal) return;
    document.getElementById('modalPlan').textContent = plan + ' plan';
    document.getElementById('modalPrice').textContent = 'Amount: ₹' + price + ' (Demo)';
    modal.style.display = 'flex';
  }

  document.getElementById('closeModal') && document.getElementById('closeModal').addEventListener('click', function(){
    document.getElementById('paymentModal').style.display='none';
  });
  document.getElementById('confirmPay') && document.getElementById('confirmPay').addEventListener('click', function(){
    alert('Demo payment confirmed (fake). Thank you!');
    document.getElementById('paymentModal').style.display='none';
  });
  document.getElementById('cancelPay') && document.getElementById('cancelPay').addEventListener('click', function(){
    document.getElementById('paymentModal').style.display='none';
  });

  // meetup calc
  var locSelect = document.getElementById('locationSelect');
  var otherInput = document.getElementById('otherCityInput');
  var travelCost = document.getElementById('travelCost');
  var totalCost = document.getElementById('totalCost');
  var payable = document.getElementById('payable');
  var bookBtn = document.getElementById('bookBtn');
  function calc(){
    if(!locSelect) return;
    var loc = locSelect.value;
    if(loc==='london'){
      var total = 380;
      totalCost.textContent = '£' + total.toFixed(2);
      payable.textContent = '£' + (total*0.7).toFixed(2);
    } else {
      var v = parseFloat(travelCost.value || 0);
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
      alert('Demo booking received for ' + name + '. Amount payable: ' + (document.getElementById('payable').textContent || '-') + ' (Demo)');
    });
  }
});