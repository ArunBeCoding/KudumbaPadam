# KudumbaPadam
KudumbaPadam means "Family Movie" in Tamil


## What is it?
***
KudumbaPadam is a Tamil movie review website and also my first attempt in web programming. However unlike, other movie review websites its purpose is not to rate the quality of movies. KudumbaPadam rates qualities of a movie such as violence and positive values. This allows users to determine whether their kids can watch the movie with them.

Think of commonsensemedia.org but for tamil movies!


## Stack Used
***
### **Frontend**  
ReactJS & Material UI
### **Backend**
NodeJS & ExpressJS
### **Database**
MongoDB Atlas & Mongoose (Azure CosmosDB was used previously)
### **Authentication**
JSON Web-Tokens (JWT) was used to authenticate HTTP requests 


## How does it work?
***
KudumbaPadam consists of three pages, **Home**, **Volunteer** & **Admin**

### Home
This is the page that most users will see. They can search for a movie and get violence factor, positive values, & recommended minimum age to watch in a neatly assembled card.

![Picture of Home Page](ReadMePics\KudumbaPadam-home.png)

### Volunteer
This will be used by volunteers who have a **volunteer account** and thus is able to review new movies. All the movies pending reviews will be shown in a nice list, from which they can choose and then review it in the popup shown. Upon their review, the movie will be removed from **pending list**

![Picture of volunteer login page](ReadMePics\KudumbaPadam-vol-login.png)

![Picture of volunteer page](ReadMePics\KudumaPadam-vol-list.png)

![Picture of movie review form](ReadMePics\KudumbaPadam-vol-form.png)

### Admin
This is to be used by **me** or anyone else I would like to make an Admin. This comes with a whole lot of features: 
- Admin gets to **post the new movies** that have been just released 
    - This will go into the pending list, which then the volunteers can review
- Admin can also **check and review the pending movies** like a volunteer
- Once a volunteer reviews a movie, it goes into the reviewed list
    - Admin will be able to **approve or deny these reviews**
    - Is a measure to prevent actions by any rogue volunteer
- Admin is also able to **delete any approved movies** 
    - Also a preventive measure
- Finally, an Admin is the only one with permission to **register a new volunteer**

*The following picture is a full page screenshot of admin page*
![Picture of Admin page](ReadMePics\KudumbaPadam-admin.png)
