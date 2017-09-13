# URL Shortener

Allows user to pass in a URL as a parameter and receive a shortened URL in response. When user visits the shortened URL, it will redirect to the original link. If an invalid URL is passed that doesn't follow the 'http://www.example.com' format, an error will occur.

[Live Application](https://url-shortener-dlzl.herokuapp.com)

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

### Project Goals

Application was completed as a freeCodeCamp [challenge](https://www.freecodecamp.org/challenges/url-shortener-microservice).

1. User Story:  I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

2. User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

3. User Story: When I visit that shortened URL, it will redirect me to my original link.

### Technologies

* express
* mongodb
* pug
* valid-url
