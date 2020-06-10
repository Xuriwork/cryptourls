import dateparser
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from slugify import slugify

URL = 'https://swissborg.com/blog'
page = requests.get(URL)
soup = BeautifulSoup(page.content, 'html.parser')
results = soup.find(class_='cms-grid-list w-dyn-items w-row')
articles = results.find_all('div')

featured_post = soup.find(class_='blog-featured')
anchor_element = featured_post['href']
title_element = featured_post.find('h5')
date = featured_post.find(class_='caption grey date-stamp')

article_link = 'https://swissborg.com' + anchor_element
article_title = title_element.text.strip()
stripped_date = date.text.strip()

print(article_link)
print(article_title)
print(stripped_date)
print()

for article in articles:
    title_element = article.find('p', class_='p1')
    anchor_element = article.find('a', class_='box-shadow blog w-inline-block')
    date_element = article.find(class_='caption grey date-stamp')

    if None in (title_element, anchor_element, date_element):
        continue

    article_link = 'https://swissborg.com' + anchor_element['href']
    article_title = title_element.text.strip()
    stripped_date = date_element.text.strip()
    article_date = str(dateparser.parse(stripped_date))[0:10]

    print(article_date)
    
