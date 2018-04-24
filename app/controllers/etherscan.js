'use strict';

const Promise = require('bluebird');
const electron = require('electron');
const path = require('path');
const config = require('../config');
const request = require('request');
const async = require('async');

module.exports = function (app) {
    //"https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&offset=10&sort=asc"
    let API_ENDPOINT = "https://api.etherscan.io/api?module=account";
    let TX_LIST_ACTION = "&action=txlist&startblock=0&endblock=99999999&offset=30&sort=asc";

    const REQUEST_INTERVAL_DELAY = 600; // millis

    // TODO
    // 1) select wallets & walet_settings
    // 2) for each wallet -> select tokens
    // 3) for each token -> load txList for each of them (using paging)
    // 4) for each txListItem -> save txHistory & also save last synced page (into wallet's settings)
    // TODO

    function syncTX (address, page) {}

    let queue = async.queue((args, callback) => {
        console.log("ETHERSCAN REQUESTS IN QUEUE: ", queue.length());
        let promise = makeRequest.apply(this, [args.method, args.url, args.data])
        setTimeout(() => {
            callback(promise);
        }, REQUEST_INTERVAL_DELAY);
    }, 1);

    function init () {
        let ACTION_URL = API_ENDPOINT + TX_LIST_ACTION + "&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&page=1"
        queue.push({ method: "get", url: ACTION_URL, data: null }, (promise) => {
            promise.then((response) => {
                console.log("response", response);
            }).catch((error) => {
                console.log("error", error);
            });
        });
    }

    function makeRequest (method, url, data) {
        return new Promise((resolve, reject) => {
            request[method](url, (error, httpResponse, response) => {
                try {
                    response = JSON.parse(response);
                    resolve(response.result);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    const controller = function () { };
    controller.prototype.init = init;
    return controller;
}



//https://api.etherscan.io/api?module=account&action=txlist&address=0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a&startblock=0&endblock=99999999&page=1&offset=10&sort=asc

