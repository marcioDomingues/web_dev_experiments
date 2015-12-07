//events - a super-basic Javascript (publish subscribe) pattern

//terminolagy
//we can do:
//pubsub
//pubsub.subscribe
//pubsub.unsubscribe
//pubsub.publish
//
//the event terminology is closer to angular terminology
//events.on('peopleChange', someHandler)
//events.emit('peopleChange', 3)
//
//EVENTS MODULE

events.on("people", someHandler);
events.on("people.change", someChangeHandler);
events.on("people.change.first", someFirstChangeHandler);

var events = { 

  events: {},
  
  on: function (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  },

  off: function(eventName, fn) {
    if (this.events[eventName]) {
      for (var i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      };
    }
  },

  emit: function (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function(fn) {
        fn(data);
      });
    }
  }
};