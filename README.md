# MemePasMal
**__Présentation :__**

Connaissez-vous Make It Meme ? Eh bien c'est comme Make It Meme mais c'est Meme Pas Mal ! Si vous ne connaissez pas Make It Meme, c'est très simple. L'objectif est d'affronter vos amis en créant vos propres memes, faites votre possible pour créer les memes les plus originaux et les plus drôles possibles afin de terminer en 1ère position. C'est le jeu idéal si vous avez un message un peu délicat à faire passer à vos amis tout en s'amusant.

Cette application Web a été dévéloppée en JavaScript en utilisant Express JS, ce projet combine à lui-même le principe de Web Sockets avec socket.io, l'utilisation de l'API imgflip et les views EJS avec un front attractif.

**__Lancement :__**

Pour lancer l'application rien de plus simple, il suffit d'accéder au fichier "MakeItMeme" en effectuant la commande "cd MakeItMeme", une fois cette action achevée vous devez effectuer la commande "npm start". Dès que le programme sera lancé, il vous faudra aller dans votre navigateur et vous rediriger vers "http://localhost:3000/". Quand vous y serez, félicitations et bon jeu à vous ! 

**__Fonctionnement global et arborescence :__**

Au sein du premier dossier l'application qui est "bin", vous pourrez retrouver le fichier "www" qui contient la logique de base ainsi que les bases de l'application telles que la mise en place du serveur, la gestion des web sockets, le nombre de manches, le timer, etc...

Comme son nom l'indique, le dossier "node_modules" contient tous les modules qui permettent à l'application de fonctionner avec Node JS, qui est notre environnement de développement dans ce projet.

Dans le dossier public se trouve un dossier "images" où se trouve l'ensemble des photos de profil, un dossier "javascripts" contenant le code afin que toutes les fonctionnalités du visuel fonctionnenent, ces fichiers sont répartis par page du même nom que les views et le fichier "api.js" comprend la gestion de l'API imgflip. Le dossier "stylesheets" contient tous les fichiers CSS servant à la mise en page et à la décoration de toutes les pages de l'application qui sont également nommés en fonction des views.

Le dossier "routes" sert à la redirection des différentes pages en établissant les routes de chaque pages et le dossier "views" contenant les codes HTML qui servent à la structure de base des pages.

Le fichier "app.js" contient la gestion du framework Express JS avec le système de routage des pages.

Les fichiers "package-lock-json" et "package.json" contiennent les dépendances des différents modules avec leur version.

**Il est fortement recommandé de ne pas toucher au dossier "node_modules" ainsi qu'aux fichiers "package-lock-json" et "package.json" !**
