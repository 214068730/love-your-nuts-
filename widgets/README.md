# README #

* A basic React app that renders wigdets.
* It makes use of webpack and Babel to produce bundels of each of its widgets.
* To request a widget, an particular app must reference the bundel file in a "<script></script>" 
  tag and make provision for a corresponding "<div></div>" tag (with a specific "id" attribute) where the widget script will be loaded.   

### Installation ###

* Clone the repository

```
sh
cd ~/
git clone git@bitbucket.org:ionteam/ion-widgets-components.git --recursive
cd ion-widgets-components
npm install
```

* Configure an Nginx virtual host
```
server {
   listen 80;
   server_name data.iol.io;

   charset utf8;

   location /electionsmap/ {
      proxy_pass http://localhost:8903;
   }

}
```

* The config is not yet set

```
var config = {
   
};
```

### Execution ###
* `npm start`                - development - use http://localhost:8903

### Build ###
* `npm run build`

### Dependencies ###
* Node.js
* Babel
* React
