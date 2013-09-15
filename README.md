# Sasstastic.
**Sasstastic** is a supremely fantastic CSS sassifier. 

Won Best Design at [HackCMU 2013](http://www.hackcmu.com).

## Description
Sasstastic takes in repetitive CSS like this:
```CSS
html {
    background-color: #ffefef;
    color: #000000;
    font-size: 12px;
}

.awesome-div h1 {
    color: black;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-left: 1em;
}

.awesome-div h2 {
    color: rgb(255, 204, 0);
    font-size: 21px;
    margin-left: 5em
}

.awesome-div h3 {
    color: #444444;
    font-size: 18px;
    margin-left: 7em;
}

.awesome-div p {
    color: blue;
    line-height: 1.5;
}

p {
    margin-left: 2em;
}
```
and converts it into neat, nested Sass with variables:
```SCSS
$background-color: rgba(255,239,239,1);
$text-color: rgba(0,0,0,1);
$body-font-size: 12px;

html {
    background-color: $background-color;
    color: $text-color;
    font-size: $body-font-size;
}
.awesome-div {
    h1 {
        color: $text-color;
        font-size: 2*$body-font-size;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin-left: 1em;
    }
    h2 {
        color: rgba(255,204,0,1);
        font-size: 1.75*$body-font-size;
        margin-left: 5em;
        
    }
    h3 {
        color: rgba(68,68,68,1);
        font-size: 1.5*$body-font-size;
        margin-left: 7em;
    }
    p {
        color: blue;
        line-height: 1.5;
    }
}
p {
    margin-left: 2em;
}
```
## Contributors
* [Alexandra Johnson](https://github.com/alexandraj777)
* [Taylor Poulos](http://www.tpoulos.me/)
* [Tom Shen](http://www.tomshen.me/)
