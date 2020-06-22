# d3 select bug
## Works:
### install  4.0.0-next.6 with yarn
```json
{
    "fuse-box": "4.0.0-next.6"
}
```
run `yarn start100`, wheel zoom on dots - its zoomed

## Exception

### install  4.0.0-next.439 with yarn
```json
{
    "fuse-box": "4.0.0-next.439"
}
```
run `yarn start`, wheel zoom on dots - its throws exception
```
vendor.js:18817 Uncaught TypeError: Cannot read property 'ctrlKey' of null
    at SVGSVGElement.defaultFilter (vendor.js:18817)
    at SVGSVGElement.wheeled (vendor.js:18948)
    at SVGSVGElement.<anonymous> (vendor.js:19567)
```