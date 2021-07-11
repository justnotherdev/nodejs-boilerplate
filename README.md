# NodeJS-Boilerplate Project

Este es un proyecto base NodeJS configurado para desarrollo local al cual se le aplicaron ciertas guias de diseño para mantener una estructura del código estándar para todos los desarrolladores.

Se configuró y probó principalmente en Visual Studio Code (VS Code)

## Detalles del Proyecto

---

-   Versión de NodeJS Utilizada: **v14**

-   Liberias Principalmente Utilizadas:

    1.  @sap/xsenv
        -   permite la interacción con el archivo default-env.json y con las variabels de los servicios declarados en este.
    2.  @sap/xssec
        -   permite configurar la autenticación para el backend utilizando el servicio xsuaa de SAP BTP
    3.  atob y btoa
        -   permite realizar transformaciones de base64
    4.  axios
        -   premite realizar peticiones http
    5.  express
        -   framework para levantar el servidor web
    6.  module-alias
        -   permite configurar un alias para las rutas a distintos archivos (**@/ruta1/ruta2/**)
    7.  passport
        -   permite configurar la autenticación para el servidor web
    8.  reflect-metadata
        -   permite activar ciertas caracteriscticas para la "Inyección de Dependencias" usando TypeScript como los decoradores (Decorators)
    9.  tsyringe
        -   permite utilizar el concepto de Inyección de Dependencias" de forma mas limpia en el proyecto.
    10. winston
        -   permite registrar una diversidad de logs

<br>

-   Gestor de Paquetes:

    -   Yarn -> ( [¿Porque no NPM?](https://www.whitesourcesoftware.com/free-developer-tools/blog/npm-vs-yarn-which-should-you-choose/#:~:text=During%20the%20installation%20process%2C%20Yarn,download%20of%20previously%20downloaded%20packages) )

<br>

-   VS Code Plugins
    -   Prettier
    -   ESLint
    -   EditorConfig for VS Code

Se utilizaron configuraciones para Prettier, ESLint y EditorConfig para poder mantener un código uniforme tanto al desarrollar como al enviar al repositorio. [¿Cual es la diferencia?](https://stackoverflow.com/questions/48363647/editorconfig-vs-eslint-vs-prettier-is-it-worthwhile-to-use-them-all)

-   CommitLint & Husky

    -   Se configuró commit commitlint y husky para definir una estructura para los commits a realizar.

    -   Esta estructura consta de dos elementos principales, uno llamado type y otro subject. El type es la razón principal de este commit, se especifica al inicio del mensaje y estos pueden ser:

        -   **feat, fix, refactor, test, setup**

    -   Por otra parte, el subject es el mensaje en si, detallando brevemente lo que se añadió, arregló, refactorizó, testeó o configuró.

    ```bash
    git commit -m "fix: error en generación de archivo pdf"
    ```

    -   De ingresar otra estructura no se permitirá hacer un commit al repositorio.

<br>

---

<br>

## Explicación a Fondo del Proyecto

Explicar la estructura de Clean Architecture => TODO

Explicar la Inyección de Dependencias => TODO
