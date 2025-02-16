# API Documentation

## Base URL

All routes are prefixed with `/api/v1`

## Authentication

The API uses token-based authentication for protected routes. Include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Routes

### 1. Authentication (`/auth`)

- **POST** `/auth/login` - Authenticate user
  - Validates login credentials
  - Returns JWT token upon successful authentication
- **POST** `/auth/register` - Register new user
  - Creates new user account
  - Validates registration data

### 2. Users (`/users`)

Protected routes - requires authentication

- **GET** `/users` - Get all users
- **GET** `/users/:id` - Get user by ID
- **POST** `/users` - Create new user
- **PUT** `/users/:id` - Update user
- **DELETE** `/users/:id` - Delete user
- **PUT** `/users/:id/changeNotifyStatus` - Update user notification status
- **GET** `/users/data/export` - Export users list to Excel

### 3. Service Requests (`/service-requests`)

Protected routes - requires authentication

- **GET** `/service-requests` - Get all service requests
- **GET** `/service-requests/pending` - Get pending service requests
- **GET** `/service-requests/:id` - Get service request by ID
- **GET** `/service-requests/data/export` - Export service requests to Excel
- **POST** `/service-requests` - Create new service request
- **PUT** `/service-requests/:id` - Update service request
- **DELETE** `/service-requests/:id` - Delete service request
- **PATCH** `/service-requests/:id/status` - Update request status
- **PUT** `/service-requests/:id/complete` - Mark request as complete

### 4. Approval Management (`/requests/approval`)

#### Public Routes (Magic Link Access)

- **GET** `/requests/approval/verify/:token` - Verify approval token
- **POST** `/requests/approval/respond/:token` - Respond to approval request
  - Supports image upload (up to 5MB)
  - Validates response data
- **POST** `/requests/approval/kitchen/:requestId` - Process order by kitchen

#### Protected Routes

- **POST** `/requests/approval/:requestId` - Create approval link
- **GET** `/requests/approval/:requestId` - Get approval link
- **DELETE** `/requests/approval/:requestId` - Delete approval link

### 5. Employee Management (`/employees`)

Protected routes - requires authentication

- **GET** `/employees` - Get all employees
- **GET** `/employees/sub-bidang` - Get all unique sub-bidang values
- **GET** `/employees/:id` - Get employee by ID
- **POST** `/employees` - Create new employee
- **PUT** `/employees/:id` - Update employee
- **DELETE** `/employees/:id` - Delete employee
- **POST** `/employees/import` - Import employees from Excel file
  - Supports Excel files (XLSX, XLS) up to 5MB
  - Validates file format and content

### 6. Menu Management (`/menu`)

Protected routes - requires authentication

- **GET** `/menu` - Get all menu items
- **GET** `/menu/:id` - Get menu item by ID
- **POST** `/menu` - Create new menu item
- **PUT** `/menu/:id` - Update menu item
- **DELETE** `/menu/:id` - Delete menu item

### 7. Notification Groups (`/notif/groups`)

Protected routes - requires authentication

- **GET** `/notif/groups` - Get all notification groups
- **GET** `/notif/groups/:type` - Get groups by type
- **POST** `/notif/groups` - Create new notification group
- **PUT** `/notif/groups/:id` - Update notification group
- **DELETE** `/notif/groups/:id` - Delete notification group

### 8. Kitchen Management (`/kitchen`)

Protected routes - requires authentication

The kitchen management endpoints handle service requests of type `MEAL`. These requests go through specific kitchen-related statuses:

- PENDING_KITCHEN: New orders waiting for kitchen processing
- REJECTED_KITCHEN: Orders rejected by the kitchen
- IN_PROGRESS: Orders currently being prepared
- COMPLETED: Orders that have been completed
- CANCELLED: Orders that have been cancelled

#### Core Order Management

- **GET** `/kitchen/orders` - Get all meal service requests with kitchen-related statuses
- **GET** `/kitchen/orders/stats` - Get statistics of orders by status
- **GET** `/kitchen/orders/pending` - Get new incoming orders (PENDING_KITCHEN status)
- **GET** `/kitchen/orders/:id` - Get detailed information for a specific order
- **POST** `/kitchen/orders/:id/progress` - Start working on an order (changes status to IN_PROGRESS)
- **POST** `/kitchen/orders/:id/complete` - Mark order as completed
- **PATCH** `/kitchen/orders/:id/status` - Update order status (accepts PENDING_KITCHEN, REJECTED_KITCHEN, IN_PROGRESS, COMPLETED, or CANCELLED)

#### Kitchen Operations

- **GET** `/kitchen/orders/inprogress` - Get orders currently being prepared (IN_PROGRESS status)
- **GET** `/kitchen/orders/completed` - Get completed orders history

#### Reporting and Statistics

- **GET** `/kitchen/orders/stats/daily` - Get today's order statistics by status
- **GET** `/kitchen/orders/stats/items` - Get top 5 most ordered menu items today
- **GET** `/kitchen/orders/count/pending` - Get count of pending orders (PENDING_KITCHEN status)
- **GET** `/kitchen/orders/count/inprogress` - Get count of orders in progress
- **GET** `/kitchen/orders/count/completed` - Get count of completed orders

Note: All operations track user actions in the status history, recording who changed the status and when.

## File Upload Specifications

### Approval Images

- Supported formats: Image files only
- Maximum file size: 5MB
- Upload path: `/uploads/approval-image-*`

### Employee Import

- Supported formats: Excel files (XLSX, XLS)
- Maximum file size: 5MB
- Upload path: `/uploads/employee-import-*`

## Authentication Flow

1. User registers or logs in through `/auth` endpoints
2. Upon successful authentication, receives JWT token
3. Include token in Authorization header for all protected routes
4. Token is verified through auth middleware for protected routes

## Service Request Flow

1. Create service request through POST `/service-requests`
2. Request can be updated or managed through various endpoints
3. Approval links can be created for request approval
4. Approvers can respond through magic links
5. Request status can be updated and finally marked as complete

## Error Handling

- All routes use standard error handling middleware
- Validation errors return 400 status code
- Authentication errors return 401 status code
- Authorization errors return 403 status code
- Not found errors return 404 status code
- Server errors return 500 status code

## Input Validation

- All POST and PUT requests include validation middleware
- Validation rules are defined in respective validation files
- Invalid requests return appropriate error messages
