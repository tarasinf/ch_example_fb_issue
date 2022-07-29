window.onload = function() {
  document.getElementById('click-btn').addEventListener('click', clickBtn);

}

function clickBtn() {
  console.log('clickBtn');
  
  let data = {
    eventName: 'testEvent',
  }
  chrome.runtime.sendMessage({command: 'update-stats', data: data}, (response) => {
    console.log('update-stats, response:', response);
  });
}
