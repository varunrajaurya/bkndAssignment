
<!-- Varun Rajaurya -->

This is my backend assignment.

Admin Credentials are :
email : varunrajaurya1996@gmail.com
password : varun@1234

URLs:

admin login : get : http://localhost:3000/admin
admin addPosts :  post : http://localhost:3000/add/post
admin updatePosts : put : http://localhost:3000/update/post/60fbeae5d3c88e007c6db627
admin deletePost : delete : http://localhost:3000/delete/post/60fbeae5d3c88e007c6db627

student : 

login : http://localhost:3000

getPosts: 
list : http://localhost:3000/list
(also have limt and offsets for pagination.)


After Login token will generated , with the help of token admin can add , update and delete the post.

Second : 
on the very fist router "/" there where a login API , which student can login first and then token would be generated as they can seeing in the response as well.

After taken the token , student can see the posts list.

Note : Without any token admin or stdents cannot see the posts list. And also admin cannot added ,updated or delete the posts. 
