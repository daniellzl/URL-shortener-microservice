# URL Shortener Microservice

This website allows user to pass in a URL as a parameter and receive a shortened URL in response. When user visits the shortened URL, it will redirect to the original link. If an invalid URL is passed that doesn't follow the http://www.example.com format, an error will occur.

## Website

https://url-shortener-dlzl.herokuapp.com

## Example Usage

https://url-shortener-dlzl.herokuapp.com/https://wikipedia.org

outputs

```javascript
{"original_url":"https://wikipedia.org","short_url":"https://url-shortener-dlzl.herokuapp.com/6308"}
```
    
and

https://url-shortener-dlzl.herokuapp.com/6308
    
redirects to

https://wikipedia.org
    
## Credit
    
https://www.freecodecamp.com/challenges/url-shortener-microservice