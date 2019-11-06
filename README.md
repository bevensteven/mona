# mona 🎨
Bring art into your editor!

## Inspiration
Ever go to an art museum and see a painting and think, wow the color palette here would look great in my text editor! Yeah, didn't think so 😩 but if you are now interested in doing just that, use `mona`! Imagine taking Van Gogh's starry night, and bringing it into your editor:

![Starry Night](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/2560px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg)

With `mona` you can transform your favorite pieces of art into an importable color theme for your VS Code environment.

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

## Future Improvements
- `mona` currently uses `node-vibrant` to extract a color palette from images – this can be quite limiting in that only 6 colors are available.
- The logic and equations used to compute the foreground and background colors for the color scheme is quite rudimentary. More research on color theory and maths would make this logic more reasonable.
- More colors can be added to the color theme. Currently `mona` only adds colors for basic scheme token types.
- The project can leverage more modern developer tools.
- Features can be added to make `mona` more sophisticated and overall better at generating color schemes that better resembles the art/image it was given.

