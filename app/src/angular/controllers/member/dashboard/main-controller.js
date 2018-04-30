'use strict';

function MemberDashboardMainController($rootScope, $scope, $interval, $log, $q, $timeout, $mdSidenav, $state, $filter, CommonService, RPCService, SqlLiteService, SelfkeyService, Web3Service) {
    'ngInject'

    $log.info('MemberDashboardMainController', $rootScope.wallet);

    $scope.openEtherscanTxWindow = (event) => {
        $rootScope.openInBrowser("https://etherscan.io/address/0x" + $rootScope.wallet.getPublicKeyHex(), true);
    }

    let pieChartIsReady = false;

    let wallet = $rootScope.wallet;
    $scope.transactionsHistoryList = [];

    $rootScope.CUSTOM_TOKENS_LIMIT = 20;
    $rootScope.tokenLimitIsExceed = () => {
        let tokensCnt = Object.keys(wallet.tokens).length + 1; // +1 for ETH
        return tokensCnt >= $rootScope.CUSTOM_TOKENS_LIMIT;
    };


    $scope.getPieChartItems = () => {
        let pieChartItems = [];
        Object.keys(wallet.tokens).forEach((tokeyKey) => {
            let pieChartItem = {};
            let token = wallet.tokens[tokeyKey];

            let tokenPrice = SqlLiteService.getTokenPriceBySymbol(token.symbol.toUpperCase());
            if (tokenPrice) {
                pieChartItem.title = tokenPrice.name;
                pieChartItem.valueUSD = Number(CommonService.numbersAfterComma(token.getBalanceInUsd(), 2));
                pieChartItem.amount = token.getFormattedBalance();
                //token
            } else {
                pieChartItem.title = 'Unknown';
                pieChartItem.valueUSD = 0;
            }

            pieChartItem.subTitle = token.symbol;

            pieChartItems.push(pieChartItem);
        });

        let ethPrice = SqlLiteService.getTokenPriceBySymbol('ETH');
        pieChartItems.unshift({
            subTitle: 'ETH',
            title: 'Ethereum',
            valueUSD: Number(CommonService.numbersAfterComma(wallet.getBalanceInUsd(), 2)),
            amount: wallet.getFormattedBalance()
        });

        return pieChartItems;

    };

    $scope.pieChart = {
        totalTitle: 'Total Value USD',
        total: CommonService.numbersAfterComma(wallet.calculateTotalBalanceInUSD(), 2),
        items: $scope.getPieChartItems(),
        callback: {
            onReady: () => {
                // TODO set listenere on balance change here
                pieChartIsReady = true;
                if (wallet.calculateTotalBalanceInUSD() > 0) {
                    updatePieChart();
                }
            },
            onItemClick: (item) => {
                $log.info("clicked", item);
            }
        },
        actions: {}
    };

    function updatePieChart() {
        $scope.pieChart.items = $scope.getPieChartItems();

        $scope.pieChart.total = CommonService.numbersAfterComma(wallet.calculateTotalBalanceInUSD(), 2);
        $scope.pieChart.draw();
    }

    /**
     * update pie chart on balance change
     */
    $rootScope.$on('balance:change', (event, symbol, value, valueInUsd) => {
        if (pieChartIsReady) {
            updatePieChart();
        }
    });

    $scope.navigateToManageCryptos = () => {
        $state.go('member.wallet.manage-cryptos');
    };

    /**
     * update pie chart on balance change
     */
    $rootScope.$on('piechart:reload', (event) => {
        if (pieChartIsReady) {
            updatePieChart();
        }
    });
};

module.exports = MemberDashboardMainController;
