# authApi

# API Testing for Postman tools process step by step

# step1 - user create
# example : http://localhost:5000/api/auth/register 
# HTTP Post Method
# req body { "username" : "test@123", "password" : "password123"}

# step2 - user login
# example : http://localhost:5000/api/auth/login 
# HTTP Post Method
# req body { "username" : "test@123", "password" : "password123"}
# return - generate token link

# step3 - verify token link
# example : http://localhost:5000/api/auth/verifyLink/:token 
# HTTP GET Method

