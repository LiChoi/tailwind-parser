To start up locally, enter into terminal:
```

npm start

```

You can call the api like so:

```

fetch(
  "http://localhost:3000/",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ htmlFragment: document.querySelector("body").outerHTML })
  }
).then((res) => res.json()).then((data) => {
  // css string in data.css
});

```

The "get" root path is where you can test out various tailwind classes, and you can see in live-time
whether or not the api is able to correctly set the css.