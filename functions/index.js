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
			articletitle: data.articletitle,
			articlelink: data.articlelink,
			articledate: data.articledate,
			publisher: data.publisher,
		});
	});

exports.deleteOldItems = functions.pubsub.schedule('every 1 days').onRun((context) => {
	const articleRef = db.collection('scrapped_articles');
	const batch = db.batch();
	const date = new Date();
	const cutoffDateInSeconds = date.setDate(date.getDate() - 2);
	const cutoff = new Date(cutoffDateInSeconds);
	const oldArticles = articleRef.where('timestamp', '<', cutoff);
	oldArticles.get().then((snapshot) => {
		const objectsToDelete = [];
		snapshot.forEach((doc) => {
			const document_title = doc.data().document_title;
			objectsToDelete.push(document_title);
			batch.delete(doc.ref);
		});
		index.deleteObjects(objectsToDelete);
		return batch.commit();
	})
	.catch((error) => console.error(error));
})

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
				article.publisher = article.publisher.toLowerCase().replace(/ /g,'') + 'Articles';
				
				if (!articles.hasOwnProperty(article.publisher)) {
					articles[article.publisher] = [];
				}
				articles[article.publisher].push(article);
			});
			
			res.set('Cache-Control', 'public, max-age=600, s-maxage=1800');
			return res.status(201).send(articles);
		})
		.catch((error) => console.error(error));
});

exports.api = functions.https.onRequest(app);