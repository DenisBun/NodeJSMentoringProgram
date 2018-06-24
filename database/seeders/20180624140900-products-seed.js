'use strict';
const products = [
  {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
  },
  {
    id: 2,
    name: 'Nike',
    brand: 'Something',
    price: 1.99,
  },
  {
    id: 3,
    name: 'T-Shirt',
    brand: 'Reebok',
    price: 929.99,
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', products, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
