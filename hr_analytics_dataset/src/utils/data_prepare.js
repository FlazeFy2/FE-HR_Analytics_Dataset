import Papa from "papaparse"

export function readCsv(filePath, cols) {
    return new Promise((resolve, reject) => {
        fetch(filePath)
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        let selectedData = {}
                        
                        cols.forEach(col => {
                            selectedData[col] = result.data.map(row => row[col])
                        });

                        resolve(selectedData)
                    }
                })
            })
            .catch(error => reject(error))
    })
}
