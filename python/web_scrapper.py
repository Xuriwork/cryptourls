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
scrapped_articles_collection_ref = db.collection('scrapped_articles')
batch = db.batch()

def coindesk():

    URL = 'https://www.coindesk.com/tag/markets-bitcoin'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find('section', class_ = 'list-body')
    articles = results.find_all('div', class_ = 'list-item-wrapper')

    for article in articles:
        title_element = article.find('h4', class_ = 'heading')
        time_element = article.find('time', class_ = 'time')
        link = article.findAll('a')[1]['href']

        if None in (title_element, time_element, link):
            continue
        article_title = title_element.text.strip()
        stripped_date = time_element.text.strip()
        article_date = str(dateparser.parse(stripped_date))[0:10]
        document_title = slugify(article_title, to_lower = True, max_length = 60)
        article_link = 'https://www.coindesk.com' + link

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
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

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
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
        stripped_date = time_element.text.strip()
        article_date = str(dateparser.parse(stripped_date))[0:10]
        document_title = slugify(article_title, to_lower = True, max_length = 60)

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'NewsBTC',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
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
        time_element = article.find('div', class_='story__footer').find('span')

        if None in (title_element, article_link, time_element):
            continue
        article_title = title_element.text.strip()
        stripped_date = time_element.text.strip()
        article_date = str(dateparser.parse(stripped_date))[0:10]
        document_title = slugify(article_title, to_lower=True, max_length=60)

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'Bitcoin News',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link
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

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'EOSIO',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link
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

            ref = scrapped_articles_collection_ref.document(document_title)
            batch.set(ref, {
                'publisher': 'Ethereum World News',
                'document_title': document_title,
                'article_title': article_title,
                'article_date': article_date,
                'article_link': article_link
            })

def crypto_briefing():
    URL = 'https://cryptobriefing.com'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find('div', class_ = 'news-list')
    articles = results.find_all('div', class_ = 'news-item')

    for article in articles:
        title_element = article.find('h3')
        article_link = article.find('a', class_='article-url')['href']
        time_element = article.find('time')['datetime']

        if None in (title_element, article_link, time_element):
            continue

        article_title = title_element.text.strip()
        article_date = time_element[0:10]
        document_title = slugify(article_title, to_lower=True, max_length=60)

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'Crypto Briefing',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link
        })


def crypto_news():
    URL = 'https://cryptonews.com'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find('div', class_ = 'cn-list cols')
    articles = results.find_all('div', class_='cn-tile row article')

    for article in articles:

        title_element = article.find('h4')
        link = article.find('a')['href']
        time_element = article.find('time')['datetime']
        
        if None in (title_element, link, time_element):
            continue

        article_title = title_element.text.strip()
        article_link = 'https://cryptonews.com' + link
        article_date = time_element[0:10]
        document_title = slugify(article_title, to_lower=True, max_length=60)

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'Crypto News',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link
        })

def decrypt():
    URL = 'https://decrypt.co'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find('ul', class_ = 'sc-17zo80w-0 jBINTv')
    articles = results.find_all('li')


    for article in articles:
        title_element = article.find('h2')
        link = article.find('a', class_='sc-18vyx5u-0 hGpPqt')['href']
        time_element = article.find('time')['datetime']

        if None in (title_element, link, time_element):
            continue

        article_link = 'https://decrypt.co' + link
        article_title = title_element.text.strip()
        article_date = time_element[0:10]
        document_title = slugify(article_title, to_lower=True, max_length=60)

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'Decrypt',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link
        })

def cryptoglobe():
    URL = 'https://www.cryptoglobe.com/latest'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find('div', class_ = 'g-mb-50--lg')
    articles = results.find_all('article')

    for article in articles:
        title_element = article.find('h3')
        link = article.find('a')['href']
        date_element = article.findAll(class_='list-inline-item')[2]

        if None in (title_element, link, date_element):
            continue

        article_link = 'https://www.cryptoglobe.com' + link
        article_title = title_element.text.strip()
        stripped_date = date_element.text.strip()
        article_date = str(dateparser.parse(stripped_date))[0:10]
        document_title = slugify(article_title, to_lower=True, max_length=60)

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'CryptoGlobe',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link
        })

