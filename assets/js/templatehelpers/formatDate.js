define(function(require) {
    'use strict';

    var months = {
        1: 'Jänner',
        2: 'Februar',
        3: 'März',
        4: 'April',
        5: 'Mai',
        6: 'Juni',
        7: 'Juli',
        8: 'August',
        9: 'September',
        10: 'Oktober',
        11: 'November',
        12: 'Dezember'
    };

    /**
     * @param {Date} date
     */
    return function(date) {
        return date.getDate() + '. ' + months[date.getMonth() + 1] + ' ' + date.getFullYear();
    };
});
