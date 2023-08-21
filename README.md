# e-commerce-backend
This is the backend for a little project for a e-commerce website like Trendyol.


## endpoints for admin:
- POST request /api/admin/ -> admin can add item to be sold
- GET request /api/admin/filter -> can filter items by category or price
- PUT request /api/admin/:id -> admin can change info of an item
- DELETE request /api/admin/:id -> admin can delete an item
- POST request /api/admin/signin -> not implemented yet

## endpoints for customer:

- GET request /api/customer/filter -> customer can filter through items by category or price
- GET request /api/customer/item/:filter -> customer can check if item is in shopping bag
- PUT request /api/customer/ -> customer can add product to shopping bag
- PUT request /api/customer/checkout -> customer can checkout order for payment
- GET request /api/customer/item -> customer can view all of the item's details