const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true }));

admin.initializeApp();

const algoliaClient = algoliasearch(
	functions.config().algolia.appid,
	functions.config().algolia.apikey
);
const index = algoliaClient.initIndex('prod_Articles');
const db = admin.firestore();

exports.addPostToIndex = functions.firestore
	.document('scrapped_articles/{articleId}')
	.onCreate((snapshot, context) => {
		const data = snapshot.data();
		const objectID = context.params.articleId;

		return index.saveObject({
			objectID,
			article_title: data.article_title,
			article_link: data.article_link,
			article_date: data.article_date,
			publisher: data.publisher,
		});
	});

exports.deleteOldItems = functions.pubsub
	.schedule('every 4 hours')
	.onRun((context) => {
		const articleRef = db.collection('scrapped_articles');
		const batch = db.batch();
		const date = new Date();
		const cutoffDateInSeconds = date.setDate(date.getDate() - 1);
		const cutoff = new Date(cutoffDateInSeconds);
		const slicedCutoff = cutoff.toISOString().slice(0, 10);
		const oldArticles = articleRef.where('article_date', '<', slicedCutoff);

		oldArticles
			.get()
			.then((snapshot) => {
				const objectsToDelete = [];
				snapshot.forEach((doc) => {
					const document_title = doc.data().document_title;
					objectsToDelete.push(document_title);
					batch.delete(doc.ref);
				});
				index.deleteObjects(objectsToDelete);
				batch.commit();
				return res.send(objectsToDelete);
			})
			.catch((error) => console.error(error));
	});

app.get('/articles', (req, res) => {
	db.collection('scrapped_articles')
		.orderBy('article_date', 'desc')
		.get()
		.then((snapshot) => {
			const unsortedArticles = [];

			snapshot.forEach((doc) => {
				const data = doc.data();
				unsortedArticles.push(data);
			});

			const articles = {};
			unsortedArticles.forEach((article) => {
				article.publisher =
					article.publisher.toLowerCase().replace(/ /g, '') + 'Articles';
				if (!articles.hasOwnProperty(article.publisher)) {
					articles[article.publisher] = [];
				}
				articles[article.publisher].push(article);
			});

			res.set('Cache-Control', 'public, max-age=600, s-maxage=1800');
			return res.status(201).send(articles);
		})
		.catch((error) => {
			console.error(error);
			return res.status(500).json({ error });
		});
});

app.get('/articles/:publisherName', (req, res) => {
	const articleName = req.params.publisherName;
	const validPublishers = [
		'CoinDesk',
		'Decrypt',
		'CryptoPotato',
		'NewsBTC',
		'Ethereum World News',
		'Crypto Briefing',
		'The Block',
		'CryptoGlobe',
		'The Daily Hodl',
		'Bitcoinist',
		'AMBCrypto',
		'Coinspeaker',
		'Medium',
		'Live Bitcoin News',
		'CryptoSlate',
		'Crypto News',
	];

	if (!validPublishers.includes(articleName)) {
		res.status(404).send('404, Publisher not found.');
	} else {
		db.collection('scrapped_articles')
			.where('publisher', '==', articleName)
			.orderBy('article_date', 'desc')
			.get()
			.then((snapshot) => {
				const articles = [];
				snapshot.forEach((doc) => {
					const data = doc.data();
					articles.push(data);
				});
				return res.status(200).json(articles);
			})
			.catch((error) => {
				console.error(error);
				return res.status(500).json({ error });
			});
	}
});

exports.api = functions.https.onRequest(app);
