export function countWordFrequencies(items, limit = null) {
    const wordCounts = {}

    items.forEach(item => {
        const word = item.trim().toLowerCase()
        wordCounts[word] = (wordCounts[word] || 0) + 1
    })

    const sorted = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]) .slice(0, limit ?? Object.keys(wordCounts).length) 

    return Object.fromEntries(sorted)
}


export function countMax(items) {
    let max = parseInt(items[0])

    if(items.length > 1){
        items.forEach(dt => {
            if(parseInt(dt) > max){
                max = parseInt(dt)
            }
        });
    }

    return max
}

export function countMin(items) {
    let min = parseInt(items[0])

    if(items.length > 1){
        items.forEach(dt => {
            if(parseInt(dt) < min){
                min = parseInt(dt)
            }
        });
    }

    return min
}

export function countMean(items) {
    let total = parseInt(items[0])

    if(items.length > 1){
        items.forEach(dt => {
            total += parseInt(dt)
        });

        total /= (items.length)
    }

    return total.toFixed(2)
}

export function countMode(items){
    let frequencyMap = {}
    let maxCount = 0
    let modes = []

    items.forEach(dt => {
        frequencyMap[dt] = (frequencyMap[dt] || 0) + 1
        if (frequencyMap[dt] > maxCount) {
            maxCount = frequencyMap[dt]
        }
    })

    for (let key in frequencyMap) {
        if (frequencyMap[key] === maxCount) {
            modes.push(Number(key))
        }
    }

    return modes
}

export function countVariance(items) {
    if (items.length < 2) return 0 

    let mean = countMean(items)
    let variance = 0
    let count = 0

    items.forEach(value => {
        if (!isNaN(value)) {
            variance += (value - mean) ** 2
            count++
        }
    })

    return count > 1 ? (variance / (count - 1)).toFixed(2) : 0
}

export function countStd(items) {
    let variance = countVariance(items)
    let std = Math.sqrt(variance)

    return std.toFixed(2)
}