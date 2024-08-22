# authApi

# git clone https://github.com/kannan03/authApi.git
# cd authApi
# npm install
# npm run dev

# API Testing for Postman tools process step by step

# step1 - user create
# example : http://localhost:5000/api/auth/register 
# HTTP POST Method
# req body { "username" : "test@123", "password" : "password123"}

# step2 - user login
# example : http://localhost:5000/api/auth/login 
# HTTP POST Method
# req body { "username" : "test@123", "password" : "password123"}
# return result example - {
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZjNmZjYTYwZmZhOWZkODQ5NzBiNDRkIiwidXNlcm5hbWUiOiJkZmRmZGYiLCJpYXQiOjE3MjQzMTY4NDUsImV4cCI6MTcyNDMxNjk2NX0.J_RyrKSW85Z_QIu1geP8N9DMGJBkNHdXFkcL2-4datw",
        "verificationLink": "http://localhost:5000/api/auth/verifyLink/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZjNmZjYTYwZmZhOWZkODQ5NzBiNDRkIiwidXNlcm5hbWUiOiJkZmRmZGYiLCJpYXQiOjE3MjQzMTY4NDUsImV4cCI6MTcyNDMxNjk2NX0.J_RyrKSW85Z_QIu1geP8N9DMGJBkNHdXFkcL2-4datw"
    }
}

# step3 - verify token link
# HTTP GET Method
# example : http://localhost:5000/api/auth/verifyLink/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZjNmZjYTYwZmZhOWZkODQ5NzBiNDRkIiwidXNlcm5hbWUiOiJkZmRmZGYiLCJpYXQiOjE3MjQzMTY4NDUsImV4cCI6MTcyNDMxNjk2NX0.J_RyrKSW85Z_QIu1geP8N9DMGJBkNHdXFkcL2-4datw
# HTTP GET Method

