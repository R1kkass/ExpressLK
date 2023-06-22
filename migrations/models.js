const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Products = sequelize.define("products", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING, defaultValue: "В наличии" },
});

const Basket = sequelize.define("basket", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.STRING },
    count: { type: DataTypes.STRING },
    price: { type: DataTypes.STRING, defaultValue: "none" },
});

const Review = sequelize.define("review", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING },
    user: { type: DataTypes.STRING },
});

const Role = sequelize.define("role", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
});

const Category = sequelize.define("category", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
}); 

module.exports = {
    User,
    Products,
    Review,
    Basket,
};

Products.hasMany(Review);
Review.belongsTo(Products);

Products.hasMany(Category);
Category.belongsTo(Products);

Review.hasMany(User);
User.belongsTo(Review);

Products.hasMany(Basket);
Basket.belongsTo(Products);

User.hasMany(Role);
Role.belongsTo(User);
