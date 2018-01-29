

1. Es una aplicación que utilizamos en eventos, 
2. consiste en una serie de preguntas con 2, 3 o 4 respuestas a elegir de las que una es la correcta. 
3. El usuario tiene 15 segundos para contestar cada pregunta 
4. La puntuación depende del numero de respuestas de la pregunta y del tiempo que se ha empleado en contestarla
5. La puntuación del conjunto de preguntas se lleva en local en la app y se sube finalmente a unos servicios REST desarrollados en Python. 
6. Finalmente se muestra el ranking de los jugadores, que se obtiene de otro servicio de la misma API, con la posición del jugador dentro del mismo.


 

El usuario se identifica con su LDAP contra nuestros sistemas de información. 

La aplicación solo puede ejecutarse si el teléfono está conectado a una determinada SSID. 

A la aplicación solo se puede acceder en una determinada fecha a partir de una determinada hora. 

El conjunto de preguntas solo se puede contestar una vez, una vez se le muestra el ranking, en posteriores accesos se le vuelve a mostrar directamente el ranking.


Actualmente realizamos una nueva versión de la aplicación para cada evento ya que las preguntas las cargamos en un SQLite, ajustamos la fecha y hora a partir de la cual se puede ejecutar en el código y generamos una nueva versión.

La idea sería migrar a OpenShift y ver que `nos aporta RHMAP para realizar este tipo de aplicaciones que negocio nos pide prácticamente de un día para otro. Y generalizar la misma aplicación para cualquier evento, de manera que se descargue la configuración (fecha y hora de activación, SSID a la que debe estar conectado, preguntas y sus respuestas) de un backend que se creará para este fin.


1. Login => El acceso es un proceso en 2 pasos:
- Autenticación
- Autorización (WIFI OK + Fecha/Hora OK)
- Si algo falla se muestra el error (credenciales erroneas o no hay juego en marcha)

2. 'Welcome' o Ranking si ya se han intentado anteriormente

3. Iniciar Juego (si no se ha iniciado anteriormente):
- Pantalla por pregunta actual
    - Siguiente si: 15 segundos o si se ha respondido
- Al terminar se envian las respuestas... o las enviamos según se van respondiendo?

4. Fin de juego
- Mostrar ranking

