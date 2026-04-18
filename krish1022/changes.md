hello there you can delete this file and folder after reading it once, so don't worry :)

Here I will log every bug fix and change that I did, so that you dont have to read the entire commits, no need to thank me.
You may not apply some of my changes if they don't follow your vision for your portfolio, and if any change made by me is hurtful to you I'm sorry :(. 
And I tried to solve it without using any AI, so if I made an error or did something wrong lemme know because in the context of Web Developement I know only basic HTML and CSS, yes i don't know JS.

## 1. The Navigation Tool in the Stats Page
There was this **Navigation Tool** in the `stats` page, which was obviously not needed there and it was not working there also so I fixed that.
It was a simple fix I studied your code and saw that there was this Navigation Component you used directly in the `layout.js` which caused the **Navigation Tool** to appear on every page (yea if you had more pages it would have appeared there too).
To fix this what I did is, remove the Navigation from the `layout.js` and put it in the `app/page.js` script.

## 2. Fixed the Ordering of Components
According to the **Navigation Tool** and normal conventions, **Experience Component** should come before the **Contact Component**, so I made that change in the `src/page.js`. This was pretty easy compared to the last one, and I also corrected my previous mistake of putting **Navigation Component** before the **Experience Component**.

## 3. Padding in the Stats Button
This is rather a POV of mine not a bug to be fixed. The asymmetric button padding seemed to bug me and the exccessive padding also made the button large, so I reduced the paddings a little bit in the **Navigation Compoment** or `src/components/Navigation.js`.

## 4. Navigation Tool Not Tracking Contact Compoment Properly
So, when we move to the last section, which is the **Contact Component** now, the highlighted circle and the small dot below icons doesn't track it. 
It was due to the less vertical height of the component. So gave it some margin-y in the **Contact Component** or `src/components/Contact.js`. To be precise I gave the margin to the *Get In Touch* text.

## 5. Home Button on Navigation Tool Not Working And Not Tracking Home Too
This bug made my mind go round and round, I had to go look up how **Navigation Component** is tracking active section and saw that it tracks it using the `id`, so I went to other components where their `id` is mentioned and guess what, **Hero Component** didn't have it's `id` mentioned in the `section` tag, so I just added `id="hero"` and **BOOM** it works like a charm.

## 6. Beautiful Blue Ring Not Focusing on Correct Element
When we click on an element on the **Navigation Tool**, it gives it a beautiful blue ring around it, but when we scroll normally this ring never switches between elements.
The fix was simple I copied the ring css from class which was set to be triggered only when focused and removed the focus part and put it in the `activeSession === item.id` css.

## 7. Ring Staying
So when we clicked on some icon in the **Navigation Tool**, a ring came around it, but when we scrolled the ring stayed there and another ring came for the active icon, so I just removed the `focus CSS` and it worked.