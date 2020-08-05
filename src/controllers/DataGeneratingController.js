import readXlsxFile from 'read-excel-file/node';

const parsePizzas = () => {
    readXlsxFile('dataset/ccv/pizzass_list.xlsx', { getSheets: true }).then((sheets) => {
        console.log(sheets);

        readXlsxFile('dataset/ccv/pizzass_list.xlsx').then((rows) => {
            console.log(rows);
        })
    })
};

const parseRestaurants = () => {
    readXlsxFile('dataset/ccv/restaurants_list.xlsx').then((rows) => {
        console.log(rows);
    })
};

const DataGeneratingController = (req, res) => {
    res.send('ok');
    parsePizzas();
    // parseRestaurants();
};

export default DataGeneratingController;
