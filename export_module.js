
function Person() {
    var name
    
    this.init = function (namet, aget) {
        name = namet
        this.age = aget
    }

    this.play = function() {
        console.log(name + '-play')
    }

    this.sleep = function() {
        console.log(this.age + '-sleep')
    }

}

module.exports = Person