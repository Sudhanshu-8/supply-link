# Source Mart for Street Vendors 🛒

Full-stack platform connecting street vendors with suppliers for price comparison and easy ordering. Built with React, Tailwind CSS, Node.js, Express, and MongoDB.

## Features

- **Price Comparison**: Vendors can compare prices from multiple suppliers for the same product
- **Order Management**: Place and track orders easily through the platform
- **Product Management**: Suppliers can add, edit, and manage their product listings
- **Role-Based Access**: Separate dashboards for Vendors, Suppliers, and Admins
- **Responsive Design**: Works seamlessly on both mobile and desktop devices
- **User-Friendly Interface**: Intuitive and simple navigation
- **Scalable Backend**: Built with Node.js, Express, and MongoDB to support future growth

## Tech Stack

### Frontend
- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SupplyLink
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` directory:

```env
MONGO_URI=mongodb://localhost:27017/supplylink
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
PORT=5000
```

Start the backend server:

```bash
# Development mode (requires nodemon)
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Create a `.env` file in the `Frontend` directory (optional, defaults to localhost:5000):

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

## Project Structure

```
SupplyLink/
├── Backend/
│   ├── controllers/       # Request handlers
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── models/           # Database models
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/           # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── orders.js
│   ├── middleware/       # Custom middleware
│   │   └── auth.js
│   └── server.js         # Entry point
│
└── Frontend/
    ├── src/
    │   ├── components/   # Reusable components
    │   │   └── ProtectedRoute.jsx
    │   ├── context/      # React context
    │   │   └── AuthContext.jsx
    │   ├── services/     # API services
    │   │   └── api.js
    │   ├── Vendor/       # Vendor dashboard
    │   ├── Supplier/     # Supplier dashboard
    │   ├── Admin/        # Admin dashboard
    │   ├── Login.jsx
    │   ├── Signup.jsx
    │   └── Welcome.jsx
    └── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `GET /api/products/compare?productName=...` - Compare prices
- `GET /api/products/supplier/:supplierId` - Get supplier products
- `POST /api/products` - Create product (Supplier/Admin)
- `PUT /api/products/:id` - Update product (Supplier/Admin)
- `DELETE /api/products/:id` - Delete product (Supplier/Admin)

### Orders
- `POST /api/orders` - Create order (Vendor)
- `GET /api/orders` - Get orders (filtered by role)
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status (Supplier/Admin)
- `PUT /api/orders/:id/cancel` - Cancel order (Vendor)

## User Roles

### Vendor
- Browse product catalog
- Compare prices from different suppliers
- Add products to cart
- Place and track orders
- Cancel pending orders

### Supplier
- Create and manage product listings
- Update product inventory and prices
- View and manage orders
- Update order status (confirm, process, ship, deliver)

### Admin
- View system overview and statistics
- Monitor all orders
- Manage users (future feature)
- System settings

## Usage

1. **Sign Up**: Create an account with your role (Vendor, Supplier, or Admin)
2. **Login**: Access your role-specific dashboard
3. **Vendors**: Browse products, compare prices, and place orders
4. **Suppliers**: Add products, manage inventory, and fulfill orders
5. **Admins**: Monitor system activity and manage settings

## Development

### Backend Development
- Uses Express for RESTful API
- MongoDB for data persistence
- JWT for authentication
- Middleware for route protection

### Frontend Development
- React with functional components and hooks
- Context API for state management
- Protected routes based on user roles
- Responsive design with Tailwind CSS

## Environment Variables

### Backend (.env)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5000)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on the GitHub repository.

Happy coding! 🚀
