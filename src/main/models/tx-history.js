const { knex, sqlUtil } = require('../services/knex');
const isSyncing = require('../tx-history-service').isSyncing;

const TABLE_NAME = 'tx_history';

const Controller = {};

Controller.addOrUpdate = _addOrUpdate;
Controller.findByTxHash = _findByTxHash;
Controller.findByPublicKey = _findByPublicKey;
Controller.findByPublicKeyAndTokenSymbol = _findByPublicKeyAndTokenSymbol;
Controller.findByPublicKeyAndContractAddress = _findByPublicKeyAndContractAddress;

async function _addOrUpdate(txHistory) {
	let records = await _findByTxHash(txHistory.hash);
	let record = records ? records[0] : null;
	if (record) {
		Object.assign(record, txHistory);
		return sqlUtil.updateById(TABLE_NAME, record.id, record);
	}
	return sqlUtil.insertAndSelect(TABLE_NAME, txHistory);
}

async function _findByTxHash(hash) {
	return await knex(TABLE_NAME).where({ hash: hash });
}

async function _findByPublicKeyAndContractAddress(publicKey, contractAddress) {
	publicKey = publicKey.toLowerCase();
	return knex(TABLE_NAME)
		.where({ from: publicKey, contractAddress })
		.orWhere({ to: publicKey, contractAddress })
		.orderBy('timeStamp', 'desc')
		.then(rows => {
			return {
				data: rows,
				isSyncing: isSyncing(publicKey)
			};
		});
}

async function _findByPublicKey(publicKey) {
	publicKey = publicKey.toLowerCase();

	return knex(TABLE_NAME)
		.where({ from: publicKey })
		.orWhere({ to: publicKey })
		.orderBy('timeStamp', 'desc')
		.then(rows => {
			return {
				data: rows,
				isSyncing: isSyncing(publicKey)
			};
		});
}

async function _findByPublicKeyAndTokenSymbol(publicKey, tokenSymbol) {
	publicKey = publicKey.toLowerCase();
	return knex(TABLE_NAME)
		.where({ from: publicKey, tokenSymbol })
		.orWhere({ to: publicKey, tokenSymbol })
		.orderBy('timeStamp', 'desc')
		.then(rows => {
			return {
				data: rows,
				isSyncing: isSyncing(publicKey)
			};
		});
}

module.exports = Controller;
