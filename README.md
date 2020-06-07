
## Heads up:
The Strapi API is being temporarily hosted on a free Heroku instance. Expect loading times to be longer than usual.


# React Gallery

This image gallery is part of a larger project to upgrade https://socakes.co.uk, a website for a local cake business. 

The goal was to add a CMS and improve performance of the image gallery.

This project was built using React, Gatsby and Strapi. Cloudinary was used for image hosting.


## The Problems

1. The existing website loads all gallery images in one go. This wasn't much of an issue when I first built the site, but the number of images is growing. With each batch of new photos added, the Google Lighthouse performance score worsened. The current version of the website has a performance score of 76, a Time to Interactive of 6.3 seconds and a transfer size of 4.4MB.

2. The business owner needs my intervention to add new photos

3. Only one image per cake is currently supported

4. Details like cake name and description aren't visible on mobile devices.


## Adding a CMS

The goal was to integrate a CMS so the business owner can update the gallery herself without any code.

Strapi was chosen as the CMS. The process of adding new content had to be easy and intuitive. As images are the main source of content, the form had to be customised to only have the required fields:
- Images
- Title
- Description
- Alt Text

I experimented with Wordpress first. The Advanced Custom Fields plugin couldn't offer multiple images per post and the admin interface was cluttered. Images wouldn't show up in the preview, as the template wasn't set up to display custom fields. I ended up abandoning Wordpress because I knew content management would be frustrating.


## UI Design

I wanted the user to be able to view multiple images per post and be able to see the title and description on all devices. For this, I designed a modal window and used Styled Components to change the layout between mobile and desktop views.

Now that images were clickable on mobile devices, images on the gallery grid no longer needed to be full width. I changed the layout from 1 column to 2 column, which halved the required resolution of images. Strapi returns image URLs at 3 sizes. The smallest (400px) was suitable for both thumbnails and the preview. On large devices, a larger format is requested for the preview.

I wanted users to be able to click/tap outside the modal to close it. In React, this is a good use case for UseRef.

I chose Glider.js for the carousel. While Swiper.js has more options Glider was a smaller library (2.8kB gzipped).


## Infinite Scroll

I wanted to minimise the number of clicks/taps to view all content while keeping the request size small.

I used an intersection observer to detect when the 4th last image entered the viewport, and trigger a load of 4 additional images. After the event, useCallback was used to remove the existing intersection observer and add one to the new 4th-last image.


## Results

A Google Lighthouse audit gave a performance score of 92 (up from 76).

Time to Interactive decreased from 6.3s to 2.8s (56% reduction)

Transfer size decreased from 4.4MB to 272kB (94% reduction).






