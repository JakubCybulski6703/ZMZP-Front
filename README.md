Projekt front-end na Zwinne Metody Zarządzania Projektami

node v710.15.3, npm 6.4.1, Angular CLI: 7.3.6,

Package Version @angular-devkit/architect 0.13.6,
@angular-devkit/core 7.3.6, @angular-devkit/schematics 7.3.6,
@schematics/angular 7.3.6,
@schematics/update 0.13.6 rxjs 6.3.3, typescript 3.2.4,

ikony z angular material,
layout z wykorzystaniem Materialize,
mapa z Here Maps,

Aktualnie dodany został panel logowania, rejestracji oraz główny panel z mapą oraz wyświetlaniem danych profilowych. Aby przejść do głównego panelu wystarczy wpisać dowolne znaki a dodany Interceptor zwróci token oraz pobierze dane użytkownika (na te chwile przed podpięciem restów).

odpalamy poprzez :

1. npm install
2. ng serve