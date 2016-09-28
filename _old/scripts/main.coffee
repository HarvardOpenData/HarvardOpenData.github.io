---
---
console.log 32

angular.module('hathixApp', [])
    .config(($interpolateProvider) ->
        $interpolateProvider.startSymbol('[[{').endSymbol('}]]')
    )
