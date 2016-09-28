---
---

# Miscellaneous stuff used throughout the pages
angular.module('hathixApp')
    .controller "AboutCtrl", ($scope) ->
        $scope.date = Date.now()

        # gotta be creative to stop these spammers
        $scope.contactShown = false
        $scope.showContact = ->
            $scope.contactShown = true

        $scope.getContact = ->
            # email reversed with bars in between
            str = "u|d|e| |:|t|o|d|:| |d|r|a|v|r|a|h| |:|t|o|d|:| |e|g|e|l|l|o|c| |:|t|a|:| |a|t|h|e|m|l|e|e|n"
            str = str.split("|").reverse().join("")
            return str

        slogans = [
            "think inside the box",
            "pachyderm in a package",
            "mmm... packing peanuts",
            "special surprise inside",
            "my memory upgrade arrived",
            "we're gonna need more stamps",
            "if it fits, it ships"
        ]

        $scope.slogan = slogans[0]
        $scope.changeSlogan = () ->
            $scope.slogan = _.sample _.without slogans, $scope.slogan
