/*global it:false, describe:false, before:false */

var bigRat = require('../lib/BigRational')
  , assert = require('assert')

describe('BigRational', function () {

    describe('Functional tests', function () {
        it("1 = 1", function () {
            assert(bigRat(1).equals(1))
        })

        it("0 = -0", function () {
            assert(bigRat(0).equals("-0"))
        })

        it("1 + 0 + -1 = 0", function () {
            assert(bigRat.one.add(bigRat.zero).add(bigRat.minusOne).add().equals(0))
        })

        it("0_1/2 > -0_1/2", function () {
            assert(bigRat("0_1/2").greater("-0_1/2"))
        })

        it("1/4 != 3/2", function () {
            assert(bigRat("1/4").notEquals(3 / 2))
        })

        it("4/9 != -4/9", function () {
            assert(bigRat(4, 9).notEquals(-4, 9))
        })

        it("1/3 + 1/3 = 2/3", function () {
            assert(bigRat("1/3").add(1, 3).equals(2, 3))
        })

        it("9/10 < 10/11", function () {
            assert(bigRat(9, 10).lesser("10/11"))
        })

        it("3/10 < 1/3", function () {
            assert(bigRat(3, 10).lesser(1, 3))
        })

        it("45/2 > 51/3", function () {
            assert(bigRat(45, 2).greater(51, 3))
        })

        it("2 >= 2", function () {
            assert(bigRat(2).greaterOrEquals(2))
        })

        it("5/3 <= 5/3", function () {
            assert(bigRat(5, 3).lesserOrEquals(5, 3))
        })

        it("compare(3,3) = 0", function () {
            assert(bigRat(3).compare(3) === 0)
        })

        it("compare(3,4) = -1", function () {
            assert(bigRat(3).compare(4) === -1)
        })

        it("compare(4,3) = 1", function () {
            assert(bigRat(4).compare(3) === 1)
        })

        it("1_1/2 = 3/2", function () {
            assert(bigRat("1_1/2").equals(3, 2))
        })

        it("1.05 = 105/100", function () {
            assert(bigRat("1.05").equals(105 / 100))
        })

        it("negate 234 = -234", function () {
            assert(bigRat(234).negate().equals(-234))
        })

        it("negate -54 = 54", function () {
            assert(bigRat(-54).negate().equals(54))
        })

        it("abs -424 = 424", function () {
            assert(bigRat(-424).abs().equals(424))
        })

        it("abs 543333 = 543333", function () {
            assert(bigRat(543333).abs().equals(543333))
        })

        it("1.32543543 + 5.43537467567 = 6.76081010567", function () {
            assert(bigRat("1.32543543").add("5.43537467567").equals("6.76081010567"))
        })

        it("42354364564.2342356354 * 5764567433.23423565454", function () {
            assert(
                bigRat("42354364564.2342356354")
                    .multiply("5764567433.23423565454")
                    .equals("61038647655578703408451022496533627948679", "250000000000000000000")
            )
        })

        it("6519874651.165496841654 / 9849841624.148923198494233", function () {
            assert(
                bigRat("6519874651.165496841654")
                    .over("9849841624.148923198494233")
                    .equals("6519874651165496841654000/9849841624148923198494233")
            )
        })

        it("8871631566.561964161 - 5616430464160894.549646516516543", function () {
            assert(
                bigRat("8871631566.561964161")
                    .minus("5616430464160894.549646516516543")
                    .equals("-5616421592529327_987682355516543/1000000000000000")
            )
        })

        it("10000000000000000/100000000000000000000000 * 65400000000000000/200000000000054", function () {
            assert(
                bigRat("10000000000000000/100000000000000000000000")
                    .times("65400000000000000/200000000000054")
                    .equals("3270000000/100000000000027")
            )
        })

        it("3 % 2 = 1", function () {
            assert(bigRat(3).mod(2).equals(1))
        })

        it("3/2 % 4/3 = 1/6", function () {
            assert(bigRat(3, 2).mod(4, 3).equals(1, 6))
        })

        it("(31254654134/216487492057) % (420000000135/1223785553)", function () {
            assert(bigRat("31254654134/216487492057").mod("420000000135/1223785553").equals("31254654134/216487492057"))
        })

        it("floor 65546 = 65546", function () {
            assert(bigRat(65546).floor().equals(65546))
        })

        it("floor 12345.4 = 12345", function () {
            assert(bigRat("12345.4").floor().equals(12345))
        })

        it("floor 987.99999 = 987", function () {
            assert(bigRat("987.99999").floor().equals(987))
        })

        it("ceil 12345.546 = 12346", function () {
            assert(bigRat("12345.4").ceil().equals(12346))
        })

        it("ceil 987.0001 = 988", function () {
            assert(bigRat("987.0001").ceil().equals(988))
        })

        it("ceil 3234523 = 3234523", function () {
            assert(bigRat(3234523).ceil().equals(3234523))
        })

        it("round 1234567890 = 1234567890", function () {
            assert(bigRat("1234567890").round().equals("1234567890"))
        })

        it("round 54345.12566 = 54345", function () {
            assert(bigRat("54345.12566").round().equals(54345))
        })

        it("round 1234567.5 = 1234568", function () {
            assert(bigRat("1234567.5").round().equals(1234568))
        })

        it("0 is positive", function () {
            assert(bigRat(0).isPositive())
        })

        it("-1/1000 is negative", function () {
            assert(bigRat("-1/1000").isNegative())
        })

        it("0 is zero", function () {
            assert(bigRat("0").isZero())
        })

        it("1000000000000 is not zero", function () {
            assert(!bigRat("1000000000000").isZero())
        })

        it("valueOf 1/4 + 3/4 = 1", function () {
            assert(bigRat(1, 4) + bigRat(3 / 4) === 1)
        })

        it("valueOf 1/7 = 1/7", function () {
            // Issue #1
            assert(bigRat(1, 7).valueOf() === 1 / 7)
        })

        it("1/9 toDecimal = '0.9'", function () {
            // Issue #2
            assert(bigRat(9, 10).toDecimal() === "0.9")
        })
    })
})
