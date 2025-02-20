
export function countWordFrequencies(items, limit = null) {
    const wordCounts = {}

    items.forEach(item => {
        const word = item.trim().toLowerCase()
        wordCounts[word] = (wordCounts[word] || 0) + 1
    })

    const sorted = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]) .slice(0, limit ?? Object.keys(wordCounts).length) 

    return Object.fromEntries(sorted)
}
