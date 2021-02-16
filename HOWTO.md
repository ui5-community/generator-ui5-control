# how to use this template repository

## manually building the final custom control template

1. on github.com or via the gh cli,  
create a new repository via the template `template-ui5-control`
2. clone your new repo
3. `cd` into your new repo and run  
  `node build.js your.name.space`
4. the final temple for your ui5 custom control gets built into `./build`
5. use `./build/**/*` as the base for your custom control development
