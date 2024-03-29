# Inkeep Widget JS Library

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

See [index.html](https://github.com/inkeep/starter-template-widgets-embed/blob/main/index.html) for the example config.

## To get started integrating into your own app

### Add the Inkeep JS snippet

```

<!-- widget script (required) -->
<script
  type="module"
  src="https://unpkg.com/@inkeep/widgets-embed@<version>/dist/embed.js"
  defer
></script>
```
NOTE:
vist https://unpkg.com/@inkeep/widgets-embed@latest/dist/embed.js
and replace `@<version>` with the current latest version, example: `https://unpkg.com/@inkeep/widgets-embed@0.2.215/dist/embed.js`. 

### Basic example

Within a `<script type="module"> {{ code here }} </script>` tag, use the `embed()` function to insert one of our components into an HTML element on the page.

```
const inkeepWidget = Inkeep().embed({
  componentType: 'ChatButton', // required, options: 'ChatButton', 'EmbeddedChat', 'SearchBar', 'CustomTrigger'
  targetElement: document.getElementById('inkeep-placeholder'), // required, HTML element to render the widget into
  properties: {
    stylesheetUrls: [
      '/widget-overrides.css', // optional custom stylings
    ],
    baseSettings: {
      integrationId: envConfig.INTEGRATION_ID || '', // required
      apiKey: envConfig.API_KEY || '', // required
      organizationId: envConfig.ORGANIZATION_ID || '', // required
      organizationDisplayName: 'Inkeep',
      primaryBrandColor: 'black'
      //... optional base settings
    },
    aiChatSettings: {
      // optional
    },
    searchSettings: {
      // optional 
    },
    modalSettings: {
      // optional
    }
  }
});
```

### Customize the component
In 

`Inkeep().embed({...props})`

Aside from `componentType` and `targetElement`, the `props` are the same type as seen in any of the React components:
- [Chat Button](https://docs.inkeep.com/react-components/chat-button)
- [Search Bar](https://docs.inkeep.com/react-components/search-bar)
- [Embedded Chat](https://docs.inkeep.com/react-components/embedded-chat)
- [Custom Trigger](https://docs.inkeep.com/react-components/custom-trigger)

For example, custom 'aiChatSettings' often include:
```
{
...otherProps,
aiChatSettings: {
    chatSubjectName: '{Company or Product Name}',
    quickQuestions: [
      'Example question 1',
      'Example question 2',
    ],
    botAvatarSrcUrl: 'https://mydomain.com/icon',
    botAvatarDarkSrcUrl: 'https://mydomain.com/dark_icon',
    getHelpCallToActions: [
      {
        url: 'http://github.com/{org}',
        name: 'GitHub',
        icon: { builtIn: 'FaGithub' }
      },
      {
        name: 'Community',
        url: 'https://mycommunity.com',
        icon: { builtIn: 'IoPeopleOutline' }, // FaDiscourse, FaSlack, FaDiscord, IoHelpBuoyOutline, IoMail and others also available
      },
    ],
  }
}
```

### Share base settings across components

If you have multiple components on the same page, it might be convenient to instantiate an Inkeep object with the same base settings. 

```
const inkeepBase =  Inkeep({
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

You can then use `inkeepBase.embed()` to instantiate different components with the same base settings.

### Syncing with dark mode and changing props after the initial render
How color mode is changed van vary per web app platform. Regardless, you can use the `render` method to update an instance of the component with any new properties, like `colorMode`.

**Example**:
```
colorModeToggle.addEventListener('change', (e) => { // whatever logic you use to track the color mode
  const newColorMode = e.target.value;

  inkeepWidget.render({
    baseSettings: {
      theme: {
        ...inkeepWidget.baseSettings.theme,
        colorMode: {
          forcedColorMode: colorMode === "dark" ? "dark" : "light",
        }
      }
  });

});
```

