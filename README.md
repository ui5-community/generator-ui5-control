# generator for a UI5 custom control

## use w/ yeoman locally

```bash
$> npm i -g yo
$> yo ./path-to-this-repo/app

     _-----_     ╭──────────────────────────╮
    |       |    │  Welcome to the amazing  │
    |--(o)--|    │   UI5 custom control     │
   `---------´   │        generator!        │
    ( _´U`_ )    ╰──────────────────────────╯
    /___A___\   /
     |  ~  |
   __'.___.'__
 ´   `  |° ´ Y `

? What's the name space your custom control(s) should live in? (my.ui5.cc)
```

## use w/ options supplied

```bash
$> yo ./path-to-this-repo/app --controlNamespace=bla.fasel --buildDir=../some/dir
# will make the control live in namespace 'bla.fasel"
# and put the built control in directory `cwd` + '../some/dir'
```
