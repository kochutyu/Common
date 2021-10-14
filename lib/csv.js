
/***
 *  csvFile - InputHtmlElement type="file"
 * **/
const csvFile = document.getElementById("csvFile");


/***
 *  handleFileChange
 * **/
csvFile.addEventListener("change", function (e) {
    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const text = event.target.result;
        const data = csvToArray(text);
        const template = generateCsvToTable(data, 'Caption Example')
        document.write(template);
    };

    reader.readAsText(input);
});

/***
 *  Parse CSV to Array
 * **/
function csvToArray(str, delimiter = ",") {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const arr = rows.map((row, i) => {
        return row
            .split(';')
            .filter(col => !!col)
            .map(col => {
                if (typeof col !== 'string') {
                    return col
                }
                if (col.charAt(col.length - 1) === ',') {
                    return col.slice(0, -1);
                }
                if (JSON.stringify(col).includes(",\\r")) {
                    return JSON.stringify(col).slice(1, col.length - 1)
                }
                if (JSON.stringify(col).includes("\\r")) {
                    return JSON.stringify(col).slice(1, col.length)
                }
                return col
            })
    })

    if (!arr[arr.length - 1].length) {
        arr.splice(arr.length - 1, 1)
    }

    // return the array
    return arr
}

/***
 *  Generate table with CSV
 * **/
function generateCsvToTable(csvArray, caption = '') {
    return `
            <table border="1">
               <caption>${caption}</caption>
                   ${
                    csvArray.map((row, i) => {
                        if (i === 0) {
                            return `
                                    <tr>
                                        ${row.map(col => `<th>${col}</th>`)}
                                    </tr>
                                   `
                        }
                        return `
                                    <tr>
                                        ${row.map(col => `<td>${col}</td>`)}
                                    </tr>
                                  `
                    })
                }
             </table>
        `
}
