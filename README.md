This project is a web scraper that retrieves scorecard information using an application number and date of birth. It leverages Axios for HTTP requests, qs for query string formatting, and Cheerio for HTML parsing.

Features:
 1. Fetches scorecard details (marks etc.).
 2. Handles a range of dates to find the correct date of birth for a given roll number.
 3. Parses and extracts important information from the HTML response.

Usage:
To use the scraper, call the main function with the roll number. The scraper will attempt to find the scorecard details by iterating through possible dates of birth.
Eg: main('7364726487324')

Dependencies:
 1. axios: For making HTTP requests.
 2. qs: For formatting query strings.
 3. cheerio: For parsing HTML responses.

Eg. Snippet : 

   <img width="638" alt="Screenshot 2024-06-13 at 1 15 03 AM" src="https://github.com/ashusoni24/Scrapping-website/assets/147245967/c94b48e2-66ff-49b7-a2f4-8ce606696fda">

    