def thedailyhodl():
    URL = 'https://dailyhodl.com/news/'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find('div', class_ = 'jeg_posts')
    articles = results.find_all('article')

    for article in articles:
        title_element = article.find('h3', class_='jeg_post_title')
        link = article.find('a')['href']
        date_element = article.find(class_='jeg_meta_date')

        if None in (title_element, link, date_element):
            continue

        article_link = link
        article_title = title_element.text.strip()
        stripped_date = date_element.text.strip()
        article_date = str(dateparser.parse(stripped_date))[0:10]
        document_title = slugify(article_title, to_lower=True, max_length=60)

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'The Daily Hodl',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link
        })

def bitcoinist():
    URL = 'https://bitcoinist.com'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find('div', class_='news-grid')
    articles = results.find_all(class_='news four columns wo-gutter grid-medium')

    for article in articles:
        title_element = article.find(class_='title')
        link = article.find('a')['href']
        date_element = article.find(class_='time')

        if None in (title_element, link, date_element):
            continue

        article_link = link
        article_title = title_element.text.strip()
        stripped_date = date_element.text.strip()
        article_date = str(dateparser.parse(stripped_date))[0:10]
        document_title = slugify(article_title, to_lower=True, max_length=60)

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'Bitcoinist',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link
        })

def ambcrypto():
    URL = 'https://eng.ambcrypto.com'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find('div', class_='mvp-feat1-list left relative')
    articles = results.find_all('a')

    for article in articles:
        title_element = article.find('h2')
        link = article['href']
        date_element = article.find(class_='mvp-cd-date')

        if None in (title_element, link, date_element):
            continue

        article_link = link
        article_title = title_element.text.strip()
        stripped_date = date_element.text.strip()
        article_date = str(dateparser.parse(stripped_date))[0:10]
        document_title = slugify(article_title, to_lower=True, max_length=60)

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'AMBCrypto',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link
        })

def coinspeaker():
    URL = 'https://www.coinspeaker.com/news/crypto/'
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find(class_='content-news border-t pt20')
    articles = results.find_all('article')

    for article in articles:
        title_element = article.find(class_='news-preview_title')
        link = article.find('a')['href']
        date_element = article.find(class_='time')

        if None in (title_element, link, date_element):
            continue

        article_link = link
        article_title = title_element.text.strip()
        stripped_date = date_element.text.strip()
        article_date = str(dateparser.parse(stripped_date))[0:10]
        document_title = slugify(article_title, to_lower=True, max_length=60)

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'Coinspeaker',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link
        })

def swissborg():
    URL = 'https://swissborg.com/blog'
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find(class_='cms-grid-list w-dyn-items w-row')
    articles = results.find_all('div')

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
        document_title = slugify(article_title, to_lower = True, max_length = 60)

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'SwissBorg',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link
        })

    def get_featured_post():
        featured_post = soup.find(class_='blog-featured')
        anchor_element = featured_post['href']
        title_element = featured_post.find('h5')
        date = featured_post.find(class_='caption grey date-stamp')

        article_link = 'https://swissborg.com' + anchor_element
        article_title = title_element.text.strip()
        stripped_date = date.text.strip()
        article_date = str(dateparser.parse(stripped_date))[0:10]
        document_title = slugify(article_title, to_lower = True, max_length = 60)

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'SwissBorg',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link
        })
    get_featured_post()

def medium():
    URL = 'https://medium.com/feed/topic/cryptocurrency'
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, features='xml')
    results = soup.find_all('item')

    for result in results:
        title_element = result.find('title')
        pubDate_element = result.find('pubDate')
        link_element = result.find('link')

        if None in (title_element, pubDate_element, link_element):
            continue

        article_title = title_element.text.strip()
        date = pubDate_element.text.strip()
        article_date = str(dateparser.parse(date))[0:10]
        stripped_link = link_element.text.strip()
        article_link = stripped_link.split('?source=rss', 1)[0]
        document_title = slugify(article_title, to_lower=True, max_length=60)

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'Medium',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link
        })

def web_scrapper(event, context):
    coindesk()
    crypto_potato()
    news_btc()
    bitcoin_news()
    eosio_news()
    ethereumworldnews()
    crypto_briefing()
    crypto_news()
    decrypt()
    cryptoglobe()
    bitcoinist()
    ambcrypto()
    coinspeaker()
    swissborg()
    medium()

    batch.commit()