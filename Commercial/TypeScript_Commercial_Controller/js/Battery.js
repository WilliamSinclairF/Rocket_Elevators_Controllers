"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Column_1 = require("./Column");
var Battery = /** @class */ (function () {
    function Battery(building, columnNumber, totalElevators) {
        this.building = building;
        this.columnList = [];
        this.totalColumns = columnNumber;
        this.totalElevators = totalElevators;
        this.createColumns();
    }
    // makes columns and assigns each column to the floors it'll handle. one column has the basement and first floor, others handle an even share of floors.
    Battery.prototype.createColumns = function () {
        var floorsPerColumn = (this.building.floors - this.building.basements) / (this.totalColumns - 1);
        var elevatorsPerColumn = this.totalElevators / this.totalColumns;
        var minimum = floorsPerColumn;
        var maximum = minimum + floorsPerColumn;
        for (var i = 0; i < this.totalColumns; i++) {
            if (i === 0) {
                this.columnList.push(new Column_1.default(i, elevatorsPerColumn, -this.building.basements, 0));
            }
            else if (i === 1) {
                this.columnList.push(new Column_1.default(i, elevatorsPerColumn, 0, floorsPerColumn));
            }
            else if (i > 1) {
                this.columnList.push(new Column_1.default(i, elevatorsPerColumn, minimum + 1, maximum));
                minimum += floorsPerColumn;
                maximum += floorsPerColumn;
            }
        }
    };
    Battery.prototype.findColumn = function (requestLocation) {
        return this.columnList.filter(function (c) { return requestLocation >= c.minFloor && requestLocation <= c.maxFloor; })[0];
    };
    return Battery;
}());
exports.default = Battery;
//# sourceMappingURL=Battery.js.map