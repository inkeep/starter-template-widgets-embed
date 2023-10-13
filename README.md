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
<!-- widget styles (required) -->
<link
  rel="stylesheet"
  type="text/css"
  href="https://unpkg.com/@inkeep/widgets-embed@latest/dist/style.css"
  defer
/>

<!-- widget script (required) -->
<script
  type="module"
  src="https://unpkg.com/@inkeep/widgets-embed@latest/dist/embed.js"
  defer
></script>
```

### Initialize with base settings
```
const inkeep =  Inkeep({
  // baseSettings here
  integrationId: envConfig.INTEGRATION_ID || '', // required
  apiKey: envConfig.API_KEY || '', // required
  organizationId: envConfig.ORGANIZATION_ID || '', // required
  organizationDisplayName: 'Inkeep',
  primaryBrandColor: 'black',
  userId: '',
  userEmail: 'dev@inkeep.com',
  userName: 'Inkeep',
  optOutAllAnalytics: true,
  optOutAnalyticalCookies: true,
  optOutFunctionalCookies: true,
});
```
### Call the embed function
```
inkeep.embed({
  componentType: 'EmbeddedChat', // required, options: 'ChatButton', 'EmbeddedChat', 'SearchBar', 'CustomTrigger'
  targetElement: document.getElementById('embedded-chat'), // required HTML element to render the widget into
  properties: {
    // optional component specific settings here
    aiChatSettings: {
      placeholder: 'Ask me anything...',
      isChatSharingEnabled: true,
      shareChatUrlBasePath: 'http://localhost:5175/shared-chat',
      disclaimerSettings: {
        isDisclaimerEnabled: true,
      },
    },
    searchSettings: {
      placeholder: 'Search...',
    },
  },
});
```