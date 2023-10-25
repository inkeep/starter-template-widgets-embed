# Getting Started with Inkeep Widget Library (js snippet)

## To run this sandbox

### Install deps

```
npm install
```

### Add environment variables

See .env.sample for necessary env vars

### Start the dev server

```
npm run dev
```

## To get started integrating into your own app

### Add our js snippet and styles

```

<!-- widget script (required) -->
<script
  type="module"
  src="https://unpkg.com/@inkeep/widgets-embed@latest/dist/embed.js"
  defer
></script>
```
NOTE:
vist https://unpkg.com/@inkeep/widgets-embed@latest/dist/embed.js
and replace @latest with current version, example: https://unpkg.com/@inkeep/widgets-embed@0.0.5/dist/embed.js
to avoid any possible breaking changes


### Call the embed function
```
const inkeepWidget = Inkeep.embed({
  componentType: 'ChatButton', // required, options: 'ChatButton', 'EmbeddedChat', 'SearchBar', 'CustomTrigger'
  targetElement: document.getElementById('inkeep-placeholder'), // required, HTML element to render the widget into
  stylesheetUrls: [
    '/widget-overrides.css', // optional custom stylings
  ],
  properties: {
    baseSettings: {
      integrationId: envConfig.INTEGRATION_ID || '', // required
      apiKey: envConfig.API_KEY || '', // required
      organizationId: envConfig.ORGANIZATION_ID || '', // required
      //... optional base settings
    },
    aiChatSettings: {
      // optional ai chat settings
    },
    searchSettings: {
      // optional search settings
    },
    modalSettings: {
      // optional modal settings
    }
  }
});
```

### Customize the component
In 
`Inkeep.embed({...props})`

Aside from `componentType` and `targetElement`, the `props` are the same type as seen in any of the React components:
- [Chat Button](https://docs.inkeep.com/react-components/chat-button)
- [Search Bar](https://docs.inkeep.com/react-components/search-bar)
- [Embedded Chat](https://docs.inkeep.com/react-components/embedded-chat)
- [Custom Trigger](https://docs.inkeep.com/react-components/custom-trigger)

### Share base settings across components

If you have multiple components on the same page, it might be convenient to instantiate an Inkeep object with the same base settings. 

```
const inkeep =  Inkeep({
  // baseSettings here
  integrationId: envConfig.INTEGRATION_ID || '', // required
  apiKey: envConfig.API_KEY || '', // required
  organizationId: envConfig.ORGANIZATION_ID || '', // required
  organizationDisplayName: 'Inkeep',
  primaryBrandColor: 'black',
  userId: '', // if you'd like analytics by user ID, like in cases where the user is authenticated or you have your own analytics platform
  userEmail: 'dev@inkeep.com',
  userName: 'Inkeep',
  optOutAllAnalytics: false,
  optOutAnalyticalCookies: false,
  optOutFunctionalCookies: false,
});
```

You can then use inkeep.embed() multiple times with the same base settings

### Syncing with dark mode and changing props after the initial render
This can vary depending on the platform. You can use the `render` method to update an instance of the component with new properties, like the colorMode.

```
colorModeToggle.addEventListener('change', (e) => { // whatever logic you use to track the color mode
  const newColorMode = e.target.value;

  const currentBaseSettings = inkeepWidget.baseSettings

  inkeepWidget.render({
    baseSettings: {
      ...currentBaseSettings,
      theme: {
        ...currentBaseSettings.theme,
        colorMode: {
          forcedColorMode: colorMode === "dark" ? "dark" : "light",
        }
      }
  });
});
```

