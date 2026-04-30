# Image Parametric EQ Experiment

This project is a playful experiment: take the kind of control surface people normally associate with **audio parametric equalizers** and apply it to an **image** instead.

You load an image, then shape it with draggable EQ-style bands. The interface feels like a familiar parametric equalizer — center frequency, gain, and width/Q — but the processing is **not implemented as ordinary image-space filtering**.

Instead, the image is transformed into the **frequency domain with an FFT** under the hood. The EQ controls are used to build a frequency-shaping curve there, and the image is reconstructed afterward.

![Image Equalize](client/public/images/image-equalizer.png)

It reads the horizontal rows of an image as single-cycle waveforms, lets you play those waveforms from your computer keyboard, a connected MIDI controller, or the on-screen piano, and shapes the result with multiple playback modes and live controls.

## Try it

[project-image-equalizer](https://mathemaudio.github.io/project-image-equalizer/)

## Why do it this way?

Traditional filters on images often introduce **phase shifts**. In audio that is often acceptable, or at least musically familiar. In images, it is usually not: phase changes can easily damage spatial structure, move edges, or create artifacts that make the result feel “wrong.”

This experiment avoids that problem by using the parametric-EQ controls only as a **way to describe magnitude changes across frequencies** while keeping the original image phase intact.

So the trick is:

- the **controls behave like filters**
- the **math is FFT-based magnitude shaping**
- the **image phase stays from the input**
- the result remains recognizably the same image, but with unusual and expressive spectral changes

## What it feels like

Think of it as:

- an **audio equalizer mindset**
- applied to **visual frequencies**
- with **live image feedback**
- without the phase problems of typical image filtering

That makes it possible to sweep through low, mid, and high spatial frequencies and get effects that range from subtle sharpening/softening to strange, graphic, almost synthetic transformations — all starting from ordinary images.

## What the app includes

- A browser-based interactive image equalizer
- Draggable overlapping parametric-style bands
- Original and processed image previews
- FFT-based processing behind the scenes
- Demo images so the effect can be explored immediately
- A live spectrum-style backdrop in the graph

## In one sentence

This is an experiment in using a **parametric equalizer UI to sculpt image frequencies via FFT magnitude shaping, while preserving phase so the image structure stays stable**.

## Running it

The client app lives in `client/`.

### Install

```bash
cd client
pnpm install
```

### Start development

```bash
pnpm dev
```

Then open the local Vite URL shown in the terminal.

### Build

```bash
cd client
pnpm build
```

## Notes

This project is best understood as an exploration, not a claim that images should literally be processed like audio. The interesting part is the mismatch:

- the user interaction model comes from audio EQ
- the target medium is an image
- the underlying implementation uses FFT-domain shaping rather than conventional spatial filters

That mismatch is exactly what makes the results fun.
