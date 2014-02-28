function q(path) {
    var fn = selectPath(path);

    if (arguments.length > 1) {
        return fn(arguments[1]);
    } else {
        return fn;
    }
}

function selectPath(path) {
    function nonEmpty(part) {
        return part.length > 0;
    }

    var defaultValue = undefined;

    path = path.split("/").filter(nonEmpty);
    
    return function(item) {
        var branch = item;
        var field  = path.shift();

        while (typeof field !== 'undefined') {
            branch = branch[field];
            field  = path.shift();

            if (typeof branch === 'undefined') {
                return defaultValue;
            }
        }

        return branch;
    };
}

module.exports = q;