const arrCheck = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
];

const arrCheckTie = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1]
];


it("should create a multi-dimensional array of null values", function() {
    expect(board).toEqual(arrCheck);
});

it("should find correct row(y) when given column(x)", function() {
    expect(findSpotForCol(4)).toEqual(5);
});

it("should return false if there is no tie", function() {
    expect(checkForTie(arrCheck)).toEqual(false);  
});

it('Should return true if there is a tie', function() {
    expect(checkForTie(arrCheckTie)).toEqual(true);
});

it('should return true if a win is found', function() {
    expect(checkForWin(arrCheckTie)).toEqual(true);
});

it('should return false when there is no win', function() {
    expect(checkForWin(arrCheck)).toEqual(false);
});

it('should fill a cell after clicking', function() {
    placeInTable(5,3);
    //debugger;
    let cellToCheck = document.getElementById('5-3');
    expect(cellToCheck.children.length).toBe(1);
});

