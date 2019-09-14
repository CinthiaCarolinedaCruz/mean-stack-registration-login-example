(function () {
    'use strict';

    angular
        .module('app')
        .controller('Questions.IndexController', Controller);

    function Controller($window, UserService, FlashService, QuestionService) {
        var vm = this;

        vm.user = null;
        vm.question = null;
        vm.saveQuestion = saveQuestion;
        vm.cancelQuestion = cancelQuestion;
        vm.questionsList = [];

        initController();
        getAll();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function getAll()
        {
            QuestionService.GetAll() 
                .then(function (questionsList) {
                    debugger;
                    vm.questionsList = questionsList;
                    FlashService.Success('Question Saved');
                })
                .catch(function (error) {
                    debugger;

                    FlashService.Error(error);
                });
        }

        function saveQuestion() {
            let perguntaQueIraSerSalva = {
                question: vm.question
            };

            QuestionService.Create(perguntaQueIraSerSalva) 
                .then(function () {
                    debugger;
                    FlashService.Success('Question Saved');
                })
                .catch(function (error) {
                    debugger;

                    FlashService.Error(error);
                });
        }

        function cancelQuestion() {
            //UserService.Delete(vm.user._id)
                //.then(function () {
                    //// log user out
                    //$window.location = '/login';
                //})
                //.catch(function (error) {
                    //FlashService.Error(error);
                //});
                history.go(-1);
        }
    }

})();