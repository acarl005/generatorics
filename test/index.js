var expect = require('chai').expect;
var C = require('../generatorics');

describe('Integer functions', () => {
  it('factorial works', () => {
    expect(C.factorial(0)).to.equal(1);
    expect(C.factorial(1)).to.equal(1);
    expect(C.factorial(2)).to.equal(2);
    expect(C.factorial(3)).to.equal(6);
    expect(C.factorial(4)).to.equal(24);
    expect(C.factorial(5)).to.equal(120);
  });
});

describe('Permutations and Combinations', () => {
  it('should get combinations', () => {
    var members = [
      [1, 2],
      [1, 3],
      [2, 3]
    ];
    var answers = [];
    for (var perm of C.combinations([1, 2, 3], 2)) {
      answers.push(perm.slice());
    }
    expect(answers).to.deep.have.members(members);
  });

  it('should get permutations', () => {
    var members = [
      [1, 2],
      [1, 3],
      [2, 1],
      [2, 3],
      [3, 1],
      [3, 2]
    ];
    var answers = [];
    for (var perm of C.permutations([1, 2, 3], 2)) {
      answers.push(perm.slice());
    }
    expect(answers).to.deep.have.members(members);
  });
});
