import dateparser
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from slugify import slugify
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {
    'projectId': 'cryptourls',
})

db = firestore.client()


def coindesk():

    URL = 'https://www.coindesk.com/tag/markets-bitcoin'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find('section', class_ = 'list-body')
    articles = results.find_all('div', class_ = 'list-item-wrapper')

    for article in articles:
        title_element = article.find('h4', class_ = 'heading')
        time_element = article.find('time', class_ = 'time')
        link_element = article.findAll('a')[1]['href']

        if None in (title_element, time_element, link_element):
            continue
        article_title = title_element.text.strip()
        article_date = time_element.text.strip()
        document_title = slugify(article_title, to_lower = True, max_length = 60)
        article_link = 'https://www.coindesk.com' + link_element

        scrapped_articles_ref = db.collection(
            'scrapped_articles').document(document_title)
        scrapped_articles_ref.set({
                'publisher': 'CoinDesk',
                'document_title': document_title,
                'article_title': article_title,
                'article_date': article_date,
                'article_link': article_link
        })


def crypto_potato():

    URL = 'https://cryptopotato.com/crypto-news'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find(id = 'list-items')
    articles = results.find_all('article')

    for article in articles:
        title_element = article.find('h3', class_ = 'media-heading')
        author_element = article.find('a', {
            'rel': 'author'
        })
        time_element = article.find('time')['datetime']
        article_link = title_element.find('a')['href']

        if None in (title_element, author_element, time_element, article_link):
            continue
        article_title = title_element.text.strip()
        article_author = author_element.text.strip()
        article_date = time_element
        document_title = slugify(article_title, to_lower = True, max_length = 60)

        scrapped_articles_ref = db.collection(
            'scrapped_articles').document(document_title)
        scrapped_articles_ref.set({
                'publisher': 'CryptoPotato',
                'document_title': document_title,
                'article_title': article_title,
                'article_author': article_author,
                'article_date': article_date,
                'article_link': article_link
        })


def news_btc():

    URL = 'https://www.newsbtc.com'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    articles = soup.find_all('article')

    for article in articles:
        title_element = article.find('h2', class_ = 'title')
        time_element = article.find('span', class_ = 'time')
        article_link = article.find('a')['href']

        if None in (title_element, time_element, article_link):
            continue
        article_title = title_element.text.strip()
        article_date = str(dateparser.parse(time_element.text.strip()))[: -3]
        trimed_date = article_date.replace(' ', '')
        newformat_date = trimed_date[: 10] + 'T' + trimed_date[10: ]
        date_time_obj = datetime.strptime(newformat_date, "%Y-%m-%dT%H:%M:%S.%f")
        formated_date = date_time_obj.strftime("%Y-%m-%d")
        document_title = slugify(article_title, to_lower = True, max_length = 60)

        scrapped_articles_ref = db.collection(
            'scrapped_articles').document(document_title)
        scrapped_articles_ref.set({
            'publisher': 'NewsBTC',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': formated_date,
            'article_link': article_link
        })

def bitcoin_news():
    URL = 'https://news.bitcoin.com'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    result = soup.find_all(class_='story story--medium')

    for article in result:

        article_link = article.find('a')['href']
        title_element = article.find('h6', class_='story__title')
        date_element = article.find('div', class_='story__footer').find('span')

        if None in (title_element, article_link, date_element):
            continue
        article_title = title_element.text.strip()
        stripped_date = date_element.text.strip()
        article_date = str(dateparser.parse(stripped_date))[0:10]
        document_title = slugify(article_title, to_lower=True, max_length=60)

        scrapped_articles_ref = db.collection(
            'scrapped_articles').document(document_title)
        scrapped_articles_ref.set({
            u'publisher': u'Bitcoin News',
            u'document_title': document_title,
            u'article_title': article_title,
            u'article_date': article_date,
            u'article_link': article_link
        })

def eosio_news():
    URL = 'https://eos.io/news'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    result = soup.find(class_='post-grid')
    articles = result.find_all('article')

    for article in articles:
        article_link = article.find('a')['href']
        title_element = article.find('h2', class_='entry-title')
        date = article.find('time')['datetime']

        if None in (title_element, article_link, date):
            continue

        article_title = title_element.text
        article_date = str(dateparser.parse(date))[0:10]
        document_title = slugify(article_title, to_lower=True, max_length=60)

        scrapped_articles_ref = db.collection(
            'scrapped_articles').document(document_title)
        scrapped_articles_ref.set({
            u'publisher': u'EOSIO',
            u'document_title': document_title,
            u'article_title': article_title,
            u'article_date': article_date,
            u'article_link': article_link
        })

def ethereumworldnews():
    URL = 'https://en.ethereumworldnews.com'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    articles = soup.find_all('article')

    for article in articles:
        
        title_element = article.find('h3', class_='title')
        article_link = title_element.find('a')['href']
        time_element = article.find('time')

        if (time_element is not None):
            date = time_element['datetime']
            article_title = title_element.text.strip()
            article_date = str(dateparser.parse(date))[0:10]
            document_title = slugify(article_title, to_lower=True, max_length=60)

            scrapped_articles_ref = db.collection(
                'scrapped_articles').document(document_title)
            scrapped_articles_ref.set({
                u'publisher': u'Ethereum World News',
                u'document_title': document_title,
                u'article_title': article_title,
                u'article_date': article_date,
                u'article_link': article_link
            })


def web_scrapper(event, context):
    coindesk()
    crypto_potato()
    news_btc()
    bitcoin_news()
    eosio_news()
    ethereumworldnews()