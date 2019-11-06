# mona 🎨
Bring art into your editor!

## Inspiration
This project was inspired by pleasant color palettes one would find on various works of art. It seeks to bring these palettes into your everyday development environment. Inspired by _A Starry Night_? Run `mona` on it and generate a color theme you can use in your VS Code environment.

## Usage
`mona` is currently a simple CLI tool that takes an image file as an input and outputs a `.json` file that provides colors for the fundamental scheme tokens in your editor. 

`mona [path to your image file]`

## Try it out
To try it out, follow these steps:
```
# clone this project
git clone https://github.com/bevensteven/mona.git

# cd into it and install its dependencies
cd mona && npm install

# run the mona executable, you may need to make it an executable first
chmod +x mona && ./mona saatchi_art_sample.png
```

