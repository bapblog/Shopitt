import { RequestHandler } from "express";
import createHttpError from "http-errors";
import productModel from "../models/productModel";
import SearchFeatures from "../util/SearchFeatures";
type newProductbody = {
  name: string;
  description: string;
  price: number;
  cuttedPrice: number;
  imgaes: string[];
  brand: string;
  category: string;
  stock: number;
  warranty?: number;
  createdAt?: Date;

};
// getALlProducts -- Based on search
export const getAllProducts: RequestHandler = async (req, res, next) => {
  const resultPerPage = 12;

  try {
    const productsCount = await productModel.countDocuments();

    const searchFeature = new SearchFeatures(productModel.find(), req.query)
      .search()
      .filter();

    let products = await searchFeature.query;
    const filteredProductsCount: number = products.length;

    searchFeature.pagination(resultPerPage);

    products = await searchFeature.query.clone();

    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Products ---Product Sliders
export const getProducts: RequestHandler = async (req, res, next) => {
  
  try {
    const products = await productModel.find();

  res.status(200).json({
    success: true,
    products,
  });
  } catch (error) {
    next(error)
  }
};

// get Products Details
export const getProductDetails: RequestHandler = async (req, res, next) => {
  const product = await productModel.find(req.body.params.id);

  if (!product) return next(createHttpError(404, "Product Not Found"));

  res.status(200).json({
    success: true,
    product,
  });
};

// Admin
export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const {name,description,price,cuttedPrice,imgaes,brand,category,stock,}: newProductbody = req.body;

    const product = await productModel.create({
      name:name,
      description:description,
      price: price,
      cuttedPrice: cuttedPrice,
      images: imgaes,
      brand: brand,
      category: category,
      stock: stock
    })

    res.status(200).json({
      success: true,
      product
    })
  } catch (error) {
    next(error);
  }
};
