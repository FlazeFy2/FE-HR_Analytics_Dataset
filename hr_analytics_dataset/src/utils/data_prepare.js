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

export function readHeader(filePath) {
    return new Promise((resolve, reject) => {
        fetch(filePath)
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: false,
                    skipEmptyLines: true,
                    complete: (result) => {
                        if (result.data.length > 0) {
                            const firstRow = result.data[0]
                            resolve(firstRow)
                        } else {
                            resolve([])
                        }
                    }
                })
            })
            .catch(error => reject(error))
    })
}

export function readBody(filePath) {
    return new Promise((resolve, reject) => {
        fetch(filePath)
            .then(response => response.text())
            .then(csvText => {
                Papa.parse(csvText, {
                    header: false,
                    skipEmptyLines: true,
                    complete: (result) => {
                        if (result.data.length > 1) {
                            const headers = result.data[0] 
                            const body = result.data.slice(1).map(row => {
                                let obj = {}
                                headers.forEach((key, index) => {
                                    obj[key] = row[index] || ""
                                })
                                return obj
                            })
                            resolve(body)
                        } else {
                            resolve([])
                        }
                    }
                })
            })
            .catch(error => reject(error))
    })
}
