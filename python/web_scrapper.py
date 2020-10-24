import dateparser
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from slugify import slugify
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, { 'projectId': 'cryptourls' })

db = firestore.Client()
batch = db.batch()
scrapped_articles_collection_ref = db.collection('scrapped_articles')

articles_to_extract = [
    {'URL': 'https://www.coindesk.com/feed', 'publisher': 'CoinDesk'},
    {'URL': 'https://decrypt.co/feed', 'publisher': 'Decrypt'},
    {'URL': 'https://cryptopotato.com/feed', 'publisher': 'CryptoPotato'},
    {'URL': 'https://www.newsbtc.com/feed', 'publisher': 'NewsBTC'},
    {'URL': 'https://en.ethereumworldnews.com/feed', 'publisher': 'Ethereum World News'},
    {'URL': 'https://cryptobriefing.com/feed', 'publisher': 'Crypto Briefing'},
    {'URL': 'https://www.theblockcrypto.com/feed', 'publisher': 'The Block'},
    {'URL': 'https://www.cryptoglobe.com/latest/feed', 'publisher': 'CryptoGlobe'},
    {'URL': 'https://dailyhodl.com/feed', 'publisher': 'The Daily Hodl'},
    {'URL': 'https://bitcoinist.com/feed', 'publisher': 'Bitcoinist'},
    {'URL': 'https://eng.ambcrypto.com/feed', 'publisher': 'AMBCrypto'},
    {'URL': 'https://medium.com/feed/topic/cryptocurrency', 'publisher': 'Medium'},
    {'URL': 'https://www.livebitcoinnews.com/feed', 'publisher': 'Live Bitcoin News'},
    {'URL': 'https://www.cryptoslate.com/rss', 'publisher': 'CryptoSlate'}
]

def extract_xml_content(URL, publisher):
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, features='xml')
    articles = soup.find_all('item')

    for article in articles:
        title_element = article.find('title')
        link_element = article.find('link')
        date_element = article.find('pubDate')

        if None in (title_element, link_element, date_element):
            continue
        article_title = title_element.text.strip()
        stripped_date = date_element.text.strip()
        article_date = str(dateparser.parse(stripped_date))[0:10]
        article_link = link_element.text.strip()
        document_title = slugify(article_title, to_lower=True, max_length=60)
        timestamp = str(datetime.now())[0:10]

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': publisher,
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link,
            'timestamp': timestamp,
        })

def coinspeaker(URL):
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, features='html')
    articles = soup.find_all('article', class_='news-preview')

    for article in articles:
        title_element = article.find('h3', class_='news-preview_title')
        link_element = title_element.find('a')['href']
        date_element = article.find('time')

        if None in (title_element, link_element, date_element):
            continue
        article_title = title_element.text.strip()
        stripped_date = date_element.text.strip()
        article_date = str(dateparser.parse(stripped_date))[0:10]
        article_link = link_element.strip()
        document_title = slugify(article_title, to_lower=True, max_length=60)
        timestamp = str(datetime.now())[0:10]

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'Coinspeaker',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link,
            'timestamp': timestamp,
        })

def cryptonews(URL):
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, 'html.parser')
    results = soup.find('div', class_='cn-list cols')
    articles = results.find_all('div', class_='cn-tile row article')

    for article in articles:

        title_element = article.find('h4')
        link = article.find('a')['href']
        time_element = article.find('time')['datetime']

        if None in (title_element, link, time_element):
            continue

        article_title = title_element.text.strip()
        article_link = URL + link
        article_date = time_element[0:10]
        document_title = slugify(article_title, to_lower=True, max_length=60)
        timestamp = str(datetime.now())[0:10]

        ref = scrapped_articles_collection_ref.document(document_title)
        batch.set(ref, {
            'publisher': 'Crypto News',
            'document_title': document_title,
            'article_title': article_title,
            'article_date': article_date,
            'article_link': article_link,
            'timestamp': timestamp,
        })

def web_scrapper(event, context):
    cryptonews('https://cryptonews.com')
    coinspeaker('https://www.coinspeaker.com/news/crypto')
    for article in articles_to_extract:
        extract_xml_content(article['URL'], article['publisher'])
    batch.commit()