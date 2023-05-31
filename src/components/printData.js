// printData.js
function print(data) {
    console.log('Data from MySQL Database:');
    for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
    }
}

module.exports = {
    print: print
};
