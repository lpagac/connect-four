const arrCheck = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]
];


it("should create a multi-dimensional array of null values", function() {
    expect(board).toEqual(arrCheck);
});

it("should find correct row(y) when given column(x)", function() {
    expect(findSpotForCol(4)).toEqual(5);
});

it("should create a multi-dimensional array of null values", function() {
    expect(board).toEqual(arrCheck)
});

