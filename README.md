## What for?

It makes [Chrome extension API](https://developer.chrome.com/extensions/api_index) reactive a bit. Powered by [RxJS](https://rxjs-dev.firebaseapp.com/)

## Example

Before this library...
```javascript
chrome.tabs.onCreated.addListener(tab => {
    // some magic
});
```

After...
```typescript
import {Tabs} from 'chrome-extrx'

Tabs.onCreated().subscribe(tab => {
    // some magic
})
```

## Instaling

```
npm install chrome-extrx
```

## License

MIT