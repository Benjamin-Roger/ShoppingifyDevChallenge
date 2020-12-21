
// Order the list by alphabetical order
function sortByCategory(a, b) {
    // Use toUpperCase() to ignore character casing
    const categoryA = a.category.toUpperCase();
    const categoryB = b.category.toUpperCase();

    let comparison = 0;
    if (categoryA > categoryB) {
        comparison = 1;
    } else if (categoryA < categoryB) {
        comparison = -1;
    }
    return comparison;
}


function sortByTimeStampKey(array, key) {
    return array.sort(function (a, b) {
        var x = new Date(a[key]);
        var y = new Date(b[key]);
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}


// Return unique categories from array of objects (must include a "category" key)
function getUniqueKeys(array, taxonomy) {

    switch (taxonomy) {
        case "category":
            var arr = array.sort(sortByCategory);
            const uniqueCategories = [...new Set(arr.map(item => item[taxonomy]))];
            return [arr, uniqueCategories];

        case "name":
            const uniqueNames = [...new Set(array.map(item => item[taxonomy]))];
            return [array, uniqueNames];

    }
};


module.exports = {
    sortByCategory,
    getUniqueKeys,
    sortByTimeStampKey
}