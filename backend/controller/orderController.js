import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc Create New Order
// @rout POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
  } = req.body;
  console.log(req.body);
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    console.log('=============');
    console.log(req.body);
    console.log('=============');
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc Get Order By ID
// @rout GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

export { getOrderById, addOrderItems };
