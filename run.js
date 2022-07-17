const request = require("request");
let counter = 1603943950402;
const host = "https://app.bookitit.com";
const path = "onlinebookings/datetime";
const start = "2020-12-01";
const end = "2020-12-31";
const params =
  "?callback=jQuery211021693542931238718_1603943950366&type=default&publickey=2eea7879a373186db4ce85c87bb7cd265&lang=es&services%5B%5D=bkt509036&agendas%5B%5D=bkt207251&version=1234567&src=https%3A%2F%2Fapp.bookitit.com%2Fes%2Fhosteds%2Fwidgetdefault%2F2eea7879a373186db4ce85c87bb7cd265&srvsrc=https%3A%2F%2Fapp.bookitit.com&start=" +
  start +
  "&end=" +
  end +
  "&selectedPeople=1&_=" +
  counter;

setInterval(doTheThing, 5000);

function doTheThing() {
  request(`${host}/${path}/${params}`, { json: true }, (err, res, rawBody) => {
    counter = counter + 1;
    const body = JSON.parse(
      rawBody.substring(rawBody.indexOf("(") + 1, rawBody.length - 2)
    );
    if (err) {
      return console.log(err);
    }
    let apptFound = false;
    for (const slot of body.Slots) {
      const numCitas = slot.times.length;
      if (slot.times.length > 0) {
        console.log(`${numCitas} encontradas para el dia ${slot.date}.`);
        apptFound = true;
      }
    }

    if (!apptFound) {
      console.log(
        `${new Date()}: No se encontraron citas para el periodo ${start} ... ${end}`
      );
    }
  });
}
