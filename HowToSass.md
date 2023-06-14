# Tutorial implementação sass em projeto next.js

Após criar o projeto next, acesse a pasta raiz e rode o comando:

```sh
npm install --save-dev sass
```


Ao rodar o comando para instalar o sass, devemos incluir o compilador do saas nos arquivo **next.config.js**.

```sh
/** @type  {import('next').NextConfig} */

const  path  =  require('path')

const  nextConfig  = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
}

module.exports  =  nextConfig
```

> Basta copiar este código e colar no arquivo. A única diferença é o código adicional, que será necessário para fazer o sass rodar.


O próximo passo é criar a pasta **styles** na raíz do projeto, e mover os arquivos **globals.css** e **page.module.css** para esta pasta. Após fazer isso, é só alterar a extensão dos arquivos para **.scss**.

> <mark>**NÃO** esqueça de alterar as importações destes arquivos nos respectivos componentes ou arquivos *.tsx* que estejam utilzando-os.</mark>

A raiz do projeto deve ficar assim:
```sh
  .
  ├── 📁.next (caso já tiver rodado o projeto ao menos 1 vez)
  ├── 📁node_modules
  ├── 📁public
  ├── 📁src
  ├── 📁styles
  ├── .eslintrc.json
  ├── .gitignore
  ├── next-env.d.ts
  ├── next.config.js
  ├── package-lock.json
  ├── package.json
  ├── README.md
  └── tsconfig.json