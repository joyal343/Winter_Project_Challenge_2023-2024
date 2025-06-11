# Winter_Project_Challenge_2023-2024
This is a website that can display and manage announcements ( All CRUD operationas are implemented ) made by a college. It creates dynamic webpages for each announcement created.  

# Technologies
```
1.) Nextjs 
2.) Postgres as Database
3.) Prisma as ORM
``` 


# Setup
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

# Endpoints
1.) */news* 
Here the users will be able to view all existing announcements
![News Image](./public/assets/uploaded_images/news.png)
![News Mobile](./public/assets/uploaded_images/Home_Mob.jpg)

2.) */admin/posts*
Here the authenticated users will be able to post, edit and delete announcements.
![Admin Posts 1](./public/assets/uploaded_images/admin_posts.png)
![Admin Post Mob 1](./public/assets/uploaded_images/Admin_Mob.jpg)
![Admin Post Mob 2](./public/assets/uploaded_images/Admin_Mob_2.jpg)

3.) */admin/dashbard*
Here the authenticated users will be able view total number of posts and documents uploaded.
![Admin Dashboard 1](./public/assets/uploaded_images/admin_dashboard.png)

4.) */login*
Here users can login to the site.
![Login 1](./public/assets/uploaded_images/Login.png)

5.) */register*
Here users can register onto the site.
![Register 1](./public/assets/uploaded_images/Register.png)