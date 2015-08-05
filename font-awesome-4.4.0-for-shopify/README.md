# Shopify-Font-Awesome

Just as the name suggest. It's Font Awesome 4.4.0 ready to go in a shopify theme project.

## Setup

drop dat font-awesome.min.css in the assets folder as well all the font files

### Implement

Add to theme.liquid in the header.

```liquid
  {{ 'font-awesome.min.css' | asset_url | stylesheet_tag }}
```

### For more info

Check out the official site: [http://fontawesome.io](http://fontawesome.io)