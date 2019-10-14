var ConnectBtn = document.getElementById("ConnectBtn");

ConnectBtn.addEventListener("click", StartConnect);


function StartConnect() {
    console.log("Connecting");
    ConnectBtn.removeEventListener("click", StartConnect);
    ConnectBtn.addEventListener("click", DisConnect);
    ConnectBtn.value = "DisConnect";
	
  let filters = [];

  let serviceUuid = document.querySelector('#service').value;
  if (serviceUuid.startsWith('0x')) {
    serviceUuid = parseInt(serviceUuid);
  }
  if (serviceUuid) {
    filters.push({services: [serviceUuid]});
  }

  let filterName = document.querySelector('#name').value;
  if (filterName) {
    filters.push({name: filterName});
  }

  let filterNamePrefix = document.querySelector('#namePrefix').value;
  if (filterNamePrefix) {
    filters.push({namePrefix: filterNamePrefix});
  }
  
  let characteristicUuid = document.querySelector('#characteristic').value;
  if (characteristicUuid.startsWith('0x')) {
    characteristicUuid = parseInt(characteristicUuid);
  } 

  let options = {};
  if (document.querySelector('#allDevices').checked) {
    options.acceptAllDevices = true;
  } else {
    options.filters = filters;
  }
  
  <!-- let serviceUuid = document.querySelector('#service').value; -->
  <!-- if (serviceUuid.startsWith('0x')) { -->
    <!-- serviceUuid = parseInt(serviceUuid); -->
  <!-- } -->

  <!-- let characteristicUuid = document.querySelector('#characteristic').value; -->
  <!-- if (characteristicUuid.startsWith('0x')) { -->
    <!-- characteristicUuid = parseInt(characteristicUuid); -->
  <!-- } -->

  log('Requesting Bluetooth Device...');
  log('with ' + JSON.stringify(options));
  navigator.bluetooth.requestDevice(options)
  <!-- navigator.bluetooth.requestDevice({filters: [{services: [serviceUuid]}]}) -->
  .then(device => {
    log('Connecting to GATT Server...');
	bluetoothDevice = device;
    bluetoothDevice.addEventListener('gattserverdisconnected', DisConnect);
    return device.gatt.connect();
  })
  .then(server => {
    log('Getting Service...');
    return server.getPrimaryService(serviceUuid);
  })
  .then(service => {
    log('Getting Characteristic...');
    return service.getCharacteristic(characteristicUuid);
  })
  .then(characteristic => {
    myCharacteristic = characteristic;
    return myCharacteristic.startNotifications().then(_ => {
      log('> Notifications started');
      myCharacteristic.addEventListener('characteristicvaluechanged',
          handleNotifications);
    });
  })
 .then(value => {
	log('> Characteristics: ' +
		value.getUint8(0));
  })
  .catch(error => {
    log('Argh! ' + error);
  });
}

function DisConnect() {

	ConnectBtn.removeEventListener("click", DisConnect);
    ConnectBtn.addEventListener("click", StartConnect);
    ConnectBtn.value = "Connect";
	
  if (!bluetoothDevice) {
    return;
  }
  log('Disconnecting from Bluetooth Device...');
  if (bluetoothDevice.gatt.connected) {
    bluetoothDevice.gatt.disconnect();
	console.log("Disconnecting");
	ChromeSamples.clearLog();
  } else {
    log('> Bluetooth Device is already disconnected');
  }
}