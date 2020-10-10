import asyncHandler from 'express-async-handler';
import Product from '../models/orderModel.js';

// @desc Create New Order
// @rout POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymenMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      paymenMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
      user: req.user.Id,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});
