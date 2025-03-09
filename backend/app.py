from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Dummy product data (replace with MongoDB)
products = [    {"id": 1, "brand": "Offmint", "name": "Shirt", "price": 2999, "image": "/f1.jpg"},
    {"id": 2, "brand": "Nike", "name": "Shirt", "price": 15999, "image": "/f3.jpg"},
    {"id": 3, "brand": "Adidas", "name": "Women Pant", "price": 999, "image": "/f7.jpg"},
    {"id": 1, "brand": "Offmint", "name": "Shirt", "price": 2999, "image": "/f8.jpg"},
    {"id": 2, "brand": "Nike", "name": "Shirt", "price": 15999, "image": "/n2.jpg"},
    {"id": 3, "brand": "Adidas", "name": "Women Pant", "price": 999, "image": "/f7.jpg"},
    {"id": 1, "brand": "Offmint", "name": "Shirt", "price": 2999, "image": "/f1.jpg"},
    {"id": 2, "brand": "Nike", "name": "Shirt", "price": 15999, "image": "/f3.jpg"},
    {"id": 3, "brand": "Adidas", "name": "Women Pant", "price": 999, "image": "/f7.jpg"},
    {"id": 2, "brand": "Nike", "name": "Shirt", "price": 15999, "image": "/f3.jpg"}
]

cart = []  # Store cart items with quantity
wishlist = []  # Store wishlist items

@app.route('/get_products', methods=['GET'])
def get_products():
    return jsonify(products)

@app.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.json
    product_id = data.get("id")
    product = next((p for p in products if p["id"] == product_id), None)
    
    if product:
        existing_item = next((item for item in cart if item["id"] == product_id), None)
        if existing_item:
            existing_item["quantity"] += 1  # Increase quantity if already in cart
        else:
            product["quantity"] = 1  # Set initial quantity
            cart.append(product)
        return jsonify({"message": "Product added to cart"}), 200
    return jsonify({"error": "Product not found"}), 400

@app.route('/update_cart_quantity', methods=['POST'])
def update_cart_quantity():
    data = request.json
    product_id = data.get("id")
    quantity = data.get("quantity")

    for item in cart:
        if item["id"] == product_id:
            item["quantity"] = max(1, quantity)  # Prevent quantity from being < 1
            return jsonify({"message": "Cart updated"}), 200

    return jsonify({"error": "Product not found in cart"}), 400

@app.route('/remove_from_cart', methods=['POST'])
def remove_from_cart():
    data = request.json
    product_id = data.get("id")
    global cart
    cart = [p for p in cart if p["id"] != product_id]
    return jsonify({"message": "Product removed from cart"}), 200

@app.route('/save_for_later', methods=['POST'])
def save_for_later():
    data = request.json
    product_id = data.get("id")
    product = next((p for p in cart if p["id"] == product_id), None)

    if product:
        cart.remove(product)
        if product not in wishlist:
            wishlist.append(product)
        return jsonify({"message": "Product saved for later"}), 200
    return jsonify({"error": "Product not found in cart"}), 400

@app.route('/get_cart', methods=['GET'])
def get_cart():
    return jsonify(cart)
wishlist = []  # Store wishlist items

@app.route('/add_to_wishlist', methods=['POST'])
def add_to_wishlist():
    data = request.json
    product_id = data.get("id")
    product = next((p for p in products if p["id"] == product_id), None)
    
    if product and product not in wishlist:
        wishlist.append(product)  # Add product to wishlist
        return jsonify({"message": "Product added to wishlist"}), 200
    return jsonify({"error": "Product not found or already in wishlist"}), 400

@app.route('/get_wishlist', methods=['GET'])
def get_wishlist():
    return jsonify(wishlist)  # Return wishlist data

@app.route('/remove_from_wishlist', methods=['POST'])
def remove_from_wishlist():
    data = request.json
    product_id = data.get("id")
    
    global wishlist
    wishlist = [p for p in wishlist if p["id"] != product_id]  # Remove the product from wishlist

    return jsonify({"message": "Product removed from wishlist"}), 200



if __name__ == '__main__':
    app.run(debug=True)
