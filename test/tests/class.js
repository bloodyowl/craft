/*jshint forin:true, eqnull:true, noarg:true, noempty:true, boss:true, loopfunc:true, unused:true, browser:true, maxerr:50, asi:true, laxcomma:true */


;(function(){
  
  var Animal = Class.create({
      initialize : function(name){
        this.name = name
        return this
      }
    , toString : function(){
        return this.name
      }
    , age : 0
    , addYear : function(){
        this.age++
      }
    , getAge : function(){
        return this.age
      }
  })
    
  test("Class.create", function(){
    
    equal(Animal, Animal.prototype.initialize, "Constructor is in the prototype")
    var dog = new Animal("Random dog")
    equal(dog.name, "Random dog")
    equal(Animal.prototype.age, dog.age)
    dog.addYear()
    notEqual(Animal.prototype.age, dog.age)
    equal(dog.getAge(), 1)
  })
  
  var Dog = Class.create(Animal, {
      greeting : "waf"
    , sayHello : function(){
      return this.name + " says " + this.greeting
    }
  })
  
  test("Class.create with inherit", function(){
    var aDog = new Dog("Another dog")
    equal(aDog.sayHello(), "Another dog says waf")
    equal(aDog.getAge(), 0, "Inherited")
  })
  
  var Cat = Class.create(Animal, {
      greeting : "meow"
    , initialize : function(name){
      Object.extend(this, Animal.call(this, name))
      this.age = 3
      return this
    }
    , sayHello : Dog.prototype.sayHello
  })
  
  test("Class.create with inherit and references", function(){
    var aCat = new Cat("A cat")
    equal(aCat.sayHello(), "A cat says meow")
    equal(aCat.getAge(), 3, "Inherited")
    equal(aCat instanceof Dog, false)
    equal(aCat instanceof Animal, true)
  })
  
  test("Class.from", function(){
    var a = Class.from(Animal.prototype)
    deepEqual(a, Animal.prototype)
    ok(a !== Animal.prototype)
  })
  
})()

 
   
  