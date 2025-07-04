// validators/todoValidator.js
const { body, param, validationResult } = require('express-validator');


const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};


exports.validateCreateList = [
  body('name')
    .trim()
    .isLength({ min: 3, max: 150 })
    .withMessage('List name must be 3-100 characters long'),
  handleValidationErrors,
];


exports.validateAddItem = [
  param('todoId').isMongoId().withMessage('Invalid Todo ID'),
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2–100 characters'),
  body('description')
    .optional()
    .isLength({ max: 300 })
    .withMessage('Description too long'),
  handleValidationErrors,
];


exports.validateUpdateItem = [
  param('todoId').isMongoId().withMessage('Invalid Todo ID'),
  param('itemId').isMongoId().withMessage('Invalid Item ID'),
  body('title')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2–100 characters'),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be true or false'),
  handleValidationErrors,
];


exports.validateDeleteItem = [
  param('todoId').isMongoId().withMessage('Invalid Todo ID'),
  param('itemId').isMongoId().withMessage('Invalid Item ID'),
  handleValidationErrors,
];
