var SaveBtn = document.getElementById("SaveBtn");

SaveBtn.addEventListener("click", StartSavingData);

function StartSavingData(){
    Is_startSaving = true;
	console.log("Start Saving Data....");
	
    SaveBtn.removeEventListener("click", StartSavingData);
    SaveBtn.addEventListener("click", StopSavingData);
    SaveBtn.value = "Stop Saving Data";
}

function StopSavingData(){
	Is_startSaving = false;
	console.log("Stop Saving Data....");
	exportToCsv('export.csv', external_a);
	external_a.length = 0;
	
    SaveBtn.removeEventListener("click", StopSavingData);
    SaveBtn.addEventListener("click", StartSavingData);
    SaveBtn.value = "Start Saving Data";
}

function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

var external_a = []; 
var Is_startSaving = false;
function handleNotifications(event) {
let value = event.target.value;
let a = [];
let b = [];

// Convert raw data bytes to hex values just for the sake of showing something.
// In the "real" world, you'd use data.getUint8, data.getUint16 or even
// TextDecoder to process raw data bytes.
for (let i = 0; i < value.byteLength; i++) {
a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
}
a.push(" : " + (new Date()).getTime());
log('> ' + a.join(' '));

if(Is_startSaving)
{
external_a.push(a);
}
<!-- exportToCsv('export.csv', a); -->

<!-- for (let i = 0; i < value.byteLength; i++) { -->
<!-- a.push((value.getUint8(i).toString(16)).slice(-2)); -->
<!-- } -->
<!-- log('> ' + a.join(' ')); -->
}