var app = angular.module("exemplo1", ['ngStorage']);

app.controller("Controller", function ($scope, $localStorage) {

    var vm = this;

    $scope.user = {
        id: "",
        name: "",
        email: ""
    };

    vm.listUser = [];

    vm.add = function (user) {

        if (user.id == "") {
            $scope.user.id = new Date().getTime();
            vm.listUser.push(user);
            $scope.user = {};
        } else {
            vm.update(user.id)
        }

    };

    vm.edit = function (id) {
        var usersTemp = $localStorage.userData;
        for (var index = 0; index < usersTemp.length; index++) {
            if (usersTemp[index].id === id) {
                $scope.user = usersTemp[index];
            }
        }
    }

    vm.update = function (id) {
        var usersTemp = $localStorage.userData;
        for (var index = 0; index < usersTemp.length; index++) {
            if (usersTemp[index].id === id) {
                usersTemp[index].name = $scope.user.name;
                usersTemp[index].email = $scope.user.email;
            }
        }
        $localStorage.userData = usersTemp;
        $scope.user = {};
    }

    vm.remove = function (id) {
        var usersTemp = $localStorage.userData;
        for (var index = 0; index < usersTemp.length; index++) {
            if (usersTemp[index].id === id) {
                if (window.confirm("Deseja realmente remover o " + usersTemp[index].name + " ?") == true) {
                    usersTemp.splice(index, 1);
                } else {

                }
            }
        }
        $localStorage.userData = usersTemp;
        $scope.user = {};

    }

    vm.list = function () {
        if ($localStorage.userData) {
            vm.listUser = $localStorage.userData;
        }
    }


    vm.saveUser = function () {
        vm.add($scope.user);
        $localStorage.userData = vm.listUser;
        alert("Usuario Salvo");
    }

    vm.deleteUser = function () {
        if (window.confirm("Deseja realmente realmente remover todos cadastros?") == true) {
            $localStorage.$reset();
        } else {

        }
    }

    vm.init = function () {
        vm.list();
    }

    vm.init();


})