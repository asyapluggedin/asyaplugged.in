+++
title = "Hello World: Welcome to Asya's blog"
date = "2022-07-11"
description= "First post on the blog."
weight = 3
[taxonomies]
tags = ["writing"]
category = ["blog"]

[extra]
math = true
+++

Hello, and welcome to my website, specifically my blog.

<!--more-->
## What's going on with the whole "do you know love" thing?

So, when I was first learning programming, I made a [game](https://github.com/asyapluggedin/process) in Processing. I wanted to make a peculiar online psychology quiz, so one of the questions was "Do you know love?" with the only answer being an hard-to-click "YES". I was inspired by Lacan's contention that jouissance is a phenomenon unknowable to humans, but as I needed some sort of "click" interaction to trigger the next question screen, I asked the question not about jouissance, but rather something more people are familiar with, love.

<img src="https://asyaplugged.in/assets/process-love-level.png" alt="Level Image" width="300">

Shortly thereafter, I put the graphic from that quiz on the splash page of my old website, [xnast.asia](https://web.archive.org/web/20220000000000*/http://xnast.asia/). You could only enter the website if you successfully clicked "YES". This was back in 2016. In 2022, I decided to make the website that you are currently on. I knew I wanted to have four different sections:

1. info / about me
2. portfolio / work case studies
3. blog
4. page of things that i love.

I had an epiphany while gathering the inspiration and ideas for the design and development of [asyaplugged.in](https://asyaplugged.in/)
# Blockquotes

The blockquote element represents content that is quoted from another source,
optionally with a citation which must be within a `footer` or `cite` element,
and optionally with in-line changes such as annotations and abbreviations.

#### Blockquote without attribution

> Tiam, ad mint andaepu dandae nostion secatur sequo quae. **Note** that you can
> use _Markdown syntax_ within a blockquote.

#### Blockquote with attribution

> Don't communicate by sharing memory, share memory by communicating.</p> —
> <cite>Rob Pike[^1]</cite>

# Tables

Tables aren't part of the core Markdown spec, but Hugo supports supports them
out-of-the-box.

| Name  | Age |
| ----- | --- |
| Bob   | 27  |
| Alice | 23  |

#### Inline Markdown within tables

| Inline&nbsp;&nbsp;&nbsp; | Markdown&nbsp;&nbsp;&nbsp; | In&nbsp;&nbsp;&nbsp;                | Table  |
| ------------------------ | -------------------------- | ----------------------------------- | ------ |
| _italics_                | **bold**                   | ~~strikethrough~~&nbsp;&nbsp;&nbsp; | `code` |

# Code Blocks

#### Code block with backticks

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

#### Code block indented with four spaces

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Example HTML5 Document</title>
    </head>
    <body>
      <p>Test</p>
    </body>
    </html>

# List Types

#### Ordered List

1. First item
2. Second item
3. Third item

#### Unordered List

- List item
- Another item
- And another item

#### Nested list

- Item
  1. First Sub-item
  2. Second Sub-item

# Other Elements — abbr, sub, sup, kbd, mark

<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.

H<sub>2</sub>O

X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>

Press <kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd> to end the session.

Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and
other small creatures.

# Katex

$$
f(x) = \int\_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$

$$
x_1 \\
x_2 \\
x_3
\%
$$



# Media

## Images

![Image Backgorund](../assets/test.png) 
![Another Media]()

![Media CDN](https://plchldr.co/i/1280x720?bg=2ecc40)

{% hint style="warning" %} 123 {% endhint %}

[^1]:
The above quote is excerpted from Rob Pike's
[talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest,
November 18, 2015.
