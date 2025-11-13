# Quick Setup Guide

## Prerequisites
- Node.js (v16+)
- MongoDB (running locally or MongoDB Atlas connection string)

## Step 1: Backend Setup

```bash
cd Backend
npm install
```

Create `Backend/.env`:
```env
MONGO_URI=mongodb://localhost:27017/supplylink
JWT_SECRET=your_secret_key_here
PORT=5000
```

Start backend:
```bash
npm run dev
# or
npm start
```

## Step 2: Frontend Setup

```bash
cd Frontend
npm install
```

Create `Frontend/.env` (optional):
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

## Step 3: Access the Application

1. Open http://localhost:5173 (or the port shown in terminal)
2. Sign up with a new account
3. Choose your role: Vendor, Supplier, or Admin
4. Start using the platform!

## Default Routes

- `/` - Welcome page
- `/login` - Login page
- `/signup` - Signup page
- `/vendordashboard` - Vendor dashboard (requires vendor/admin role)
- `/supplierdashboard` - Supplier dashboard (requires supplier/admin role)
- `/admindashboard` - Admin dashboard (requires admin role)

## Testing the Application

1. **As a Vendor:**
   - Browse products
   - Use "Compare Prices" to find best deals
   - Add products to cart
   - Place orders

2. **As a Supplier:**
   - Click "New Product" to add products
   - Manage inventory and prices
   - View and process orders
   - Update order status

3. **As an Admin:**
   - View system statistics
   - Monitor all orders
   - Access admin settings

## Troubleshooting

- **MongoDB Connection Error**: Make sure MongoDB is running or update MONGO_URI in .env
- **Port Already in Use**: Change PORT in Backend/.env or kill the process using the port
- **CORS Errors**: Ensure backend is running and VITE_API_URL matches backend URL
- **Authentication Issues**: Clear localStorage and login again



