'use strict';

function TermsDialogController($rootScope, $scope, $log, $q, $mdDialog, SqlLiteService) {
    'ngInject'

    $log.info('TermsDialogController');
    $scope.isLoading = false;
    $scope.step = 'main'
    $scope.scrolledBottom = false;

    let guideSettings = SqlLiteService.getGuideSettings();

    $scope.changeStep = (step) => {
        $scope.step = step;
    }

    $scope.agree = (event) => {
        $scope.isLoading = true;
        guideSettings.termsAccepted = true;

        let savePromise = SqlLiteService.saveGuideSettings(guideSettings);
        savePromise.then(() => {
            $scope.isLoading = false;
            $mdDialog.hide();
        });
    };

    $scope.notAgree = (event) => {
        $rootScope.closeApp();
    };

    $scope.scrollToEndContainer = (direction) => {
        if (direction === 'bottom') {
            $scope.scrolledBottom = true;
            $scope.$apply()
        }
    }
};

module.exports = TermsDialogController;
