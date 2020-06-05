const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');

admin.initializeApp();
const db = admin.firestore();

const algoliaClient = algoliasearch(
	functions.config().algolia.appid,
	functions.config().algolia.apikey
);
const collectionIndex = algoliaClient.initIndex('prod_Articles');

exports.sendCollectionToAlgolia = functions.https.onRequest(
	async (req, res) => {
		const algoliaRecords = [];

		const querySnapshot = await db.collection('scrapped_articles').get();
		querySnapshot.docs.forEach((doc) => {
			const document = doc.data();

			const record = {
				objectID: doc.id,
				article_title: document.article_title,
				article_link: document.article_link,
				publisher: document.publisher,
			};

			algoliaRecords.push(record);
		});

		collectionIndex
			.saveObjects(algoliaRecords)
			.then(({ objectIDs }) => {
				console.log(objectIDs);
				return res.status(200).send(objectIDs);
			})
			.catch((error) => {
				console.log(error);
			});
	}
);

exports.addPostToIndex = functions.firestore
	.document('scrapped_articles/{articleId}')
	.onCreate((snapshot, context) => {
		const data = snapshot.data();
		const objectID = context.params.articleId;

		return index.addObject({
			objectID,
			article_title: data.article_title,
			article_link: data.article_link,
			publisher: data.publisher,
		});
	});
