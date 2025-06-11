# Winter_Project_Challenge_2023-2024
This is a website that can display and manage announcements ( All CRUD operationas are implemented ) made by a college. It creates dynamic webpages for each announcement created.  

## Technologies
```
1.) Nextjs 
2.) Postgres as Database
3.) Prisma as ORM
``` 


## Setup
```
1.) Create a .env in same folder as project and give DATABASE_URL="<your urll>"
2.) To Initialize Prisma use these commands on the project folder: 
        > npx prisma migrate dev --name init
        > npx prisma generate
        > npx prisma migrate deploy
3.) To Deploy the project use these commands: 
        > npm i
        > npm run build
        > npm run start

```

## Endpoints
1.) */news* <br/>
Here the users will be able to view all existing announcements<br/><br/>
![News](./public/assets/uploaded_images/news.png)<br/>
Mobile View<br/>
<img src="./public/assets/uploaded_images/Home_Mob.jpg" alt="News Mobile" width="300"/><br/>

2.) */admin/posts*
Here the authenticated users will be able to post, edit and delete announcements.<br/>
![Admin Posts 1](./public/assets/uploaded_images/admin_posts.png)<br/>
Mobile View<br/>
<img src="./public/assets/uploaded_images/Admin_Mob.jpg" alt="News Mobile" width="300"/> <br/>
<img src="./public/assets/uploaded_images/Admin_Mob_2.jpg" alt="News Mobile" width="300"/><br/>

3.) */admin/dashbard*
Here the authenticated users will be able view total number of posts and documents uploaded.<br/>
![Admin Dashboard 1](./public/assets/uploaded_images/admin_dashboard.png)<br/>

4.) */news/[id]*
Dynamic route that returns a dynamically created page for each announcment.<br/>
![Dynamic Page](./public/assets/uploaded_images/DynamicPage.jpg)<br/>
Mobile View<br/>
<img src="./public/assets/uploaded_images/Dynamic_Ann_Mob.jpg" alt="News Mobile" width="300"/><br/>

4.) */login*
Here users can login to the site.<br/>
![Login 1](./public/assets/uploaded_images/Login.png)<br/>

5.) */register*
Here users can register onto the site.<br/>
![Register 1](./public/assets/uploaded_images/Register.png)<br/>