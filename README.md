# ProyectoSoftware "Tu-dú"

#Instrucciones para ejecucion
cd cliente
npm install
npm run start

#Link: https://tudu-one.vercel.app

#Usuario admin:
email: jondoe@example.com
password: 123456

#Usuario user
email: juanes@gmail.com
password: 123456


#Pipeline
En el pipeline es: inicialmente se crea un pull request, inicia a clonar el repositorio en la maquina virtual  y a configurar en entorno base 
con los npm install, luego se ejecutan las pruebas y se simula el despliegue, si las pruebas fallan el proceso se cancela y no será posible hacer
un merge a la rama main que desencadena el despliegue en la plataforma vercel.
